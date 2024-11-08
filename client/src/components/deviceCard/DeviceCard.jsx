'use client'

import { observer } from 'mobx-react-lite';
import './style.scss';
import { useContext } from 'react';
import { Context } from '../wrapper/Wrapper';
import { addToCart } from '@/http/CartAPI';
import { useState } from 'react';
import { useRouter } from 'next/navigation';



const DeviceCard = observer(({ deviceProp }) => {
  const { device } = useContext(Context);
  const { user } = useContext(Context);
  const [isAdded, setIsAdded] = useState(false);
  const addToCartButton = () => {
    if (user.isAuth) {
      addToCart(user.user.id, deviceProp.id);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 600);
    } else {
      alert('войдите, чтобы пользоваться корзиной!')
    }
  }

  const { push } = useRouter();
  const redirect = () => {
    push(`/device/${deviceProp.id}`);
  }

  const brand = device.brands.filter((brand) => brand.id === deviceProp.brandId)[0];
  return (
    <div className='card' onClick={redirect}>
      <img src={process.env.NEXT_PUBLIC_API_URL + deviceProp.image} alt="" />
      <p>{brand?.name ?? ''} {deviceProp.name}</p>
      <p>{deviceProp?.price}₽</p>
      <button className={isAdded ? 'added' : ''} onClick={(e) => {
        addToCartButton();
        e.stopPropagation();
      }}>{isAdded ? 'В корзине!' : 'купить'}</button>
    </div>
  )
});

export default DeviceCard