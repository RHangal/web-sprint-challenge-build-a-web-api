// add middlewares here related to projects
const Projects = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const user = await Projects.get(req.params.id);
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

function validateProject(req, res, next) {
  const { completed, description, name } = req.body;
  if (!completed || !description || !name) {
    res.status(400).json({
      message: "missing required text field",
    });
  } else {
    req.completed = completed;
    req.description = description.trim();
    req.name = name.trim();
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProject,
};
