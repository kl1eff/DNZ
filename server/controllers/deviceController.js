const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

const DeviceController = {
  create: async (req, res, next) => {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { image } = req.files;

      let fileName = uuid.v4() + '.jpg';
      image.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({ name, price, brandId, typeId, image: fileName });

      if (info) {
        info = JSON.parse(info);
        info.forEach(element => {
          DeviceInfo.create({
            title: element.title,
            description: element.description,
            deviceId: device.id
          })
        });
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  },

  delete: async (req, res) => {
    const { brandId, name } = req.body;
    const device = Device.destroy({ where: { brandId, name } })
    return res.json(device);
  },

  getAll: async (req, res) => {
    let { brandId, typeId, limit, page } = req.query;
    let devices;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;

    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
    }
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }

    return res.json(devices);
  },

  getOne: async (req, res) => {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }]
    });
    return res.json(device);
  },

  getOneByName: async (req, res) => {
    const { name } = req.params;
    const device = await Device.findOne({
      where: { name },
    })
    return res.json(device);
  }
}

module.exports = DeviceController;