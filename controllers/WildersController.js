const { Wilder } = require("../models/wilder");

module.exports = {
  getAll: async (req, res) => {
    const Wilders = await Wilder.find();
    res.json({ result: Wilders });
    // res.json({ code: 200, message: 'Wilders found' });
  },
  getOne: async (req, res) => {
    const getWilder = req.params.wilderId;
    const Wilderfound = await Wilder.findOne({ _id: getWilder });
    res.json({ result: Wilderfound });
    // res.json({ code: 200, message: 'Wilder found' })
  },
  updateOne: async (req, res) => {
    const wilderId = req.params.wilderId;
    const newWilderData = req.body;
    const updatedWilder = await Wilder.findByIdAndUpdate(
      { _id: wilderId },
      newWilderData,
      { new: true }
    );
    if (updatedWilder === null) {
      throw { code: 404, message: 'Wilder not found' };
    }
    res.json({ result: updatedWilder });
  },
  removeAll: async () => {
    await Wilder.deleteMany().then((r) => {
      console.log(r);
    });
  },
  removeOne: async (req, res) => {
    const wilderToDelete = req.params.wilderId;
    await Wilder.deleteOne({ _id: wilderToDelete }).then((r) => {
      console.log(r);
    });
  },
  create: async (req, res) => {
    await Wilder.init();
    const newWilder = new Wilder(req.body);
    const savedWilder = newWilder.save();
    res.json({ result: savedWilder });
  },
};
