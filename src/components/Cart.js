import React from "react";
import { useState } from "react";
export default function Cart(props) {
  console.log(props.cart, "test");
  console.log(props.items[0]);
  // if(props.cart.title===undefined){
  //   props.cart=JSON.parse(localStorage.getItem('cart'));
  // } props are read only
  let liStyle = {
    listStyleType: "none",
    padding: "10px",
    width: "100%",
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    alignItems:"center"
  };
  // const [cart,setCart]=useState(props.cart===undefined?JSON.parse(localStorage.getItem('cart')):props.cart);
  const cartValue = () => {
    let total = 0;
    Object.entries(props.cart).map(([key, value]) => {
      total += props.items[key].price * value;
    });
    return total.toFixed(2);
  };

  if(cartValue()==0){
    console.log(cartValue());
    return <h1 style={{textAlign:"center"}}>Cart is empty</h1>
  }

  return (
    <div style={{ width: "80vw", border: "2px solid", margin: "auto" }}>
      <ul>
        {Object.entries(props.cart).map(([key, value]) => {
          if(value===0) return ;
          return (
            <li style={liStyle}>
              <img
                style={{ width: "30%", height: "100px" }}
                src={props.items[key].image}
              ></img>
              <div style={{ display: "flex", flexDirection: "column" ,alignItems:"center",justifyContent:"center"}}>
                <h2>{props.items[key].title.slice(0, 20)} ...</h2>
                <b>${props.items[key].price} </b>
                <p>
                  Quantity:
                  <button style={{ width: "20px", margin: "5px" }} onClick={()=>props.handle(key,false)}>-</button>
                  {value}
                  <button style={{ width: "20px", margin: "5px" }} onClick={()=>props.handle(key,true)}>+</button>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <h2>Total cart value : {cartValue()}</h2>
    </div>
  );
}
