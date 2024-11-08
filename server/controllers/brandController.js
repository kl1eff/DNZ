const { Brand } = require('../models/models');
const { ApiError } = require('../error/ApiError');
const { where } = require('sequelize');

const BrandController = {
  create: async (req, res) => {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  },

  delete: async (req, res) => {
    const { name } = req.body;
    const brand = await Brand.destroy({ where: { name } });
    return res.json(brand);
  },

  getAll: async (req, res) => {
    const brands = await Brand.findAll();
    return res.json(brands);
  },
}

module.exports = BrandController;