// Write your "actions" router here!
const express = require("express");

const URL = "/actions";

const { validateActionId } = require("./actions-middlware");

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

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something tragic happened",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
