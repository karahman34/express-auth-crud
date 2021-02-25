const UserResource = require('./UserResource');

module.exports = (collection) => ({
  count: collection.count,
  rows: collection.rows.map((row) => UserResource(row)),
});
