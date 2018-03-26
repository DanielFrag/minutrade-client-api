const params = require('../../config/params');
params.dbUrl = params.dbUrl + 'Test';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const mongoose = require('mongoose');
const cpfChecker = require('../../utils/cpf-checker');

describe('Server black box test', () => {
	let server;
	const validBody = {
		user: {
			address: {
				complement: "complement",
				country: "contry",
				number: 10,
				state: "state",
				street: "street"
			},
			cpf: "347.496.221-33",
			email: "email@example.com",
			maritalStatus: "divorced",
			name: "name",
			phoneNumbers: [
				"+55 (21) 1234-1234",
				"+55 (21) 12345-1234",
				"55 21 1234-1234"
			]
		}
	};
	before('Start server and clean DB', async () => {
		server = await require('../../server');
		await mongoose.connection.dropDatabase();
	});
	it('Should not find any user with an empty DB', (done) => {
		chai
			.request(server)
			.get('/api/user/34749622133')
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(404);
				done();
			});
	});
	it('Should create a valid user', (done) => {
		chai
			.request(server)
			.post('/api/user')
			.send(validBody)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(201);
				chai.expect(res).to.have.header('Location', `/api/user/${cpfChecker.formatCpf(validBody.user.cpf)}`)
				done();
			});
	});
	it('Should find an inserted user', (done) => {
		chai
			.request(server)
			.get(`/api/user/${cpfChecker.formatCpf(validBody.user.cpf)}`)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(200);
				done();
			});
	});
	it('Should not duplicate cpfs', (done) => {
		chai
			.request(server)
			.post('/api/user')
			.send(validBody)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(409);
				done();
			});
	});
	it('Should not create a user with an invalid cpf', (done) => {
		validBody.user.cpf = '11111111111';
		chai
			.request(server)
			.post('/api/user')
			.send(validBody)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(400);
				done();
			});
	});
	after('Clean DB', async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});
});
