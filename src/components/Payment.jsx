import React, { useContext, useState } from 'react';
import Navbar from './navbar';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';


function Payment() {
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
    <><Navbar/>
    <div className='flex flex-row justify-start p-4 w-full'>
    
      <div className='left flex justify-evenly my-20 p-0 w-[50%] h-[100%] flex-col items-center content-between' style={{ marginBottom: '20px' }}>
       <div className='flex justify-between w-[50%]'>
         <div>
         <input type="radio" name="paymentMethod" id="COD" />
         <label htmlFor="COD">Cash on Delivery</label>
         </div>
         <div>
         <input type="radio" name="paymentMethod" id="Card" />
         <label htmlFor="Card">Credit Card</label>
         </div>
       </div>
       <div className='card-details w-[50%] shadow-xl flex flex-col my-10 border border-black rounded-xl p-4 bg-[#F6F6F4]'>
       <label htmlFor="card-number">Enter your card number:</label>
       <input type="text" name="card-number" id="card-number"  placeholder='Card Number'/>
       <label htmlFor="card-expiry">Enter your card's expiry date:</label>
       <input type="text" name="card-expiry" id="card-expiry"  placeholder='Expiry Date'/>
       <label htmlFor="card-cvv">Enter your CVV number:</label>
       <input type="text" name="card-cvv" id="card-cvv"  placeholder='CVV'/>

       </div>
       <div className='flex justify-center items-center'>
        <Link to={"/"}><button className='text-center rounded-2xl border border-white bg-[#CDB693] p-2 text-white font-bold my-5'>Confirm Payment</button></Link>

        </div>
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
        <Link to={"/"}><button className='text-center rounded-2xl border border-white bg-[#CDB693] p-2 text-white font-bold my-5'>Go back to Shopping</button></Link>

        </div>
      </div>
    </div>
    </>
  );
}

export default Payment;
