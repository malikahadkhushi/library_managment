const { Users } = require('../../models');

exports.findUser = (user) => {

    let email = user.email;
    return Users.findOne({ where: { email } });

}

exports.checkUser = (user) => {

    let email = user.email;
    return Users.findAll({ where: { email } });

}

exports.registerUser = (user) => {

    return Users.create(user);

}