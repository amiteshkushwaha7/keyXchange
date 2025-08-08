import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers } from '../../features/admin/adminSlice';
import SearchInput from '../../components/admin/Common/SeachInput';

const Customers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, customersLoading } = useSelector(state => state.admin);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllCustomers({ search: searchTerm }));
  }, [dispatch, searchTerm]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (customerId) => {
    navigate(`/admin/customers/${customerId}`);
  };

  return (
    <div className="w-full min-h-screen px-8 py-4 space-y-6 bg-white rounded-2xl shadow-lg border border-gray-100">
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers && filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td>
                      {customer.name}
                      <br />
                      <span className="text-sm text-gray-500">{customer.mobile || 'N/A'}</span>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.role}</td>
                    <td>
                      {customer.active ? 'Active' : 'Inactive'}
                    </td>
                    <td>
                      {/* <button
                        onClick={() => handleViewDetails(customer._id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button> */}
                      <Link
                        to={`/admin/customers/${customer._id}`}  // Changed to Link
                        key={customer._id}
                        // ref={idx === 0 ? orderItemRef : null}
                        className="group block cursor-pointer bg-white border-b border-b-gray-200 hover:shadow-md transition-all hover:border-violet-200 hover:translate-y-[-2px] hover:rounded-lg"
                        aria-label={`View details for customer ${customer._id}`}
                      >View</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Customers;