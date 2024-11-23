const User = require("@/app/models/User"); // Đảm bảo import đúng model User
const ActionError = require("@/app/utilities/ActionError");

const validateCreateUser = (userData) => {
  const email = userData?.email;
  const errors = {};

  /**
   * Nếu cung cấp địa chỉ email,
   * Thì sẽ kiểm tra email đã tồn tại chưa
   */
  if (email) {
    const user = User.findOne({ email });
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
  const validate = validateCreateUser(userData);

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

module.exports = createUser;
