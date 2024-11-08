'use client'
import ReactPaginate from "react-paginate";
import { useContext } from "react";
import { Context } from "../wrapper/Wrapper";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { fetchDevices } from "@/http/DeviceAPI";
import './style.scss'

const Pagination = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 4).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page])
  return (
    <ReactPaginate
      nextLabel='>'
      previousLabel='<'
      pageCount={Math.ceil(device.totalCount / device.limit)}
      onPageChange={(e) => {
        device.setPage(e.selected + 1);
      }}
    />
  )
})

export default Pagination