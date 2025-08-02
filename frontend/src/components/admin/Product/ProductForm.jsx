import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct, updateProduct } from '../../../features/admin/adminSlice';

const ProductForm = ({ product, isLoading, onSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false); 
 
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    category: '',
    company: '',
    description: '',
    howToUse: '',
    termsAndConditions: '',
    price: '',
    usageLimit: 1,
    expiryDate: '',
    images: [],
    isOneTimeUse: false,
    isActive: false
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        howToUse: product.howToUse || '',
        termsAndConditions: product.termsAndConditions || '',
        code: product.code || '',
        category: product.category || '',
        company: product.company || '',
        price: product.price || '',
        images: product.files ? (Array.isArray(product.files) ? product.files : [product.files]) : [],
        expiryDate: product.expiryDate || '',
        isOneTimeUse: product.isOneTimeUse !== false,
        usageLimit: product.usageLimit || 1,
        isActive: product.isActive !== false,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newFiles]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // <-- Add this line

    const newErrors = {};

    if (!formData.title || formData.title.length < 3 || formData.title.length > 100) {
      newErrors.title = 'Title must be between 3 and 100 characters';
    }

    if (!formData.code) {
      newErrors.code = 'Code is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.company) {
      newErrors.company = 'Company name is required';
    }

    if (formData.price === '' || formData.price < 0) {
      newErrors.price = 'Price must be a positive number';
    }

    // Expiry date validation: compare only date part
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required and must be in the future';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false); // <-- Add this line
      return;
    }

    setErrors({});

    const formDataToSend = new FormData();

    // Append all non-file fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'images') {
        formDataToSend.append(key, value == null ? '' : String(value));
      }
    });

    // Append files
    formData.images.forEach((file) => {
      formDataToSend.append('images', file);  // Field name must match multer config
    });

    // Debug what's being sent
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      if (product && product._id) {
        await dispatch(updateProduct({ id: product._id, formDataToSend })).unwrap();
      } else {
        await dispatch(createProduct(formDataToSend)).unwrap();
      }
      onSuccess(); 
    } catch (error) {
      console.error('Error submitting product form:', error);
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, { message }]) => {
          alert(`${field}: ${message}`);
        });
      } else {
        console.error('Error submitting product form:', error);
        alert('Failed to save product. Please try again.');
      }
    } finally {
      setSubmitting(false); // <-- Add this line
    }
  };

  const categories = [
    'coupon',
    'voucher',
    'gift_card',
    'software_key',
    'membership',
    'other'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Title*</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              minLength={3} 
              maxLength={100} 
              className={`block w-full rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border`} 
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Code*</label>
            <input 
              type="text" 
              name="code" 
              value={formData.code} 
              onChange={handleChange} 
              required 
              className={`block w-full rounded-md ${errors.code ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border`} 
            />
            {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category*</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required 
              className={`block w-full rounded-md ${errors.category ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border`}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Company*</label>
            <input 
              type="text" 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
              required 
              className={`block w-full rounded-md ${errors.company ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border`} 
            />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Usage Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">How to Use</label>
            <textarea name="howToUse" value={formData.howToUse} onChange={handleChange} rows={3} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" placeholder="Instructions for using the product" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Terms and Conditions</label>
            <textarea name="termsAndConditions" value={formData.termsAndConditions} onChange={handleChange} rows={3} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" placeholder="Any restrictions or conditions for use" />
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Pricing & Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Price*</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              min="0" 
              step="0.01" 
              required 
              className={`block w-full rounded-md ${errors.price ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border`} 
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Usage Limit*</label>
            <input type="number" name="usageLimit" value={formData.usageLimit} onChange={handleChange} min="1" required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Files & Expiry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Expiry Date*</label>
            <input 
              type="date" 
              name="expiryDate" 
              value={formData.expiryDate ? new Date(formData.expiryDate).toISOString().split('T')[0] : ''} 
              onChange={handleChange} 
              required 
              min={(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; })()} 
              className={`block w-full rounded-md ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border`} 
            />
            {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Files*</label>
            <input 
              type="file" 
              onChange={handleFileChange} 
              multiple
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
            />
            {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
            <div className="mt-2 space-y-2">
              {formData.images.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600 truncate max-w-xs">{file.name || (typeof file === 'string' ? file.split('/').pop() : 'File')}</span>
                  <button type="button" onClick={() => removeFile(index)} className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Status Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <input type="checkbox" id="isOneTimeUse" name="isOneTimeUse" checked={formData.isOneTimeUse} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="isOneTimeUse" className="ml-2 block text-sm text-gray-700">One Time Use</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">Active</label>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading || submitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {(isLoading || submitting) ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : 'Save Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;