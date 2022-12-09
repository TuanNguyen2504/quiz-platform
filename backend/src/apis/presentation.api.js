const presentationApi = require('express').Router();
const controller = require('~/controllers/presentation.controller');

presentationApi.get('/list', controller.getMyPresentation);
presentationApi.get('/check-code', controller.getCheckCode);
presentationApi.delete('/:presentationId', controller.deletePresentation);

module.exports = presentationApi;
