import { fetchOneDevice } from '@/http/DeviceAPI'
import './style.scss'
import DeviceInfo from '@/components/deviceInfo/DeviceInfo';

async function page({ params }) {
  const data = await fetchOneDevice(params.id);
  return (
    <DeviceInfo data={data} />
  )
}

export default page