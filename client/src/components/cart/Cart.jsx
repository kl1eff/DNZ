'use client'

import { useEffect, useContext } from 'react';
import { addToCart, deleteFromCart, fetchCart } from '@/http/CartAPI';
import { Context } from '../wrapper/Wrapper';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { fetchOneDevice, fetchBrands } from '@/http/DeviceAPI';
import './style.scss';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import getCookie from '@/utils/getCookie';


const Cart = observer(() => {
  const { user, cart, device } = useContext(Context);

  const { push } = useRouter();
  const redirect = () => push(`/`);

  useEffect(() => {
    fetchBrands().then(data => device.setBrands(data))
    user.setUser(jwtDecode(getCookie('token')))
  }, [])

  useEffect(() => {
    if (localStorage.isAuth === 'false') {
      redirect();
    }
  }, [user.isAuth])

  useEffect(() => {
    console.log(device.brands)
    cart.setCart([])
    fetchCart(user.user.id)
      .then((cartInfo) => cartInfo.device.map((device) => fetchOneDevice(device.deviceId)
        .then(deviceInfo => cart.addToCart({ deviceInfo, amount: device.amount }))));
  }, [])

  const total = cart.cart.reduce((total, item) => total += (item.amount * item.deviceInfo.price), 0);

  return (
    <div className='cart'>
      {cart.cart.length > 0
        ?
        <>
          <h1>Ваша корзина</h1>
          <table>
            <tbody>
              <tr>
                <th>Товар</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Итого</th>
              </tr>
              {cart.cart.map((item) => item.amount > 0 &&
                <tr key={item.id}>
                  <td>
                    <img src={process.env.NEXT_PUBLIC_API_URL + item?.deviceInfo?.image} alt="" />
                    <p>
                      {device.brands.filter((brand) => {
                        console.log(brand)
                        return brand.id === item.deviceInfo.brandId;
                      })[0]?.name + '  '}
                      {item?.deviceInfo?.name}
                    </p>
                  </td>
                  <td><p>{item?.deviceInfo?.price}₽</p></td>
                  <td>
                    <button onClick={async () => {
                      await addToCart(user.user.id, item.deviceInfo.id);
                      cart.updateAmount(item.deviceInfo.id, item.amount + 1);
                    }}>+</button>
                    <p>{item?.amount}</p>
                    <button onClick={async () => {
                      await deleteFromCart(user.user.id, item.deviceInfo.id);
                      cart.updateAmount(item.deviceInfo.id, item.amount - 1);
                      if (cart.cart.every(item => item.amount === 0)) {
                        cart.setCart([]);
                      }
                    }}>-</button>
                  </td>
                  <td><p>{item?.amount * item?.deviceInfo?.price}₽</p></td>
                </tr>)}
            </tbody>
          </table>

          <div className='final'>
            <p>Итого: {total}₽</p>
            <Link href='/'><button>Оформить заказ</button></Link>
          </div>
        </>
        :
        <>
          <h1>Корзина пуста</h1>
          <Link href='/'>На главную</Link>
        </>
      }
    </div>
  )
});

export default Cart 