const p = require('./promisify');
const customMaritalStatus = [];
module.exports = {
	async getAll() {
		return p(customMaritalStatus);
	},
	insertMaritalStatus(status) {
		customMaritalStatus.push(status);
	}
};