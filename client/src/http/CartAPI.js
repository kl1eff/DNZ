import { $authHost, $host } from "./index";

export const fetchCart = async (id) => {
  const { data } = await $authHost.get('api/cart/' + id);
  return data;
}

export const addToCart = async (cartId, deviceId) => {
  const { data } = await $authHost.post('api/cart', { cartId, deviceId });
  return data;
}

export const deleteFromCart = async (cartId, deviceId) => {
  const { data } = await $authHost.post('api/cart/delete', { cartId, deviceId });
  return data;
}