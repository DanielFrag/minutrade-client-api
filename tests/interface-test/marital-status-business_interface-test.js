const chai = require('chai');
const path = require('path');
const maritalStatusRepoMock = require('../mock/marital-status-repository-mock');
const maritalStatusRepoPath = path.resolve(__dirname, '../../repository/marital-status-repository.js');
require.cache[maritalStatusRepoPath] = {
	exports: maritalStatusRepoMock
};
const maritalStatusBusiness = require('../../business/marital-status-business');

describe('Business test "marital-status-business" (interface)', () => {
	it('Should test the default options of marital status', async () => {
		const divorced = await maritalStatusBusiness.isValid('divorced');
		const married = await maritalStatusBusiness.isValid('married');
		const single = await maritalStatusBusiness.isValid('single');
		const widowed = await maritalStatusBusiness.isValid('widowed');
		const unknow = await maritalStatusBusiness.isValid('unknow');
		chai.expect(divorced).true;
		chai.expect(married).true;
		chai.expect(single).true;
		chai.expect(widowed).true;
		chai.expect(unknow).false;
	});
	it('Should test the custom options of marital status', async () => {
		maritalStatusRepoMock.insertMaritalStatus('custom');
		const divorced = await maritalStatusBusiness.isValid('divorced');
		const custom = await maritalStatusBusiness.isValid('custom');
		chai.expect(divorced).false;
		chai.expect(custom).true;
	});
});
