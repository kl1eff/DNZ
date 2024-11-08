'use client'

import { login } from '@/http/UserAPI';
import './style.scss'
import { useContext, useState } from "react"
import { Context } from '../wrapper/Wrapper';
import { IoCloseSharp } from "react-icons/io5";

function Auth({ setModalLoginActive }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user } = useContext(Context);

  const loginButton = async () => {
    try {
      const data = await login(email, password)
      user.setUser(data);
      user.setIsAuth(true);
      localStorage.isAuth = true;
      setModalLoginActive(false);
    } catch (e) {
      alert(e.response?.data.message);
      alert(e.message);
    }
  }

  return (
    <div className="wrapper">
      <div>
        <IoCloseSharp className='close' size={40} color='black' onClick={() => {
          setModalLoginActive(false);
          setEmail(null);
          setPassword(null);
        }} />
        <p>Войдите</p>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
        <button onClick={loginButton}>Войти</button>
      </div>
    </div>
  )
}

export default Auth