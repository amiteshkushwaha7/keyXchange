import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCustomers } from '../../redux/features/adminSlice';
import CustomersTable from '../../components/admin/Customer/CustomersTable';
import CustomerDetailsModal from '../../components/admin/Customer/CustomerDetailsModal';
import SearchInput from '../../components/admin/Common/SeachInput';

// Demo data
const demoCustomers = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', phone: '123-456-7890' },
  { id: '2', name: 'Bob Johnson', email: 'bob@example.com', phone: '234-567-8901' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012' },
];

const Customers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { customers, customersLoading } = useSelector(state => state.admin);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(!!id);
  const [customers, setCustomers] = useState(demoCustomers);

  // Filter customers by search term
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // useEffect(() => {
  //   dispatch(fetchCustomers({ search: searchTerm }));
  // }, [dispatch, searchTerm]);

  useEffect(() => {
    setIsModalOpen(!!id);
  }, [id]);

  const handleViewDetails = (customerId) => {
    navigate(`/admin/customers/${customerId}`);
    setIsModalOpen(true);
  };

  const isLoading = false; // No loading state for demo

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customers Management</h1>
      </div>

      <div className="mb-6">
        <SearchInput 
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
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