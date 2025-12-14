'use client';

import { useState, FormEvent, useEffect } from "react";

// The key used in localStorage to store the JWT.
const AUTH_TOKEN_KEY = "vendor_auth_token"; 

export default function AddProduct() {
  // State for the token, initialized to null
  const [authToken, setAuthToken] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "", 
    imageUrls: ["https://via.placeholder.com/400x300.png?text=Product+Image"], 
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ⭐ New useEffect hook to load the token from localStorage
  useEffect(() => {
    // This code only runs on the client side
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (storedToken) {
      setAuthToken(storedToken);
    } else {
      // If no token is found, set an error to guide the user
      setError("Authorization token not found. Please log in first.");
    }
  }, []); // Empty dependency array means this runs only once on mount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url.length > 0);
    setForm({ ...form, imageUrls: urls });
  };


  // --- Connect to Backend API ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // 1. Check for token before proceeding
    if (!authToken) {
      setError("Login required. Authorization token is missing.");
      setLoading(false);
      return;
    }
    
    // 2. Basic Client-Side Validation (Price/Stock must be numbers)
    const priceFloat = parseFloat(form.price);
    const stockInt = parseInt(form.stock);

    if (isNaN(priceFloat) || isNaN(stockInt) || form.imageUrls.length === 0) {
      setError("Please ensure Price and Stock are valid numbers and at least one image URL is provided.");
      setLoading(false);
      return;
    }
    
    try {
      // 3. Send POST request to the secure vendor API route
      const response = await fetch('/api/vendors/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 🔑 Use the dynamically loaded token
          'Authorization': `Bearer ${authToken}`, 
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: priceFloat, 
          stock: stockInt,   
          category: form.category,
          imageUrls: form.imageUrls,
        }),
      });

      // 4. Handle Response
      if (!response.ok) {
        const errData = await response.json();
        // Catch 401 specifically to guide the user to log in again
        if (response.status === 401) {
            throw new Error("Session expired or token invalid. Please log in again.");
        }
        throw new Error(errData.error || 'Failed to create product.');
      }

      const newProduct = await response.json();
      setSuccess(`Product "${newProduct.name}" created successfully! It is now Pending Approval.`);
      
      // Reset form fields
      setForm({ name: "", price: "", stock: "", description: "", category: "", imageUrls: [] }); 

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };
  
  // Disable button if no token is present
  const submitDisabled = loading || !authToken; 

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-gray-50 text-black">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-3">Submit New Product</h1>

        {/* Feedback Messages */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md font-medium">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md font-medium">{success}</div>
        )}
        
        {/* ⭐ Authorization Message */}
        {!authToken && (
             <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-md font-medium">
                 You are not authorized. Please **log in** to submit a product.
             </div>
        )}


        <div className="space-y-6">
          {/* ... all form fields (name, category, price, stock, imageUrls, description) ... */}
          
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-700 mb-1">Product Name *</label>
            <input
              id="name"
              name="name"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              onChange={handleChange}
              value={form.name}
              placeholder="Example: Wireless Headphones"
              required
              disabled={submitDisabled} // Disable fields if unauthorized
            />
          </div>

          <div>
            <label htmlFor="category" className="block font-semibold text-gray-700 mb-1">Category *</label>
            <select
              id="category"
              name="category"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              onChange={handleChange}
              value={form.category}
              required
              disabled={submitDisabled}
            >
                <option value="" disabled>Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Apparel">Apparel</option>
                <option value="Home Goods">Home Goods</option>
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="price" className="block font-semibold text-gray-700 mb-1">Price (₹) *</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01" 
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                onChange={handleChange}
                value={form.price}
                placeholder="1999.00"
                required
                disabled={submitDisabled}
              />
            </div>

            <div>
              <label htmlFor="stock" className="block font-semibold text-gray-700 mb-1">Stock *</label>
              <input
                id="stock"
                name="stock"
                type="number"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                onChange={handleChange}
                value={form.stock}
                placeholder="10"
                required
                disabled={submitDisabled}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="imageUrls" className="block font-semibold text-gray-700 mb-1">Image URLs (Comma Separated) *</label>
            <input
              id="imageUrls"
              name="imageUrls"
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              onChange={handleImageChange}
              value={form.imageUrls.join(', ')} 
              placeholder="https://img1.com/a.jpg, https://img2.com/b.jpg"
              required
              disabled={submitDisabled}
            />
            <p className="text-sm text-gray-500 mt-1">Provide at least one URL. The first one will be set as primary.</p>
          </div>


          <div>
            <label htmlFor="description" className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              rows={5}
              onChange={handleChange}
              value={form.description}
              placeholder="Write detailed product information here..."
              required
              disabled={submitDisabled}
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitDisabled} // Use the combined disabled state
          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg mt-8 hover:bg-indigo-700 transition duration-200 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}