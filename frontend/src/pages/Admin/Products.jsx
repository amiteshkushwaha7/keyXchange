import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProducts, deleteProduct } from '../../features/admin/adminSlice';

import ProductTable from '../../components/admin/Product/ProductTable';
import ProductForm from '../../components/admin/Product/ProductForm';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
 
const Products = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, productsLoading } = useSelector(state => state.admin);

  const [isModalOpen, setIsModalOpen] = useState(id === 'new');
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setIsModalOpen(id === 'new' || !!id); // Open modal for both new and edit
  }, [id]);

  // Fetch products on mount
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);


  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(productId));
      dispatch(getAllProducts()); // Refresh products after delete
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/products/${productId}`);
    setIsModalOpen(true);
  };

  // Use products from Redux store
  return (
    <div className="w-full min-h-screen px-8 py-4 space-y-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Button onClick={() => {
          navigate('/admin/products/new');
          setIsModalOpen(true);
        }}>
          Add New Product
        </Button> 
      </div>

      {productsLoading ? (
        <div>Loading products...</div>
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          navigate('/admin/products');
          setIsModalOpen(false);
        }}
        title={id === 'new' ? 'Add New Product' : 'Edit Product'}
      >
        <ProductForm
          product={id && id !== 'new' ? products.find(p => p._id === id) : null}
          isLoading={productsLoading || modalLoading}
          onSuccess={async () => {
            setModalLoading(true);
            await dispatch(getAllProducts()); // Wait for products to refresh
            setModalLoading(false);
            navigate('/admin/products');
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Products;