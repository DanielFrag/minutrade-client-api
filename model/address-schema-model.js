const { Schema } = require('mongoose');
module.exports = new Schema({
	complement: Schema.Types.String,
	country: Schema.Types.String,
	number: Schema.Types.Number,
	state: Schema.Types.String,
	street: Schema.Types.String
}, {
	_id: false,
	id: false
});