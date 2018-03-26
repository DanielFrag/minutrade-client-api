const pattern = /^\w+((\.|-|\+)?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
module.exports = (email) => {
	return pattern.test(email);
	//throw new Error('Invalid email');
};
