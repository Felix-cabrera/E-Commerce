const { getAll, create, getOne, remove, update } = require('../controllers/category.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const categoryRouter = express.Router();

categoryRouter.route('/')
    .get(getAll)
    .post(verifyJWT , create);

categoryRouter.route('/:id')
    .delete(verifyJWT , remove)
    .put(verifyJWT , update);

module.exports = categoryRouter;