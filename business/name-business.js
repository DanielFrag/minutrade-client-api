module.exports = {
	checkUserData(user) {
		if (!user.name || typeof user.name != 'string') {
			throw new Error('Invalid name');
		}
	}
};