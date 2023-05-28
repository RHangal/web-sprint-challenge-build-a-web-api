// add middlewares here related to actions
const Actions = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const user = await Actions.get(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding user",
    });
  }
}

module.exports = {
  validateActionId,
};
