const pattern = /^\w+((\.|-|\+)?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
module.exports = (string) => {
	return pattern.test(string);
}