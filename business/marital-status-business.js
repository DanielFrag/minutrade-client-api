const defaultMaritalStatus = ['divorced', 'married', 'single', 'widowed'];
const maritalStatusRepo = require('../repository/marital-status-repository');
module.exports = {
	async isValid(status) {
		const customMaritalStatus = await maritalStatusRepo.getAll();
		const maritalStatus = Array.isArray(customMaritalStatus) && customMaritalStatus.length > 0 ? customMaritalStatus : defaultMaritalStatus;
		return maritalStatus.indexOf(status) > -1;
	},
	async checkUserData(user) {
		const result = await this.isValid(user.maritalStatus);
		if (!result) {
			throw new Error('Invalid marital status');
		}
	}
};