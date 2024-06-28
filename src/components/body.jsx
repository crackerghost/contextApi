import React, { createContext, useContext, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { UserContext } from './UserContext';




function Body() {
  const { items, setItems } = useContext(UserContext);
  const {quantity,setQuantity} = useContext(UserContext)

  const handleDecrease = (index) => {
    if (items[index].quantity > 1) {
      const updatedItems = [...items];
      updatedItems[index] = { ...updatedItems[index], quantity: updatedItems[index].quantity - 1 };
      setItems(updatedItems);
      updateTotal(index, updatedItems[index].quantity);
    } else {
      handleRemove(index);
    }
  };

  const handleIncrease = (index) => {
    if (items[index].quantity < 20) {
      const updatedItems = [...items];
      updatedItems[index] = { ...updatedItems[index], quantity: updatedItems[index].quantity + 1 };
      setItems(updatedItems);
      updateTotal(index, updatedItems[index].quantity);
    }
  };

  const handleRemove = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], cart: false };
    setItems(updatedItems);
    updateTotal(index, 0);
  };

  const updateTotal = (index, newQuantity) => {
    const updatedQuantity = [...quantity];
    const price = items[index].price;
    updatedQuantity[index] = price * newQuantity;
    setQuantity(updatedQuantity);
  };

  return (
  
    <div className='flex flex-row justify-start p-4 w-full'>
      <div className='left flex justify-evenly my-20 p-0 w-[50%] h-[100%] flex-row flex-wrap content-between' style={{ marginBottom: '20px' }}>
        {items.map((map, index) => (
          <div
            key={index}
            className='card flex-col justify-between w-[40%] rounded-xl border mb-4 overflow-hidden shadow-lg transition-all duration-300'
          >
            <div className='h-[200px] w-[100%] rounded-t-xl overflow-hidden'>
              <img className='object-cover h-full w-full' src={map.image} alt="Logo" />
            </div>
            <div className='bg-[#CDB693] w-full flex flex-col items-center p-4 rounded-bl-xl rounded-br-xl h-[50%]'>
              <p className=' font-bold'>{map.name}</p>
              <p>₹{map.price}</p>
              <button
                className='rounded-3xl border border-black p-1 hover:bg-[#85684C] transition-all 300ms ease-in-out'
                onClick={() => {
                  const updatedItems = [...items];
                  updatedItems[index] = { ...updatedItems[index], cart: true };
                  updatedItems[index] = { ...updatedItems[index], quantity: (updatedItems[index].quantity || 0) + 1 };
                  setItems(updatedItems);
                  updateTotal(index, updatedItems[index].quantity);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='right w-[40%] h-[80%] overflow-y-scroll overflow-x-hidden p-4 my-20 rounded-xl bg-gray-100 fixed right-0'>
        <p className="text-lg font-bold">Cart</p>
        <div>
          {items.map((item, index) => (
            item.cart === true ? <div key={index} className='flex flex-row justify-between h-[80px] w-full mb-4'>
              <img className='object-fit' src={item.image} alt="" width={"100px"} />
              <div className='flex flex-col justify-between'>
                <p className='font-bold'>{item.name}</p>
                <p>₹{item.price}</p>
              </div>
              <div className='flex w-[20%] justify-between items-center'>
                <p className='h-6 w-8 cursor-pointer text-white rounded-lg bg-[#CDB693] text-center hover:bg-[#85684C] transition-all 300ms ease-in-out' onClick={() => handleDecrease(index)}>-</p>
                <p>{item.quantity}</p>
                <p className='h-6 w-8 cursor-pointer text-white rounded-lg bg-[#CDB693] text-center hover:bg-[#85684C] transition-all 300ms ease-in-out' onClick={() => handleIncrease(index)}>+</p>
              </div>
            </div> : null
          ))}
        </div>
        <p className='font-bold text-center text-xl'>Total: ₹{quantity.reduce((acc, next) => acc + next, 0)}</p>
        <div className='flex justify-center items-center'>
        
        <Link to={"/payment"}><button className='text-center rounded-2xl border border-white bg-[#CDB693] p-2 text-white font-bold my-5'>Proceed To Payment</button></Link>
       
        </div>
       
      </div>
    </div>
  );
}

export default Body;
