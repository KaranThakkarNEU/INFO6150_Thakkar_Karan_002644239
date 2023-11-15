const deleteUserByEmailService = require("../services/deleteUser");

const deleteUser = async (request, response) => {
  const { email } = request.body;

  try {
    const user = await deleteUserByEmailService(email);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

module.exports = deleteUser;
