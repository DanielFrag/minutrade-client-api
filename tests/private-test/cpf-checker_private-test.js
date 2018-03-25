const chai = require('chai');
const rewire = require('rewire');
const cpfChecker = rewire('../../utils/cpf-checker');

describe('Utils cpfChecker test (private functions)', () => {
	it('Should test the "formatCpf" with invalid input', () => {
		const formatCpf = cpfChecker.__get__('formatCpf');
		const invalid = {
			nonString: 34561234,
			big: '012345678910',
			short: '',
			repeated: '11111111111'
		};
		const keys = Object.keys(invalid);
		keys.forEach(k => {
			try {
				formatCpf(invalid[k]);
				throw new Error(`${k} not handled`);
			} catch (e) {
				chai.expect(e.message).not.be.equal(`${k} not handled`);
			}
		});
	});
	it('Should test the "formatCpf" with valid input', () => {
		const formatCpf = cpfChecker.__get__('formatCpf');
		const valid = {
			incomplete: '55.365-22',
			perfect: '347.496.221-33',
			unformated: '21970650257'
		};
		const keys = Object.keys(valid);
		const result = keys.reduce((t, c) => typeof formatCpf(c) == 'string' && t, true);
		chai.expect(result).true;
	});
	it('Should test the "cpfAcc"', () => {
		const cpfAcc = cpfChecker.__get__('cpfAcc');
		const firstBlock = cpfAcc('111111111');
		const secondBlock = cpfAcc('1111111111');
		chai.expect(firstBlock).be.equal(10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2);
		chai.expect(secondBlock).be.equal(11 + 10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2);
	});
	it('Should test the "checkDigit"', () => {
		const checkDigit = cpfChecker.__get__('checkDigit');
		const validCpf = '219706502';
		const firstDigit = 5;
		const secondDigit = 7;
		chai.expect(checkDigit(validCpf, firstDigit)).true;
		chai.expect(checkDigit(validCpf, firstDigit + 1)).false;
		chai.expect(checkDigit(validCpf, firstDigit - 1)).false;
		chai.expect(checkDigit(validCpf + firstDigit, secondDigit)).true;
		chai.expect(checkDigit(validCpf + (firstDigit + 1), secondDigit)).false;
		chai.expect(checkDigit(validCpf + (firstDigit - 1), secondDigit)).false;
	});
	it('Should test the "validadeCpf" with invalid cpfs', () => {
		const validadeCpf = cpfChecker.__get__('validadeCpf');
		const invalid = {
			nonString: 34561234,
			big: '012345678910',
			short: '12345'
		};
		const keys = Object.keys(invalid);
		keys.forEach(k => {
			try {
				validadeCpf(invalid[k]);
				throw new Error(`${k} not handled`);
			} catch (e) {
				chai.expect(e.message).not.be.equal(`${k} not handled`);
			}
		});
	});
	it('Should test the "validadeCpf" with valid cpfs', () => {
		const validadeCpf = cpfChecker.__get__('validadeCpf');
		const valid = '67525577722';
		chai.expect(validadeCpf(valid)).true;
	});
});