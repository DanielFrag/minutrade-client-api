const mongoose = require('mongoose');
const MaritalStatus = mongoose.model('MaritalStatus');
module.exports = {
	async getAll() {
		return MaritalStatus
			.find()
			.lean();
	}
};