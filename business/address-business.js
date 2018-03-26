const AddressSchema = require('../model/address-schema-model');
module.exports = {
	isValid(address) {
		if (typeof address != 'object') {
			return false;
		}
		for (const sch in AddressSchema.obj) {
			if (AddressSchema.obj[sch].schemaName.toLowerCase() != typeof address[sch]) {
				return false;
			}
		}
		return true;
	}
};