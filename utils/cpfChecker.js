function checkDigit(cpfBlock, digit) {
	let dResult = 11 - (cpfAcc(cpfBlock) % 11);
	if (dResult < 2) {
		dResult = 0;
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

function formatCPF(cpf) {
	if (typeof cpf != 'string') {
		throw new Error('CPF must be a string')
	}
	let cpfNumbers = cpf.replace(/\.|-/gi, '');
	const len = cpfNumbers.length;
	if (len == 0 || len > 11) {
		throw new Error('Invalid number of digits')
	} else if (len < 11) {
		cpfNumbers = new Array(11 - cpfNumbers.length + 1).join('0') + cpfNumbers;
	} else if (cpfNumbers.split('').reduce((t, c) => t == c ? c : false)) {
		throw new Error('Digit repeat not allowed');
	}
	return cpfNumbers;
}

function validadeCPF(stringCPF) {
	if (typeof stringCPF != 'string' && stringCPF.length != 11) {
		throw new Error('Invalid cpf string')
	}
	return checkDigit(stringCPF.substring(0, 9), parseInt(stringCPF.charAt(9))) && checkDigit(stringCPF.substring(0, 10), parseInt(stringCPF.charAt(10)));
}

module.exports = (cpf) => {
	return validadeCPF(formatCPF(cpf));
}