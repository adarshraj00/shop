import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Cart from "./components/Cart.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  let css = {
    height: "100px",
    width: "100px",
  };
  let [items, setItems] = useState([
  ]);

  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {}
  );
  function removeCartItem(index){
      
  }
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setItems(res);
      })
      .catch((jsn) => console.log(jsn));
    // setCart(Object.values(cart));
    // console.log("use effect called");
  //  console.log( Object.entries(cart).filter(item=>{
  //     //console.log(item[0]);
  //     return item[0]
  //   }))
  }, []);
  const handle = (item,bool) => {
    if (cart[item] === undefined) {
      const test = cart;
      if(bool===true) test[item] = 1;
      //  console.table(test);
      setCart(Object.assign({}, test));
      localStorage.setItem("cart", JSON.stringify(test));
    } else {
      const test = cart;
      if(bool)
      test[item] = test[item] + 1;
      else if(test[item]>0){
        test[item]=test[item]-1;
      }
      // console.table(test);
      setCart(Object.assign({}, test));
      localStorage.setItem("cart", JSON.stringify(test));
    }
  };
  return (
    <>
      <Router>
        <div className="header">
          <h1>
            <Link to="/">Shop</Link>
          </h1>
          <img style={css} src={logo} className="App-logo" alt="logo" />
          <h3>
            <Link to="/cart">cart</Link>
            <sup>
              {Object.entries(cart).length > 0
                ? Object.values(cart).reduce((sum, a) => sum + a, 0)
                : "0"}
            </sup>
          </h3>
        </div>
        <Switch>
          <Route path="/cart">
            <Cart cart={cart} items={items} handle={handle}/>
          </Route>
          <Route path="/">
            <div className="items">
              {items.map((item, index) => {
                return (
                  <div className="item">
                    <h2>{item.title.slice(0,20)}...</h2>
                    <b>${item.price}</b>
                    <br />
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={item.image}
                    />
                    <br />
                    <button
                      onClick={() => handle(index,false)}
                      style={{ padding: "5px", cursor: "pointer" }}
                    >
                      -
                    </button>
                    <b style={{padding:"5px"}}>{Object.entries(cart).filter(item=>{
                    //  console.log(index,item[0]);
                      if(item[0]==index) console.log(item[1]);
                      return item[0]==index}).map(item=>item[1])}</b>
                    <button
                      onClick={() => handle(index,true)}
                      style={{ padding: "5px", cursor: "pointer" }}
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}
// tag class
export default App;
