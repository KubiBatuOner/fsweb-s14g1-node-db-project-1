const db = require("../../data/db-config");

const getAll = () => {
  // KODLAR BURAYA
  return db("accounts");
};

const getById = (id) => {
  // KODLAR BURAYA
  return db("accounts").where({ id }).first();
};

const create = (account) => {
  // KODLAR BURAYA
  const insertedAccount = db("accounts")
    .insert(account)
    .then((ids) => {
      return getById(ids[0]);
    });
  return insertedAccount;
};

const updateById = (id, account) => {
  // KODLAR BURAYA
  return db("accounts")
    .where({ id })
    .update(account)
    .then((rows) => {
      return getById(id);
    });
};

const deleteById = (id) => {
  // KODLAR BURAYA
  return db("accounts").where("id", id).delete();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
