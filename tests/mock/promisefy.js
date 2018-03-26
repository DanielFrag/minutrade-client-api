module.exports = async (payload) => {
	const p = new Promise(pResolve => {
		process.nextTick(() => {
			pResolve();
		});
	});
	return p.then(() => {
		return payload;
	});
};
