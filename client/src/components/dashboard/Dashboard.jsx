'use client'
import CreateBrand from './modals/brand/createBrand/CreateBrand';
import DeleteBrand from './modals/brand/deleteBrand/DeleteBrand';
import CreateType from './modals/type/createType/CreateType';
import DeleteType from './modals/type/deleteType/DeleteType';
import CreateItem from './modals/item/createItem/CreateItem';
import DeleteItem from './modals/item/deleteItem/DeleteItem';
import { useState } from 'react';
import './style.scss';

function Dashboard() {
  const [createBrandActive, setCreateBrandActive] = useState(false);
  const [deleteBrandActive, setDeleteBrandActive] = useState(false);

  const [createTypeActive, setCreateTypeActive] = useState(false);
  const [deleteTypeActive, setDeleteTypeActive] = useState(false);

  const [createItemActive, setCreateItemActive] = useState(false);
  const [deleteItemActive, setDeleteItemActive] = useState(false);

  return (
    <>
      {createBrandActive && <CreateBrand isActive={setCreateBrandActive} />}
      {deleteBrandActive && <DeleteBrand isActive={setDeleteBrandActive} />}

      {createTypeActive && <CreateType isActive={setCreateTypeActive} />}
      {deleteTypeActive && <DeleteType isActive={setDeleteTypeActive} />}

      {createItemActive && <CreateItem isActive={setCreateItemActive} />}
      {deleteItemActive && <DeleteItem isActive={setDeleteItemActive} />}


      <div className='dashboard-container'>
        <button onClick={() => setCreateItemActive(true)}>Добавить товар</button>
        <button onClick={() => setDeleteItemActive(true)}>Удалить товар</button>

        <button onClick={() => setCreateBrandActive(true)}>Добавить бренд</button>
        <button onClick={() => setDeleteBrandActive(true)}>Удалить бренд</button>

        <button onClick={() => setCreateTypeActive(true)}>Добавить категорию</button>
        <button onClick={() => setDeleteTypeActive(true)}>Удалить категорию</button>
      </div>
    </>
  )
}

export default Dashboard