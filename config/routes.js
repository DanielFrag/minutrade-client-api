const userHandler = require('../handler/user-handler');
module.exports = (app) => {
	app.get('/api/user/:cpf', userHandler.getUser);
	app.post('/api/user/', userHandler.createUser);
};
