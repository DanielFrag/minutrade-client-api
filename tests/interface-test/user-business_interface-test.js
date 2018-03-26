const chai = require('chai')
const path = require('path');
const maritalStatusRepoMock = require('../mock/marital-status-repository-mock');
const maritalStatusRepoPath = path.resolve(__dirname, '../../repository/marital-status-repository.js');
require.cache[maritalStatusRepoPath] = {
	exports: maritalStatusRepoMock
};
const userBusiness = require('../../business/user-business');

describe('Business "user-business" test (interface)', () => {
    const user = {
        _id: 'userId',
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
	it('Should get the valid params to update user', async () => {
        const params = {
            _id: 'cannotchange',
            cpf: 'cannotchange',
            email: 'newemail@email.com',
            maritalStatus: 'married',
            unknow: 'unknow'
        };
        const objectToUpdate = await userBusiness.checkParamsToUpdate(user, params);
        chai.expect(objectToUpdate.email).to.be.equal(params.email);
        chai.expect(objectToUpdate._id).not.exist;
        chai.expect(objectToUpdate.cpf).not.exist;
        chai.expect(objectToUpdate.maritalStatus).to.be.equal(params.maritalStatus);
        chai.expect(objectToUpdate.unknow).not.exist;
    });
});