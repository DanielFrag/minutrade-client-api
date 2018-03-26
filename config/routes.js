const userHandler = require('../handler/user-handler');
module.exports = (app) => {
	app.get('/api/user/:cpf', userHandler.getUser);
	app
		.route('/api/user')
		.post(userHandler.createUser)
		.put(userHandler.updateUser);
};
