'use client'
import './style.scss';
import { useContext } from 'react';
import { Context } from '../wrapper/Wrapper';
import { observer } from "mobx-react-lite";
import DeviceCard from "../deviceCard/DeviceCard";
import Pagination from '../pagination/Pagination';


const DeviceList = observer(() => {
  const { device } = useContext(Context);

  return (
    <div className='listContainer'>
      <div className='deviceList'>
        {device.devices.map((device) => {
          return <DeviceCard key={device.id} deviceProp={device} />;
        })}
      </div>
      <div className='pagination'>
        <Pagination />
      </div>
    </div>
  )
});

export default DeviceList