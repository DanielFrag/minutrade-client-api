const emailChecker = require('../../utils/email-checker');

describe('Utils "email-checker" test (interface)', () => {
	it('Should check valid emails', () => {
		const valid = [
			'email@example.com',
			'firstname.lastname@example.com',
			'email@subdomain.example.com',
			'firstname+lastname@example.com',
			'email@123.123.123.123',
			'1234567890@example.com',
			'email@example-one.com',
			'_______@example.com',
			'email@example.co.jp',
			'firstname-lastname@example.com'
		];
		valid.forEach(email => {
			if (!emailChecker(email)) {
				throw new Error(`Should support the email: ${email}`);
			}
		});
	});
	it('Should check invalid emails', () => {
		const invalid = [
			'mysite.ourearth.com', //@ is not present
			'mysite@.com.my', //tld (Top Level domain) can not start with dot "."
			'@you.me.net', //No character before @
			'mysite123@gmail.b', //".b" is not a valid tld
			'mysite@.org.org', //tld can not start with dot "."
			'.mysite@mysite.org', //an email should not be start with "."
			'mysite()*@gmail.com', //here the regular expression only allows character, digit, underscore, and dash
			'mysite..1234@yahoo.com' //double dots are not allowed
		];
		invalid.forEach(email => {
			if (emailChecker(email)) {
				throw new Error(`Test Error: should not support the email: ${email}`);
			}
		});
	});
});