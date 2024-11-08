const { Type } = require('../models/models');
const { ApiError } = require('../error/ApiError');

const TypeController = {
  create: async (req, res) => {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  },

  delete: async (req, res) => {
    const { name } = req.body;
    const brand = await Type.destroy({ where: { name } });
    return res.json(brand);
  },

  getAll: async (req, res) => {
    const types = await Type.findAll();
    return res.json(types);
  },
}

module.exports = TypeController;