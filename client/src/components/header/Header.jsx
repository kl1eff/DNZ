'use client'

import './style.scss';
import { useContext, useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { Context } from '../wrapper/Wrapper';
import Auth from '../auth/Auth';
import Registration from '../registration/Registration';
import { observer } from "mobx-react-lite";
import { fetchDevices, fetchOneDeviceByName } from '@/http/DeviceAPI';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import getCookie from '@/utils/getCookie';

const Header = observer(() => {
  const { user, device } = useContext(Context);
  const [modalLoginActive, setModalLoginActive] = useState(false);
  const [modalRegistrationActive, setModalRegistrationActive] = useState(false);
  const [input, setInput] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const searchClick = () => {
    if (input.length > 0) {
      fetchOneDeviceByName(input).then((data) => data && device.setDevices([data]));
    } else {
      fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      })
    }
  }

  const logout = () => {
    user.setUser({});
    setIsAuth(false);
    user.setIsAuth(false);
    localStorage.isAuth = false;
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;'
  }

  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem('isAuth')) ?? false;
    const token = getCookie('token');
    const savedUser = token ? jwtDecode(token) : {};
  
    if (savedAuth) {
      user.setIsAuth(true);
      user.setUser(savedUser);
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  useEffect(() => {
    setIsAuth(user.isAuth);
    setIsAdmin(user.user.role === 'ADMIN')
    console.log(user.user);
  }, [user.isAuth])

  return (
    <header>
      {modalLoginActive && <Auth setModalLoginActive={setModalLoginActive} />}
      {modalRegistrationActive && <Registration setModalRegistrationActive={setModalRegistrationActive} />}
      <h1><Link href='/'>DNZ</Link></h1>
      <div className='search'>
        <IoIosSearch className='search__icon' size={23} onClick={searchClick} />
        <input type="text" name="search" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {isAdmin && <Link className='dashboard' href='/dashboard'>Админ панель</Link>}
      {isAuth ? <>
        <p className='email'>{jwtDecode(getCookie('token') ?? null)?.email}</p>
        <p onClick={logout}>Выход</p>
      </> : <>
        <p onClick={() => setModalLoginActive(true)}>Вход</p>
        <p onClick={() => setModalRegistrationActive(true)}>Регистрация</p>
      </>}
      {isAuth && <Link href='/cart'><IoCartSharp className='cart__icon' size={53} /></Link>}
    </header>
  )   
})

export default Header