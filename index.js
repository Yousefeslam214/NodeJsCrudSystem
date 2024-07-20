const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Product = require('./models/product.model')
const productRoute = require('./routes/product.route')
require('dotenv').config()

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// routes
app.use("/api/products", productRoute);


app.get('/', (req, res) => {
 res.send('<h1>Hello World</h1>');
});

// Get Products
// app.get('/api/products', async (req, res) => {
//  try {
//   const products = await Product.find({})
//   res.status(200).json(products)
//  } catch (error) {
//   res.status(500).json({ message: error.message })
//  }
//  // res.send(req.body)
// }
// )

// Get Single Product
// app.get('/api/products/:id', async (req, res) => {
//  try {
//   const { id } = req.params
//   const product = await Product.findById(id)
//   res.status(200).json(product)
//  } catch (error) {
//   res.status(500).json({ message: error.message })
//  }
//  // res.send(req.body)
// }
// )

// Create 
// app.post('/api/products', async (req, res) => {
//  try {
//   const product = await Product.create(req.body)
//   res.status(200).json(product)
//  } catch (error) {
//   res.status(500).json({ message: error.message })
//  }
//  // res.send(req.body)
// }
// )

// Update
// app.put('/api/products/:id', async (req, res) => {
//  try {
//   const { id } = req.params
//   const product = await Product.findByIdAndUpdate(id, req.body)
//   if (!product) {
//    return res.status(404).json({ message: error.message })
//   }
//   const updateProduct = await Product.findById(id);
//   res.status(200).json(updateProduct)
//  } catch (error) {
//   res.status(500).json({ message: error.message })
//  }
//  // res.send(req.body)
// }
// )

// Delete
// app.delete('/api/products/:id', async (req, res) => {
//  try {
//   const { id } = req.params
//   const product = await Product.findByIdAndDelete(id)
//   if (!product) {
//    return res.status(404).json({ message: "Product not found" })
//   }
//   res.status(200).json({ message: "Product deleted successfully" })
//  } catch (error) {
//   res.status(500).json({ message: error.message })
//  }
//  // res.send(req.body)
// }
// )

mongoose.connect(process.env.URL).then(() => {
 console.log("mongoDB started !")
})
 .catch(() => {
  console.log("mongoDB dosen't started !")
 })


const port = process.env.PORT || 5002
app.listen(port, () => {
 console.log(`Server is running on port ${port}`)

})
