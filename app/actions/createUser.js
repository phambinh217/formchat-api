import User from "../models/User.js";
import ActionError from "../utilities/ActionError.js";

const validateCreateUser = async (userData) => {
  const email = userData?.email;
  const errors = {};

  /**
   * Nếu cung cấp địa chỉ email,
   * Thì sẽ kiểm tra email đã tồn tại chưa
   */
  if (email) {
    const user = await User.findOne({ email });

    if (user) {
      errors.email = `Email ${email} already exist.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    return new ActionError("Invalid user data", errors);
  }

  return true;
};

const createUser = async (userData) => {
  const validate = await validateCreateUser(userData);

  if (ActionError.is(validate)) {
    return validate;
  }

  const user = new User();

  user.set("name", userData.name);
  user.set("email", userData.email);
  user.set("password", userData.password);

  await user.save();
  return user;
};

export default createUser;
