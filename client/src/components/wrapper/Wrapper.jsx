"use client"

import React, { createContext } from 'react';
import UserStore from "@/store/UserStore";
import DeviceStore from '@/store/DeviceStore';
import CartStore from '@/store/CartStore';


const Context = createContext(null);


export { Context }
export function Wrapper({ children }) {

  return (
    <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),
      cart: new CartStore()
    }}>
      {children}
    </Context.Provider>
  );
}
