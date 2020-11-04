const { Wilder } = require("../models/wilder");

module.exports = {
  getAll: async () => {
    try {
      const Wilders = await Wilder.find();
      res.json({ result: Wilders });
    } catch (err) {
      res.json({ code, message });
    }
  },
  update: async (req, res) => {
    const wilderId = req.params.wilderId;
    const newWilderData = req.body;
    const updatedWilder = await Wilder.findByIdAndUpdate(
      { _id: wilderId },
      newWilderData
    );
    res.json({ result: updatedWilder });
  },
  removeAll: async () => {
    await Wilder.remove()
      .then((wilders) => {
        res.json({ result: wilders });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  },
  remove: async (req, res) => {
    const wilderToDelete = req.params.wilderId;
    await Wilder.deleteOne({ _id: wilderToDelete }).then((r) => {
      console.log(r);
    });
  },
  create: async (req, res) => {
    const newWilder = new Wilder(req.body);
    try {
      await Wilder.init();
      const newWilder = new Wilder(req.body);
      const savedWilder = newWilder.save();
      res.json({ result: savedWilder });
    } catch (err) {
      next(err);
    }
  },
};
