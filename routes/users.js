const createUser = require("@/app/actions/createUser");
const ActionError = require("@/app/utilities/actionError");
const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  const userData = {
    email: "binh2@gmail.com",
    name: "Phạm Quang Bình",
    password: "123123",
  };

  const user = await createUser(userData);

  if (ActionError.is(user)) {
    return res.json({
      code: "action_error",
      message: user.message,
      errors: user.errors,
    }, 400);
  }

  return res.json(user);
});

module.exports = router;
