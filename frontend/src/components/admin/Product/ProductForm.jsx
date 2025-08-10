import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../../features/admin/adminSlice';

const ProductForm = ({ product, isLoading, onSuccess }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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
    'coupon',
    'voucher',
    'gift_card',
    'software_key',
    'membership',
    'other'
  ];

  const renderArrayField = (fieldName, label, placeholder) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {formData[fieldName].map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <textarea
              value={item}
              onChange={(e) => handleArrayFieldChange(fieldName, index, e.target.value)}
              rows={2}
              maxLength={500}
              className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder={placeholder}
            />
            {formData[fieldName].length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayFieldItem(fieldName, index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayFieldItem(fieldName)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          + Add another
        </button>
      </div>
    );
  };

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
                <option key={cat} value={cat}>
                  {cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
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
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            maxLength={100}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Product Link</label>
          <input
            type="url"
            name="productLink"
            value={formData.productLink}
            onChange={handleChange}
            className={`block w-full rounded-md ${errors.productLink ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border`}
            placeholder="https://example.com/product"
          />
          {errors.productLink && <p className="mt-1 text-sm text-red-600">{errors.productLink}</p>}
        </div>
        {renderArrayField('details', 'Details', 'Product details')}
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Usage Information</h2>
        <div className="space-y-6">
          {renderArrayField('howToRedeem', 'How to Redeem', 'Instructions for redeeming the product')}
          {renderArrayField('termsAndConditions', 'Terms and Conditions', 'Any restrictions or conditions for use')}
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
            <input
              type="number"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={handleChange}
              min="1"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
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
              value={formData.expiryDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className={`block w-full rounded-md ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border`}
            />
            {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="mt-2 space-y-2">
              {formData.images.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600 truncate max-w-xs">
                    {file.name || (typeof file === 'string' ? file.split('/').pop() : 'Image')}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
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
            <input
              type="checkbox"
              id="isOneTimeUse"
              name="isOneTimeUse"
              checked={formData.isOneTimeUse}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isOneTimeUse" className="ml-2 block text-sm text-gray-700">
              One Time Use
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
              Active
            </label>
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