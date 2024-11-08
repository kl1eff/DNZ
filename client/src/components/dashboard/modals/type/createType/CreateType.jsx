'use client'

import './style.scss'
import { IoCloseSharp } from "react-icons/io5";
import { createType } from '@/http/DeviceAPI';
import { useState } from 'react';

function CreateType({ isActive }) {
  const [input, setInput] = useState('');

  const createTypeButton = () => {
    createType({ name: input }).then(() => isActive(false))
  }

  return (
    <div className="createTypeWrapper">
      <div>
        <input type="text" placeholder="Название категории" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={createTypeButton}>Создать</button>
        <IoCloseSharp className='close' size={40} color='black' onClick={() => {
          isActive(false);
        }} />
      </div>
    </div>
  )
}

export default CreateType