function checkDigit(cpfBlock, digit) {
	let dResult = cpfAcc(cpfBlock) % 11;
	if (dResult < 2) {
		dResult = 0;
	} else {
		dResult = 11 - dResult;
	}
	return dResult == digit;
}

function cpfAcc(cpfSubStr) {
	let len = cpfSubStr.length, acc = 0;
	for (let i = len - 1; i >=0; i--) {
		acc += parseInt(cpfSubStr[i]) * (1 + (len - i));
	}
	return acc;
}

function validadeCpf(stringCpf) {
	if (typeof stringCpf != 'string' || stringCpf.length != 11) {
		throw new Error('Invalid cpf string')
	}
	return checkDigit(stringCpf.substring(0, 9), parseInt(stringCpf.charAt(9))) && checkDigit(stringCpf.substring(0, 10), parseInt(stringCpf.charAt(10)));
}

module.exports = {
	formatCpf(cpf) {
		if (typeof cpf != 'string') {
			throw new Error('CPF must be a string')
		}
		let cpfNumbers = cpf.replace(/\.|-/gi, '');
		const len = cpfNumbers.length;
		if (len == 0 || len > 11) {
			throw new Error('Invalid number of digits')
		} else if (len < 11) {
			cpfNumbers = new Array(11 - cpfNumbers.length + 1).join('0') + cpfNumbers;
		} else if (cpfNumbers.split('').reduce((t, c) => t === c ? c : false)) {
			throw new Error('Digit repeat not allowed');
		}
		return cpfNumbers;
	},
	validate (cpf) {
		return validadeCpf(this.formatCpf(cpf));
	}
};
