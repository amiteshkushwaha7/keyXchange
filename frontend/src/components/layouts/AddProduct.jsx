import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createProduct } from '../features/products/productSlice';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: '', company: '', category: '', price: '', value: '', goods: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(form));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Add New Product</h2>
      {Object.entries(form).map(([key, val]) => (
        <input key={key} name={key} value={val} placeholder={key} onChange={handleChange} className="w-full border p-2 rounded" />
      ))}
      <button className="bg-blue-700 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
};

export default AddProduct;
