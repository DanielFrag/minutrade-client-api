const chai = require('chai');
const cpfChecker = require('../../utils/cpf-checker');

describe('Utils "cpf-checker" test (interface)', () => {
	it('Should test valid cpfs', () => {
		const cpfs = ['347.496.221-33', '219.706.502-57', '675.255.777-22', '927.354.772-90'];
		const result = cpfs.reduce((t, c) => cpfChecker.validate(c) && t, true);
		chai.expect(result).true;
	});
	it('Should test invalid cpfs', () => {
		const cpfs = ['347.496.221-03', '219.706.502-56', '975.255.777-22'];
		const result = cpfs.reduce((t, c) => {
			try {
				cpfChecker.validate(c);
				throw new Error('Test Error');
			} catch (e) {
				if (typeof e == 'string') {
					chai.expect(e != 'Test Error').true;
				}
			}
		});
	});
	it('Should test the "formatCpf" with invalid input', () => {
		const invalid = {
			nonString: 34561234,
			big: '012345678910',
			short: '',
			repeated: '11111111111'
		};
		const keys = Object.keys(invalid);
		keys.forEach(k => {
			try {
				cpfChecker.formatCpf(invalid[k]);
				throw new Error(`${k} not handled`);
			} catch (e) {
				chai.expect(e.message).not.be.equal(`${k} not handled`);
			}
		});
	});
	it('Should test the "formatCpf" with valid input', () => {
		const valid = {
			incomplete: '55.365-22',
			perfect: '347.496.221-33',
			unformated: '21970650257'
		};
		const keys = Object.keys(valid);
		const result = keys.reduce((t, c) => typeof cpfChecker.formatCpf(c) == 'string' && t, true);
		chai.expect(result).true;
	});
});