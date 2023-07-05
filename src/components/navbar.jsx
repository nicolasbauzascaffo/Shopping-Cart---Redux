import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  clearCart,
  increseQuantity,
  decreseQuantity,
  calculateTotal,
} from "../cart/cartSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    right: false,
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown") {
      return;
    }

    const isEventFromContainer =
      event.target.getAttribute("data-container") === "true";

    if (!isEventFromContainer) {
      setState({ ...state, [anchor]: open });
    }
  };

  const { cart, totalPrice, quantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteProductCart = (productId) => {
    dispatch(deleteProduct(productId));
  };
  const clearCartProducts = () => {
    dispatch(clearCart());
  };

  const increseProduct = (producId) => {
    dispatch(increseQuantity(producId));
  };

  const decreseProduct = (producId) => {
    dispatch(decreseQuantity(producId));
  };

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cart, totalPrice, quantity]);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ textAlign: "center" }}>
        <h3>Cart</h3>
        <h4>Total: U$S {totalPrice.toFixed(2)} </h4>
        <DeleteForeverIcon
          onClick={clearCartProducts}
          sx={{ color: "red", cursor: "pointer" }}
        />
        <h5>Clear Cart</h5>
        <Divider />
        <section>
          {cart.length > 0 ? (
            cart.map((product, index) => (
              <section key={index}>
                <h3>{product.name}</h3>
                <HighlightOffIcon
                  sx={{ cursor: "pointer", color: "red" }}
                  onClick={() => deleteProductCart(product.id)}
                />
                <h4>U$S {(product.price * product.quantity).toFixed(2)}</h4>
                <section
                  style={{
                    display: "flex",
                    height: "50px",
                    textAlign: "center",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => increseProduct(product.id)}
                    style={{
                      backgroundColor: "green",
                      borderRadius: "10px",
                      color: "white",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      width: "40px",
                    }}
                  >
                    +
                  </button>
                  <h4>{product.quantity}</h4>
                  <button
                    onClick={() => decreseProduct(product.id)}
                    style={{
                      backgroundColor: "green",
                      borderRadius: "10px",
                      color: "white",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      width: "40px",
                    }}
                  >
                    -
                  </button>
                </section>
              </section>
            ))
          ) : (
            <section>
              <p>The Cart is Empty</p>
              <SentimentDissatisfiedIcon />
            </section>
          )}
        </section>
      </List>
    </Box>
  );

  return (
    <Box className="navbar" sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "black" }} position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Redux Cart
          </Typography>
          {auth && (
            <div>
              {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <ShoppingCartIcon
                    sx={{ cursor: "pointer" }}
                    onClick={toggleDrawer(anchor, true)}
                  >
                    {anchor}
                  </ShoppingCartIcon>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              ></Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
