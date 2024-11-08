'use client'
import { registration } from '@/http/UserAPI';
import './style.scss';
import { useContext, useState } from "react"
import { Context } from '../wrapper/Wrapper';
import { IoCloseSharp } from "react-icons/io5";

function Registration({ setModalRegistrationActive }) {
  const [email, setEmail] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [notMatch, setNotMatch] = useState(false);
  const { user } = useContext(Context);

  const RegistrationButton = async () => {
    if (password1 != password2) {
      setNotMatch(true);
      return;
    } else {
      setNotMatch(false);
    }
    try {
      const data = await registration(email, password1);
      user.setUser(data);
      user.setIsAuth(true);
      setModalRegistrationActive(false);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <div className="wrapper">
      <div>
        <IoCloseSharp className='close' size={40} color='black' onClick={() => {
          setModalRegistrationActive(false);
          setEmail(null);
          setPassword1(null);
        }} />
        <p>Регистрация</p>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder="Пароль" />
        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Повторите пароль" />
        {notMatch && <span>Пароли не совпадают!</span>}
        <button onClick={RegistrationButton}>Зарегистрироваться</button>  
      </div>
    </div>
  )
}

export default Registration