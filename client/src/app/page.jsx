import "./style.scss";
import Types from "@/components/types/Types";
import Brands from "@/components/brands/Brands";
import DeviceList from "@/components/deviceList/DeviceList";

export default function Home() {
  return (
    <main>
      <aside>
        <Types />
        <Brands />
      </aside>
      <DeviceList />
    </main>
  );
}
