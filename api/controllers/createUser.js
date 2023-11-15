const createUserSerivce = require("../services/createUser");

async function createUser(request, response) {
  try {
    const user = request.body;
    const result = await createUserSerivce(user);
    return response.status(200).json(result);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}

module.exports = createUser;
