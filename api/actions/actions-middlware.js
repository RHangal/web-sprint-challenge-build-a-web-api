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

function validateAction(req, res, next) {
  const { completed, description, notes, project_id } = req.body;
  if (!description || !notes || !project_id) {
    res.status(400).json({
      message: "missing required text field",
    });
  } else {
    req.completed = completed;
    req.description = description.trim();
    req.notes = notes.trim();
    req.project_id = project_id;
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
};
