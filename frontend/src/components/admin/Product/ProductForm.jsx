import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../../features/admin/adminSlice';

const ProductForm = ({ product, isLoading, onSuccess }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [bulkEditMode, setBulkEditMode] = useState({
    details: false,
    howToRedeem: false,
    termsAndConditions: false
  });

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    details: [''],
    code: '',
    category: '',
    company: '',
    howToRedeem: [''],
    termsAndConditions: [''],
    price: '',
    usageLimit: 1,
    expiryDate: '',
    images: [],
    isOneTimeUse: false,
    isActive: false,
    productLink: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        subtitle: product.subtitle || '',
        details: product.details?.length ? [...product.details] : [''],
        code: product.code || '',
        category: product.category || '',
        company: product.company || '',
        howToRedeem: product.howToRedeem?.length ? [...product.howToRedeem] : [''],
        termsAndConditions: product.termsAndConditions?.length ? [...product.termsAndConditions] : [''],
        price: product.price || '',
        images: product.images || [],
        expiryDate: product.expiryDate ? new Date(product.expiryDate).toISOString().split('T')[0] : '',
        isOneTimeUse: product.isOneTimeUse !== false,
        usageLimit: product.usageLimit || 1,
        isActive: product.isActive !== false,
        productLink: product.productLink || ''
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

  const handleArrayFieldChange = (fieldName, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[fieldName]];
      newArray[index] = value;
      return {
        ...prev,
        [fieldName]: newArray
      };
    });
  };

  const handleBulkTextChange = (fieldName, text) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: text.split('\n').filter(item => item.trim() !== '')
    }));
  };

  const addArrayFieldItem = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], '']
    }));
  };

  const removeArrayFieldItem = (fieldName, index) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
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

  const validateForm = () => {
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

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    if (formData.productLink && !/^https?:\/\/.+\..+/.test(formData.productLink)) {
      newErrors.productLink = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();

    // Append all non-file and non-array fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'images' && !Array.isArray(value)) {
        formDataToSend.append(key, value == null ? '' : String(value));
      }
    });

    // Append array fields
    ['details', 'howToRedeem', 'termsAndConditions'].forEach(field => {
      formData[field].forEach((item, index) => {
        if (item.trim() !== '') {
          formDataToSend.append(`${field}[${index}]`, item);
        }
      });
    });

    // Append files
    formData.images.forEach((file) => {
      formDataToSend.append('images', file);
    });

    try {
      if (product && product._id) {
        await dispatch(updateProduct({ id: product._id, data: formDataToSend })).unwrap();
      } else {
        await dispatch(createProduct(formDataToSend)).unwrap();
      }
      onSuccess();
    } catch (error) {
      console.error('Error submitting product form:', error);
      if (error.errors) {
        const serverErrors = {};
        Object.entries(error.errors).forEach(([field, { message }]) => {
          serverErrors[field] = message;
        });
        setErrors(serverErrors);
      } else {
        alert('Failed to save product. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const categories = [
    'Coupon',
    'Voucher',
    'Gift Card',
    'Software Key',
    'Membership',
    'Other'
  ];

  const renderArrayField = (fieldName, label, placeholder) => {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <button
            type="button"
            onClick={() => setBulkEditMode(prev => ({ ...prev, [fieldName]: !prev[fieldName] }))}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {bulkEditMode[fieldName] ? (
              <>
                <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                List View
              </>
            ) : (
              <>
                <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Bulk Edit
              </>
            )}
          </button>
        </div>
        
        {bulkEditMode[fieldName] ? (
          <div className="space-y-2">
            <textarea
              value={formData[fieldName].join('\n')}
              onChange={(e) => handleBulkTextChange(fieldName, e.target.value)}
              rows={6}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder={`Enter each item on a new line\nExample:\nFirst item\nSecond item\nThird item`}
            />
            <div className="text-xs text-gray-500 flex justify-between">
              <span>{formData[fieldName].length} items</span>
              <span>One per line</span>
            </div>
          </div>
        ) : (
          <>
            {formData[fieldName].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-1">
                  <textarea
                    value={item}
                    onChange={(e) => handleArrayFieldChange(fieldName, index, e.target.value)}
                    rows={2}
                    maxLength={500}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    placeholder={placeholder}
                  />
                </div>
                {formData[fieldName].length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayFieldItem(fieldName, index)}
                    className="inline-flex items-center p-1.5 border border-transparent rounded-full text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayFieldItem(fieldName)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Item
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information Section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
        </div>
        <div className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Product Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={100}
                className={`block w-full rounded-md ${errors.title ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500'} sm:text-sm p-2 border`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                maxLength={100}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Product Code*</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className={`block w-full rounded-md ${errors.code ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500'} sm:text-sm p-2 border`}
              />
              {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
            </div>
            
            <div>
              <label htmlFor="productLink" className="block text-sm font-medium text-gray-700 mb-1">Product Link</label>
              <input
                type="url"
                id="productLink"
                name="productLink"
                value={formData.productLink}
                onChange={handleChange}
                className={`block w-full rounded-md ${errors.productLink ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500'} sm:text-sm p-2 border`}
                placeholder="https://example.com/product"
              />
              {errors.productLink && <p className="mt-1 text-sm text-red-600">{errors.productLink}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={`block w-full rounded-md ${errors.category ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500'} sm:text-sm p-2 border`}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className={`block w-full rounded-md ${errors.company ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500'} sm:text-sm p-2 border`}
              />
              {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
            </div>
          </div>

          <div>
            {renderArrayField('details', 'Product Details', 'Enter product details or features')}
          </div>
        </div>
      </div>

      {/* Usage Information Section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Usage Information</h2>
        </div>
        <div className="px-6 py-4 space-y-6">
          {renderArrayField('howToRedeem', 'How to Redeem', 'Step-by-step redemption instructions')}
          {renderArrayField('termsAndConditions', 'Terms and Conditions', 'Restrictions, limitations, or special conditions')}
        </div>
      </div>

      {/* Pricing & Inventory Section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Pricing & Inventory</h2>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className={`block w-full pl-7 pr-12 rounded-md ${errors.price ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500'} sm:text-sm p-2 border`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>
            
            <div>
              <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700 mb-1">Usage Limit*</label>
              <input
                type="number"
                id="usageLimit"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleChange}
                min="1"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Files & Expiry Section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Files & Expiry</h2>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date*</label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className={`block w-full rounded-md ${errors.expiryDate ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500'} sm:text-sm p-2 border`}
              />
              {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
            </div>
            
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Images</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload files</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} multiple accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              
              {formData.images.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
                  <ul className="divide-y divide-gray-200">
                    {formData.images.map((file, index) => (
                      <li key={index} className="py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3 truncate">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                            {file instanceof File ? (
                              <img src={URL.createObjectURL(file)} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                              <img src={file} alt="Preview" className="h-full w-full object-cover" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name || (typeof file === 'string' ? file.split('/').pop() : 'Image')}
                            </p>
                            <p className="text-sm text-gray-500">
                              {file instanceof File ? `${(file.size / 1024).toFixed(1)}KB` : 'Uploaded'}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-2 text-red-600 hover:text-red-900"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Settings Section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Status Settings</h2>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isOneTimeUse"
                  name="isOneTimeUse"
                  type="checkbox"
                  checked={formData.isOneTimeUse}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isOneTimeUse" className="font-medium text-gray-700">One Time Use</label>
                <p className="text-gray-500">Can only be used once per customer</p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isActive" className="font-medium text-gray-700">Active</label>
                <p className="text-gray-500">Make this product visible to customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading || submitting}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {(isLoading || submitting) ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Product
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;