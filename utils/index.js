const bcrypt = require('bcrypt');

const bcryptHash = async password => bcrypt.hash(password, 10);

module.exports = {
    bcryptHash,
}
