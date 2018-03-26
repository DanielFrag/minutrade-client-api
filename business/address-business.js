const AddressSchema = require('../model/address-schema-model');
module.exports = {
	isValid(address) {
		if (typeof address != 'object') {
			return false;
		}
		for (let field in AddressSchema.obj) {
			if (AddressSchema.obj[field].schemaName.toLowerCase() != typeof address[field]) {
				return false;
			}
		}
		return true;
	},
	checkUserData(user) {
		if (!this.isValid(user.address)) {
			throw new Error('Invalid marital status');
		}
	}
};