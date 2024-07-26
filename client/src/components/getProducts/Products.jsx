import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import { FaPen, FaTrash } from "react-icons/fa";

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
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.quantity}</td>
              <td>{user.price}</td>
              <td className="actionButtons">
                <div className="actionButtonsContainer">
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-info"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <button className="btn btn-info">
                      <FaPen />
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteProduct(user._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="enterProductsLink" style={{ marginTop: '20px' }}>
        <Link to="/enter-products">
          To Enter Products Click Here ...
        </Link>
      </div>
    </div>
  );
};


export default Products;