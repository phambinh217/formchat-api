import 'module-alias/register.js';
import dotenv from 'dotenv';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import indexRouter from './routes/index.js';
import apiRouter from './routes/api.js';

// Load biến môi trường từ .env file
dotenv.config();

const app = express();

// Kết nối MongoDB sử dụng Mongoose và chuỗi kết nối từ biến môi trường
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Kết nối MongoDB thành công');
  })
  .catch((err) => {
    console.error('Lỗi kết nối MongoDB: ', err);
  });

// Cấu hình view engine
app.set('views', path.join(path.dirname(''), 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(''), 'public')));

// Định nghĩa các routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

// Xử lý lỗi 404 và chuyển đến error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Xử lý các lỗi khác
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
