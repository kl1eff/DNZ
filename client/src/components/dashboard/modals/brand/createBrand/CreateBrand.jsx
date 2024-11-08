'use client'

import './style.scss'
import { IoCloseSharp } from "react-icons/io5";
import { createBrand } from '@/http/DeviceAPI';
import { useState } from 'react';

function CreateBrand({ isActive }) {
  const [input, setInput] = useState('');

  const createBrandButton = () => {
    createBrand({ name: input }).then(() => isActive(false))
  }

  return (
    <div className="createBrandWrapper">
      <div>
        <input type="text" placeholder="Название бренда" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={createBrandButton}>Создать</button>
        <IoCloseSharp className='close' size={40} color='black' onClick={() => {
          isActive(false);
        }} />
      </div>
    </div>
  )
}

export default CreateBrand