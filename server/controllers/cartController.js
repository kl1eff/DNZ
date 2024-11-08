const { Cart, CartDevice } = require('../models/models');
const { ApiError } = require('../error/ApiError');

const CartController = {
  getContent: async (req, res) => {
    const cart = await Cart.findOne({
      where: { id: req.params.id },
      include: [{ model: CartDevice, as: 'device' }]
    });

    return res.json(cart);
  },
  addToCart: async (req, res) => {
    const device = await CartDevice.findOne({
      where: { cartId: req.body.cartId, deviceId: req.body.deviceId }
    });
    if (device) {
      device.amount++;
      device.save();
      return res.json(device)
    } else {
      const cartDevice = await CartDevice.create({ cartId: req.body.cartId, deviceId: req.body.deviceId });
      return res.json(cartDevice);
    }

   
  },
  deleteFromCart: async (req, res) => {
    const device = await CartDevice.findOne({
      where: { cartId: req.body.cartId, deviceId: req.body.deviceId }
    });
    if (device) {
      if (device.amount === 1) {
        device.destroy();
        return res.status(200).send('error');
      } else {
        device.amount--;
        device.save();
        return res.json(device);
      }
    } else {
      return res.status(500).send('error');
    }

  } 
}

module.exports = CartController;