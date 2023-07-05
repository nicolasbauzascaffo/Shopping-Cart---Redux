import React from "react";
import getAllProducts from "../services/getproducts";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { addToCart, deleteProduct } from "../cart/cartSlice";

const Home = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [products, setproducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setproducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addToCartSuccess = (productId) => {
    const newProduct = products.find((product) => product.id === productId);
    dispatch(addToCart(newProduct));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        textAlign: "center",
        paddingTop: "100px",
        paddingBottom: "50px",
      }}
    >
      <h1>Products</h1>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {products.map((product, index) => (
          <Card key={index} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="340"
                image={`/src/img/${product.id}.jpg`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography
                  sx={{ textAlign: "justify" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsum facilis laudantium nam quos beatae temporibus quisquam.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => addToCartSuccess(product.id)}
                size="small"
                color="primary"
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Home;
