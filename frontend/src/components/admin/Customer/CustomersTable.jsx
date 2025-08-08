const CustomersTable = ({ customers, onViewDetails }) => {

  return (
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
          {customers && customers.length > 0 ? (
            customers.map((customer) => (
              
              <tr key={customer._id}>
                <td>
                  {customer.name}
                  <br/>
                  <span className="text-sm text-gray-500">{customer.mobile || 'N/A'}</span>
                </td>
                <td>{customer.email}</td>
                <td>{customer.role}</td>
                <td>
                  {customer.active ? 'Active' : 'Inactive'}
                </td>
                <td>
                  <button onClick={() => onViewDetails(customer._id)}>
                    View
                  </button>
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
  );
};

export default CustomersTable;
