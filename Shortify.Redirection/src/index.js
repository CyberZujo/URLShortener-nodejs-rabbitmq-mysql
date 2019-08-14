import httpServer from './Server/HttpServer';
import storageService from './Services/ConsumerStorageService';

httpServer.start();
// eslint-disable-next-line no-unused-vars
storageService.storeData().then(res =>{
	console.log('Worker started');
})


