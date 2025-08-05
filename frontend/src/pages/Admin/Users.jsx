import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../features/admin/adminSlice';
import UsersTable from '../../components/admin/User/UsersTable';
import UserDetailsModal from '../../components/admin/User/UserDetailsModal';
import SearchInput from '../../components/admin/Common/SeachInput';

const Users = () => { 
  const { id } = useParams();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const { users, usersLoading } = useSelector(state => state.admin);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(!!id);

  // Fetch users when component mounts and when search term changes
  useEffect(() => {
    dispatch(getAllUsers({ search: searchTerm }));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    setIsModalOpen(!!id);
  }, [id]);

  // Filter users by search term (client-side filtering if needed)
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (userId) => {
    navigate(`/admin/users/${userId}`);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
      </div>

      <div className="mb-6">
        <SearchInput 
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {usersLoading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : (
        <UsersTable 
          users={filteredUsers} 
          onViewDetails={handleViewDetails}
        />
      )}

      <UserDetailsModal 
        isOpen={isModalOpen} 
        userId={id}
        onClose={() => {
          navigate('/admin/users');
          setIsModalOpen(false);
        }}
      />
    </div>
  ); 
};

export default Users;