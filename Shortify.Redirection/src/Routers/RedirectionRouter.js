import express from 'express';
import redirectionController from '../Controllers/RedirectionController';

const redirection = express.Router();
redirection.get('/:url', redirectionController.get);

export default redirection;
