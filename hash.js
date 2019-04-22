const bcrypt = require('bcrypt');

async function hashingPassword(data) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
}

async function isValid(data, hash) {
  return await bcrypt.compare(data, hash);
}

hashingPassword('123')
  .then(result => isValid('456', result))
  .then(res => console.log(res));
