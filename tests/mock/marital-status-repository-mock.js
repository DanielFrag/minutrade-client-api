const p = require('./promisefy');
const customMaritalStatus = [];
module.exports = {
	async getAll() {
		return p(customMaritalStatus);
	},
	insertMaritalStatus(status) {
		customMaritalStatus.push(status);
	}
};