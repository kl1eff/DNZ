'use client'

import './style.scss'
import { IoCloseSharp } from "react-icons/io5";
import { deleteType } from '@/http/DeviceAPI';
import { useState } from 'react';

function DeleteType({ isActive }) {
  const [input, setInput] = useState('');

  const deleteTypeButton = () => {
    deleteType({ name: input }).then(() => isActive(false))
  }

  return (
    <div className="deleteTypeWrapper">
      <div>
        <input type="text" placeholder="Название категории" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={deleteTypeButton}>Удалить</button>
        <IoCloseSharp className='close' size={40} color='black' onClick={() => {
          isActive(false); 
        }} />
      </div>
    </div>
  )
}

export default DeleteType