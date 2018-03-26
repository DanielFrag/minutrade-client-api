const validatorChainBusiness = require('./validator-chain-business');
module.exports = {
    async checkParamsToUpdate(user, newUser) {
        const keys = Object.keys(newUser);
        const cpfIndex = keys.indexOf('cpf');
        const idIndex = keys.indexOf('_id');
        if (cpfIndex > -1) {
            keys.splice(cpfIndex, 1);
        }
        if (idIndex > -1) {
            keys.splice(idIndex, 1);
        }
        const userParams = {};
        keys.forEach(k => {
            if (user[k]) {
                userParams[k] = newUser[k];
                user[k] = newUser[k];
            }
        });
        await validatorChainBusiness(user);
        return userParams;
    }
};