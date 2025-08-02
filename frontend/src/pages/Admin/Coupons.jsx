import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoupons, deleteCoupon } from '../../redux/features/adminSlice';
import CouponsTable from '../../components/admin/CouponsTable';
import CouponFormModal from '../../components/admin/CouponFormModal';
import Button from '../../components/ui/Button';
import SearchInput from '../../components/ui/SearchInput';
import { FiPlus } from 'react-icons/fi';

const Coupons = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(id === 'new' || !!id);
  const { coupons, couponsLoading } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchCoupons({ search: searchTerm }));
  }, [dispatch, searchTerm]);

  const handleDelete = async (couponId) => {
    if (window.confirm('Are you sure?')) {
      await dispatch(deleteCoupon(couponId));
    }
  };

  const handleEdit = (couponId) => {
    navigate(`/admin/coupons/${couponId}`);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Coupons Management</h1>
        <Button 
          onClick={() => {
            navigate('/admin/coupons/new');
            setIsModalOpen(true);
          }}
          icon={<FiPlus className="mr-2" />}
        >
          Add Coupon
        </Button>
      </div>

      <div className="mb-6">
        <SearchInput 
          placeholder="Search coupons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading coupons...</div>
      ) : (
        <CouponsTable 
          coupons={coupons || []} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CouponFormModal 
        isOpen={isModalOpen} 
        couponId={id === 'new' ? null : id}
        onClose={() => {
          navigate('/admin/coupons');
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Coupons;