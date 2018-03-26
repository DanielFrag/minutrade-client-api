const userRepo = require('../repository/user-repository');
const validatorChainBusiness = require('../business/validator-chain-business');
const userBusiness = require('../business/user-business');
const cpfBusiness = require('../business/cpf-business');
module.exports = {
	async createUser(req, res) {
		try {
			await validatorChainBusiness(req.body.user);
		} catch (e) {
			return res.status(400).send(e.message);
		}
		const previousUser = await userRepo.getByCpf(req.body.user.cpf);
		if (previousUser) {
			return res.status(409).send('The user already exists');
		}
		const user = await userRepo.create(req.body.user);
		res.set('Location', `/api/user/${user.cpf}`);
		res.status(201).send();
	},
	async getUser(req, res) {
		if (!req.params.cpf) {
			return res.status(400).send('Missing user cpf');
		}
		const user = await userRepo.getByCpf(req.params.cpf);
		if (!user) {
			return res.status(404).send('User not found');
		}
		return res.json(user);
	},
	async updateUser(req, res) {
		if (!req.body.user) {
			return res.status(400).send('Missing "user" param');
		}
		try {
			cpfBusiness.checkUserData(req.body.user);
		} catch (e) {
			return res.status(400).send(e.message);
		}
		const user = await userRepo.getByCpf(req.body.user.cpf);
		if (!user) {
			return res.status(404).send('User not found');
		}
		let paramsToUpdate;
		try {
			paramsToUpdate = await userBusiness.checkParamsToUpdate(user, req.body.user);
		} catch (e) {
			return res.status(400).send(e.message);
		}
		await userRepo.updateUser(user._id, paramsToUpdate);
		res.status(204).send();
	}
}