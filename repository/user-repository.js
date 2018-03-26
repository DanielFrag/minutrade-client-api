const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = {
	async create(user) {
		return User.create(user);
	},
	async getByCpf(userCpf) {
		return User
			.findOne({
				cpf: userCpf
			})
			.lean();
	},
	async updateUser(userId, params) {
		return User
			.findByIdAndUpdate(userId, params, {
				new: true
			})
			.lean();
	}
};