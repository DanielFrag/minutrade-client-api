const charToReplace = /\+|\(|\)|\-|\s/g;
const pattern = /^\d{8,13}$/;

function formatPhone(phoneStr) {
	if (typeof phoneStr != 'string') {
		throw new Error('The phone must be a string');
	}
	return phoneStr.replace(charToReplace, '');
}

function validatePhone(phoneStrFormated) {
	return pattern.test(phoneStrFormated);
}

module.exports = (phoneStr) => {
	return validatePhone(formatPhone(phoneStr));
};
