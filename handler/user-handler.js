const userRepo = require('../repository/user-repository');
const validatorChainBusiness = require('../business/validator-chain-business');
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
	}
}