const phoneChecker = require('../../utils/phone-checker');

describe('Utils "phone-checker" test (interface)', () => {
	it('Should test valid phone numbers', () => {
		const valid = [
			'+55 (21) 1234-1234',
			'+55 (21) 12345-1234',
			'55 21 1234-1234',
			'55 21 12345-1234',
			'55 21 12341234',
			'55 21 123451234',
			'552112341234',
			'5521123451234',
		];
		valid.forEach(phone => {
			if (!phoneChecker(phone)) {
				throw new Error(`Should support the format: ${phone}`);
			}
		});
	});
	it('Should test invalid phone numbers', () => {
		const invalid = [
			'1234567',
			'123-4567',
			'br1234-5678',
			'br 1234-5678',
		];
		invalid.forEach(phone => {
			if (phoneChecker(phone)) {
				throw new Error(`Shouldn't support the format: ${phone}`);
			}
		});
	});
});