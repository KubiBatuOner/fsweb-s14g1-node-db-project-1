const router = require("express").Router();
const AccountModel = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let allAccounts = await AccountModel.getAll();
    res.json(allAccounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let existAccount = req.Account;
    res.json(existAccount);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let insertedData = await AccountModel.create(req.body);
      res.status(201).json(insertedData);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let updatedData = await AccountModel.updateById(req.params.id, req.body);
      res.json(updatedData);
    } catch (error) {
      next();
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await AccountModel.deleteById(req.params.id);
    res.json(req.Account);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 400).json({
    customMessage: "Bir hata oluştu",
    message: err.message,
  });
});

module.exports = router;
