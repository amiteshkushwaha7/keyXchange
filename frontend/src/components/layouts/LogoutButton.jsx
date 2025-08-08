import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/auth/authSlice';

const LogoutButton = ({ children, className }) => {  // Add `children` and `className` as props
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login'); 
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children || 'Logout'}  {/* Render children if provided, else fallback to "Logout" */}
    </button>
  );
};

export default LogoutButton;