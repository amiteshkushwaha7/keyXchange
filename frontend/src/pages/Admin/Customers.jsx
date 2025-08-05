import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers } from '../../features/admin/adminSlice';
import CustomersTable from '../../components/admin/Customer/CustomersTable';
import CustomerDetailsModal from '../../components/admin/Customer/CustomerDetailsModal';
import SearchInput from '../../components/admin/Common/SeachInput';

const Customers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, customersLoading } = useSelector(state => state.admin);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(!!id);

  useEffect(() => {
    dispatch(getAllCustomers({ search: searchTerm }));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    setIsModalOpen(!!id);
  }, [id]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (customerId) => {
    navigate(`/admin/customers/${customerId}`);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customers Management</h1>
      </div>

      <div className="mb-6">
        <SearchInput
          placeholder="Search customers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {customersLoading ? (
        <div className="text-center py-8">Loading customers...</div>
      ) : (
        <CustomersTable
          customers={filteredCustomers}
          onViewDetails={handleViewDetails}
        />
      )}

      <CustomerDetailsModal
        isOpen={isModalOpen}
        customerId={id}
        onClose={() => {
          navigate('/admin/customers');
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Customers;