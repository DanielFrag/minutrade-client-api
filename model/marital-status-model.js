const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.model('MaritalStatus', new Schema({
	status: {
		type: Schema.Types.String,
		unique: true,
		index: true,
		required: true
	}
}));