'use client'

import './style.scss';
import { useContext } from 'react';
import { Context } from '../wrapper/Wrapper';
import { observer } from "mobx-react-lite";
import { useEffect } from 'react';
import { fetchBrands } from '@/http/DeviceAPI';
import { fetchDevices } from '@/http/DeviceAPI';

const Brands = observer(() => {
  const { device } = useContext(Context)
  useEffect(() => {
    fetchBrands().then(data => device.setBrands(data))
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.selectedBrand])
  return (
    <nav>
      <b>Производители</b>
      {device.brands.map((brand) => {
        return <div key={brand.name} className={device.selectedBrand === brand ? 'selected' : ''} onClick={() => device.setSelectedBrand(brand)}>{brand.name}</div>;
      })}
      <button onClick={() => device.setSelectedBrand([])}>Сбросить</button>
    </nav>
  )
});

export default Brands