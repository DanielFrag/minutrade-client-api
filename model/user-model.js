const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.model('User', new Schema({
	address: Schema.Types.String,
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