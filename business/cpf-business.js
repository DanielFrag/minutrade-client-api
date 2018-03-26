const cpfChecker = require('../utils/cpf-checker');
module.exports = {
	checkUserData(user) {
		if (!cpfChecker.validate(user.cpf)) {
			throw new Error('Invalid cpf');
		}
		user.cpf = cpfChecker.formatCpf(user.cpf);
	}
};