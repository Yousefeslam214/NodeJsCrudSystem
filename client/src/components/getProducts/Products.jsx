import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Box, Button } from "@mui/material";

const Products = () => {
  const [users, setUsers] = useState([]);
  // const [productName, setProductName] = useState('');
  // const [productQuantity, setProductQuantity] = useState('');
  // const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/products");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    await axios
      .delete(`http://localhost:5002/api/products/${productId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== productId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="userTable">
      <Toaster />
      <h2>Products List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr id={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.quantity} </td>
                <td>{user.price}</td>
                <td className="actionButtons">
                  <Box >

                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-info"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Button variant="contained" color="info" sx={{ minWidth: "100px" }}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </Link>

                    <button
                      onClick={() => deleteProduct(user._id)}
                      type="button"
                      class="btn btn-danger"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </Box>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Box sx={{ mt: 3 }}>
        <Link to={'/enter-products'} >
          To Enter Products Click Here ...
        </Link>
      </Box>
    </div>
  );
};

export default Products;