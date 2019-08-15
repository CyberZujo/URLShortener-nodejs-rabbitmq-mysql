import express from 'express';
import managementController from '../Controllers/ManagementController';
const management = express.Router();

management.post('/', managementController.post);
management.delete('/',managementController.delete);
export default management;
