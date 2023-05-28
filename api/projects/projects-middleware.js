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

module.exports = {
  validateProjectId,
};
