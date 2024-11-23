import createUser from "../../actions/createUser.js";
import ActionError from "../../utilities/ActionError.js";

const createUserAction = async (req, res) => {
  const userData = {
    email: "binh3@gmail.com",
    name: "Phạm Quang Bình",
    password: "123123",
  };

  const user = await createUser(userData);

  if (ActionError.is(user)) {
    return res.json(
      {
        code: "action_error",
        message: user.message,
        errors: user.errors,
      },
      400
    );
  }

  return res.json(user);
};

export default {
  createUserAction,
};
