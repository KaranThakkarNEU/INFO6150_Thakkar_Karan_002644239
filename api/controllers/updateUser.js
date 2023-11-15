const updateUserService = require("../services/updateUser");

const updateUser = async (request, response) => {
  try {
    const data = request.body;
    const result = await updateUserService(data);
    return response.status(200).json(result);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

module.exports = updateUser;
