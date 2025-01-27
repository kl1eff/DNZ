'use client'

import Link from 'next/link';
import './style.scss';
import { useContext } from 'react';
import { Context } from '../wrapper/Wrapper';
import { observer } from "mobx-react-lite";
import { useEffect } from 'react';
import { fetchTypes } from '@/http/DeviceAPI';
import { fetchDevices } from '@/http/DeviceAPI';

const Types = observer(() => {
  const { device } = useContext(Context)
  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.selectedType])
  return (
    <nav>
      <b>Категории</b>
      {device.types.map((type) => {
        return <div key={type.name} className={device.selectedType === type ? 'selected' : ''} onClick={() => device.setSelectedType(type)}>{type.name}</div>;
      })}
      <button onClick={() => device.setSelectedType([])}>Сбросить</button>
    </nav>
  )
});
 
export default Types   