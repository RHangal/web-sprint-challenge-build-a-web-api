// Write your "projects" router here!
// Write your "actions" router here!
const express = require("express");

const URL = "/projects";

const { validateProjectId, validateProject } = require("./projects-middleware");

const Projects = require("./projects-model");

const router = express.Router();

router.get(URL, (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});
router.get(`${URL}/:id`, validateProjectId, (req, res, next) => {
  Projects.get(req.params.id)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.post(URL, validateProject, (req, res, next) => {
  Projects.insert({
    name: req.name,
    description: req.description,
    completed: req.completed,
  })
    .then((newProject) => {
      res.status(200).json(newProject);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something tragic happened",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
