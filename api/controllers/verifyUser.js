const verifyUserService = require("../services/verifyUser");

const verifyUser = async (request, response) => {
  try {
    const data = request.body;
    const result = await verifyUserService(data);
    return response.status(200).json({ message: result.message });
  } catch (error) {
    return response.status(500).json(error);
  }
};

module.exports = verifyUser;
