// Write your "actions" router here!
const express = require("express");

const URL = "/actions";

const { validateActionId, validateAction } = require("./actions-middlware");

const Actions = require("./actions-model");

const router = express.Router();

router.get(URL, (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get(`${URL}/:id`, validateActionId, (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

router.post(URL, validateAction, (req, res, next) => {
  Actions.insert({
    notes: req.body.notes,
    description: req.body.description,
    completed: req.body.completed,
    project_id: req.body.project_id,
  })
    .then((newProject) => {
      res.status(200).json(newProject);
    })
    .catch(next);
});
router.put(`${URL}/:id`, validateActionId, validateAction, (req, res, next) => {
  Actions.update(req.params.id, {
    notes: req.body.notes,
    description: req.body.description,
    completed: req.body.completed,
    project_id: req.body.project_id,
  })
    .then((newProject) => {
      res.status(200).json(newProject);
    })
    .catch(next);
});

router.delete(`${URL}/:id`, validateActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then((projects) => {
      res.status(200).json(projects);
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
