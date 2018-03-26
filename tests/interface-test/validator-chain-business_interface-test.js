const path = require('path');
const maritalStatusRepoMock = require('../mock/marital-status-repository-mock');
const maritalStatusRepoPath = path.resolve(__dirname, '../../repository/marital-status-repository.js');
require.cache[maritalStatusRepoPath] = {
	exports: maritalStatusRepoMock
};
const validatorChain = require('../../business/validator-chain-business');

describe('Business "validator-chain" test (interface)', () => {
	it('Should validate a valid user', async () => {
		const user = {
			address: {
				complement: 'complement',
				country: 'contry',
				number: 10,
				state: 'state',
				street: 'street'
			},
			cpf: '347.496.221-33',
			email: 'email@example.com',
			maritalStatus: 'divorced',
			name: 'name',
			phoneNumbers: [
				'+55 (21) 1234-1234',
				'+55 (21) 12345-1234',
				'55 21 1234-1234'
			]
		};
		await validatorChain(user);
	});
	it('Should not validate an user with an invalid marital status', async () => {
		maritalStatusRepoMock.insertMaritalStatus('custormStatus');
		const user = {
			address: {
				complement: 'complement',
				country: 'contry',
				number: 10,
				state: 'state',
				street: 'street'
			},
			cpf: '347.496.221-33',
			email: 'email@example.com',
			maritalStatus: 'divorced',
			name: 'name',
			phoneNumbers: [
				'+55 (21) 1234-1234',
				'+55 (21) 12345-1234',
				'55 21 1234-1234'
			]
		};
		try {
			await validatorChain(user);
			throw new Error('Test Error: invalid marital status was accepted');
		} catch (e) {
			if (e.message.indexOf('Test Error') > -1) {
				throw new Error(e.message);
			}
		}
	});
});