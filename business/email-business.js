const emailChecker = require('../utils/email-checker');
module.exports = {
	checkUserData(user) {
		if (!emailChecker(user.email)) {
			throw new Error('Invalid email');
		}
	}
};