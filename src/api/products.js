import axios from "axios";

// fetch('https://dummyjson.com/products')
// .then(res => res.json())
// .then(console.log);

const BASE_API_URL = "https://dummyjson.com"

export async function fetchProducts({limit = 10, skip = 0, q = ""}){

    const url = q ? `${BASE_API_URL}/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}` 
                    : 
                    `${BASE_API_URL}/products?limit=${limit}&skip=${skip}`

    const response = await axios.get(url);
    return response.data;
}

export async function addProduct(productData){
    const response = await axios.post(`${BASE_API_URL}/products/add`, productData);
    return response.data
}

export async function updateProduct(id, productData) {
    const response = await axios.put(`${BASE_API_URL}/products/${id}`, productData);
    return response.data
}

export async function deleteProduct(id) {
    const response = await axios.delete(`${BASE_API_URL}/products/${id}`);
    return response.data;
}