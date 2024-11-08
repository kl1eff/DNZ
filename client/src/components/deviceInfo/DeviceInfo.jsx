'use client'
import { observer } from "mobx-react-lite";
import { Context } from "../wrapper/Wrapper";
import { useContext } from "react";
import { useEffect } from "react";
import { fetchBrands, fetchOneDevice } from "@/http/DeviceAPI";
import { useState } from "react";
import { addToCart } from "@/http/CartAPI";
import "./style.scss"

const DeviceInfo = observer(({ data }) => {
  const { device, user } = useContext(Context);
  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    fetchBrands().then(data => device.setBrands(data));
  }, [])

  const brand = device.brands.filter((brand) => brand.id === data.brandId)[0];


  const addToCartButton = () => {
    if (user.isAuth) {
      addToCart(user.user.id, data.id);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 600);
    } else {
      alert('войдите, чтобы пользоваться корзиной!')
    }
  }

  //[{"title": "Screen Size", "description": "6.5 inches"}, {"title": "Battery", "description": "4000mAh"}]

  return (
    <div className='info'>
      <div>
        <h1>{brand?.name} {data.name}</h1>
        <img src={process.env.NEXT_PUBLIC_API_URL + data.image} alt="" />
      </div>
      <div>
        <div className='characteristics'>
          <h2>Характеристики</h2>
          <ul>
            {data.info.map((info, index) => {
              return <li className={index % 2 ? 'redLi' : ''}>{info.title}: {info.description}</li>
            })}
          </ul>
        </div>
        <div>
          <span>{data.price}₽</span>
          <button className={isAdded ? 'added' : ''} onClick={(e) => {
            addToCartButton();
          }}>{isAdded ? 'В корзине!' : 'купить'}</button>
        </div>
      </div>
    </div>
  )
});

export default DeviceInfo