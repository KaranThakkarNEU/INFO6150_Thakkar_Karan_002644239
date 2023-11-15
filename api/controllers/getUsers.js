const getUsersService = require("../services/getUsers");

const getUsers = async (request, response) => {
  try {
    const result = await getUsersService();
    return response.status(200).json(result);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

module.exports = getUsers;
