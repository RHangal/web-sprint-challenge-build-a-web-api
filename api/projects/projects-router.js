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

router.put(`${URL}/:id`, validateProjectId, (req, res) => {
  const { name, description, completed } = req.body;
  Projects.update(req.params.id, {
    name: name,
    description: description,
    completed: completed,
  })
    .then((updatedProject) => {
      res.status(400).json(updatedProject);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
});

router.delete(`${URL}/:id`, validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get(`${URL}/:id/actions`, validateProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((projectActions) => {
      res.status(200).json(projectActions);
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
