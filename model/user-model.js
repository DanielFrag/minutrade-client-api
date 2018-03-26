const mongoose = require('mongoose');
const { Schema } = mongoose;
const address = require('./address-schema-model');
mongoose.model('User', new Schema({
	address,
	cpf: {
		type: Schema.Types.String,
		unique: true,
		index: true
	},
	email: Schema.Types.String,
	maritalStatus: Schema.Types.String,
	name: Schema.Types.String,
	phoneNumbers: [Schema.Types.String]
}));