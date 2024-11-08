'use client'

import './style.scss'
import { IoCloseSharp } from "react-icons/io5";
import { deleteBrand } from '@/http/DeviceAPI';
import { useState } from 'react';

function DeleteBrand({ isActive }) {
  const [input, setInput] = useState('');

  const deleteBrandButton = () => {
    deleteBrand({ name: input }).then(() => isActive(false))
  }

  return (
    <div className="deleteBrandWrapper">
      <div>
        <input type="text" placeholder="Название бренда" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={deleteBrandButton}>Удалить</button>
        <IoCloseSharp className='close' size={40} color='black' onClick={() => {
          isActive(false);
        }} />
      </div>
    </div>
  )
}

export default DeleteBrand