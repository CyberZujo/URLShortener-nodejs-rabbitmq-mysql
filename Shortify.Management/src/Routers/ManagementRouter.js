import express from 'express';
import managementController from '../Controllers/ManagementController';
const management = express.Router();

management.post('/create', managementController.post);
management.delete('/delete',managementController.delete);
export default management;
