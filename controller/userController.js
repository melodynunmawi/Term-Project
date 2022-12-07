const userModel = require("../database").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  const user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id) => {
  const user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
