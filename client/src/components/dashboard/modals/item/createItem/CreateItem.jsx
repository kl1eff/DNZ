'use client'

import './style.scss'
import { IoCloseSharp } from "react-icons/io5";
import { createDevice, fetchTypes, fetchBrands } from '@/http/DeviceAPI';
import { useState } from 'react';
import { Context } from '@/components/wrapper/Wrapper';
import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const CreateItem = observer(({ isActive }) => {
  const { device } = useContext(Context);

  const [input, setInput] = useState('');
  const [type, setType] = useState(null);
  const [brand, setBrand] = useState(device.brands[0]?.name);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [price, setPrice] = useState();

  useEffect(() => {
    fetchBrands().then(data => device.setBrands(data));
  }, [])

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
  }, [])


  const createItemButton = () => {
    const formData = new FormData();
    formData.append('name', input);
    formData.append('price', price);
    formData.append('image', file);
    formData.append('brandId', device.brands.filter((b) => b.name === (brand ?? device.brands[0]?.name))[0].id);
    formData.append('typeId', device.types.filter((t) => t.name === (type ?? device.types[0]?.name))[0].id);
    formData.append('info', JSON.stringify(info));

    createDevice(formData).then(() => isActive(false))
  }

  return (
    <div className="createItemWrapper">
      <div>
        <div className='select-type'>
          <label htmlFor="types">категория</label>
          <select name="types" onChange={(e) => setType(e.target.value)}>
            {device.types.map((type) => <option value={type.name}>{type.name}</option>)}
          </select>
        </div>
        <div className='select-brand'>
          <label htmlFor="brands">бренд</label>
          <select name="brands" onChange={(e) => setBrand(e.target.value)}>
            {device.brands.map((brand) => <option value={brand.name}>{brand.name}</option>)}
          </select>
        </div>
        <input type="text" placeholder="Название товара" value={input} onChange={(e) => setInput(e.target.value)} />
        <input type="text" placeholder='Цена' value={price} onChange={(e) => setPrice(e.target.value)} />
        <div>
          <label htmlFor="file">Выберите фото</label>
          <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className='infoPanel'>
          <button onClick={() => setInfo([...info, { title: '', description: '', number: Date.now() }])}>Добавить характеристику</button>
          <ul>
            {info.map((inf) => <li key={inf.number}>
              <input
                type="text"
                placeholder='Имя характеристики'
                onChange={(e) => setInfo(info.map(i => i.number === inf.number ? { ...i, 'title': e.target.value } : i))}
              />

              <input
                type="text"
                placeholder='Значение характеристики'
                onChange={(e) => setInfo(info.map(i => i.number === inf.number ? { ...i, 'description': e.target.value } : i))}
              />

              <button onClick={() => setInfo(info.filter(i => i.number !== inf.number))}>Удалить</button>
            </li>)}
          </ul>
        </div>
        <button onClick={createItemButton}>Создать</button>
        <IoCloseSharp className='close' size={40} color='black' onClick={() => {
          isActive(false);
        }} />
      </div>
    </div>
  )
});

export default CreateItem