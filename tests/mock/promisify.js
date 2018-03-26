module.exports = async (payload) => {
	return new Promise(pResolve => {
		process.nextTick(() => {
			pResolve(payload);
		});
	});
};
