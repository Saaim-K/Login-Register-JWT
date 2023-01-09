import React, { useState, useEffect } from 'react'
import axios from 'axios'


let baseUrl = '';
if (window.location.href.split(':')[0] === 'http') { baseUrl = 'http://localhost:5426' }

const Products = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [addProduct, setAddProduct] = useState(false)//Runs every time product is added ,deleted or edited 
    const [product, setProduct] = useState([])

    // ----------------------------- Create Product Function -----------------------------
    const createPost = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/product`, { name, price }
            , {
                withCredentials: true
            })
            .then(response => {
                console.log("Response Sent ", response.data);
                setAddProduct(!addProduct)
                console.log('Product added Succesfully 👍')
            })
            .catch(error => {
                console.log('Error occured while adding product ❌', error)
            })
    }
    // ----------------------------- Create Product Function -----------------------------

    // ----------------------------- Get Product Function -----------------------------
    useEffect(() => {
        const allProducts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/products`, {
                    withCredentials: true
                })
                setProduct(response.data.data)//New Product at the bottom
                setProduct(response.data.data.reverse())//New Product at the top
                console.log('Product fetched Succesfully 👍')
            }
            catch (error) {
                console.log('Error occured while fetching product ❌', error)
            }
        }
        allProducts()

        //   // ---------- Cleanup Function ----------
        return () => { allProducts() }
        //   // ---------- Cleanup Function ----------

    }, [addProduct])
    // ----------------------------- Get Product Function -----------------------------

    return (
        <>

            <form >
                <h1>Product</h1>
                <h3>
                    Name:
                    <input placeholder='Enter Product' type="text" onChange={(e) => (setName(e.target.value))} /> <br />
                    Price:
                    <input placeholder='Enter Product Price' type="number" onChange={(e) => (setPrice(e.target.value))} /> <br />
                    <button onClick={createPost}>Post</button>
                </h3>
            </form>

            <div>
                {product.map((eachProduct, i) =>
                (
                    <div key={i}>
                        <hr />
                        <h2><b>Name</b> :{eachProduct.name}</h2>
                        <p><b>ID</b> :{eachProduct._id}</p>
                        <p><b>Price</b> :{eachProduct.price}</p>
                    </div>
                )
                )}
            </div>


        </>
    )
}

export default Products