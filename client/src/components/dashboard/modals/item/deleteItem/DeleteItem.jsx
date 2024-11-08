'use client'

import './style.scss'
import { IoCloseSharp } from "react-icons/io5";
import { deleteDevice } from '@/http/DeviceAPI';
import { Context } from '@/components/wrapper/Wrapper';
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { fetchBrands } from '@/http/DeviceAPI';

const DeleteItem = observer(({ isActive }) => {
  const { device } = useContext(Context);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchBrands().then(data => device.setBrands(data));
  }, [])

  const deleteItemButton = () => {
    deleteDevice({
      name: input.substring(input.indexOf(' ') + 1),
      brandId: device.brands.find((brand) => brand.name === input.split(' ')[0]).id
    }).then(() => isActive(false))
  }

  return (
    <div className="deleteItemWrapper">
      <div>
        <input type="text" placeholder="Бренд и название товара" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={deleteItemButton}>Удалить</button>
        <IoCloseSharp className='close' size={40} color='black' onClick={() => {
          isActive(false);
        }} />
      </div>
    </div>
  ) 
});

export default DeleteItem