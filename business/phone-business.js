const phoneChecker = require('../utils/phone-checker');
module.exports = {
	checkUserData(user) {
		if (!Array.isArray(user.phoneNumbers)) {
			throw new Error('The field phoneNumbers must be an array');
		}
		for (let phone of user.phoneNumbers) {
			if (!phoneChecker(phone)) {
				throw new Error('Invalid phone number');
			}
		}
	}
};