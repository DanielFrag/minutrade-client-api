const addressBusiness = require('./address-business');
const cpfBusiness = require('./cpf-business');
const emailBusiness = require('./email-business');
const maritalStatusBusiness = require('./marital-status-business');
const nameBusiness = require('./name-business');
const phoneBusiness = require('./phone-business');
const syncCheckers = [addressBusiness, cpfBusiness, emailBusiness, nameBusiness, phoneBusiness];
const asyncCheckers = [maritalStatusBusiness];
module.exports = async (user) => {
	if (typeof user != 'object') {
		throw new Error('The user must be an object');
	}
	syncCheckers.reduce((t, c) => c.checkUserData(user))
	await asyncCheckers.reduce((prom, checker) => prom.then(() => checker.checkUserData(user)), Promise.resolve());
}