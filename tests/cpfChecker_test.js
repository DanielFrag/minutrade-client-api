const chai = require('chai');
const cpfChecker = require('../utils/cpfChecker');

describe('Utils cpfChecker test', () => {
	it('Should test valid cpfs', () => {
		const cpfs = ['347.496.221-33', '219.706.502-57', '675.255.777-22'];
		const result = cpfs.reduce((t, c) => cpfChecker(c) && t, true);
		chai.expect(result).true;
	});
	it('Should test invalid cpfs', () => {
		const cpfs = ['347.496.221-03', '219.706.502-56', '975.255.777-22'];
		const result = cpfs.reduce((t, c) => {
			try {
				cpfChecker(c);
				throw new Error('Test Error');
			} catch (e) {
				if (typeof e == 'string') {
					chai.expect(e != 'Test Error').true;
				}
			}
		});
	});
});