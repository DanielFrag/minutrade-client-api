const chai = require('chai');
const addressBusiness = require('../../business/address-business');
describe('Business test "address-business" (interface)', () => {
	it('Should test a valid address struct', () => {
		const valid = {
			complement: 'Schema.Types.String',
			country: 'Schema.Types.String',
			number: 12,
			state: 'Schema.Types.String',
			street: 'Schema.Types.String'
		};
		chai.expect(addressBusiness.isValid(valid)).true;
	});
	it('Should test an invalid address struct', () => {
		const invalid = {
			country: 'Schema.Types.String',
			number: 12,
			state: 'Schema.Types.String',
			street: 'Schema.Types.String'
		};
		chai.expect(addressBusiness.isValid(invalid)).false;
	});
});