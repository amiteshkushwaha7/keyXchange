import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { 
  updatePassword, 
  logoutUser, 
  updateProfile, 
  deleteAccount 
} from "../../features/auth/authSlice";
import { LockClosedIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle account deletion
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteAccount()).unwrap();
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.message || 'Account deletion failed');
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  // Handle profile update
  const onSubmitProfile = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(updateProfile({ name })).unwrap();
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password change
  const onSubmitPassword = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;

    if (!currentPassword || !newPassword) {
      toast.error('All fields are required');
      return;
    }

    if (newPassword === currentPassword) {
      toast.error('New password cannot be the same as current password');
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(updatePassword({ currentPassword, newPassword })).unwrap();
      toast.success('Password changed successfully');
      e.target.reset();

      await dispatch(logoutUser());
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || err.message || 'Password change failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Account</h2>

      {/* Tabs */}
      <nav className="flex border-b border-gray-300 mb-6">
        {['profile', 'password', 'delete'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2 -mb-px border-b-2 transition ${activeTab === tab
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-blue-600'
              }`}
            type="button"
          >
            {tab === 'profile' && <PencilSquareIcon className="w-5 h-5" />}
            {tab === 'password' && <LockClosedIcon className="w-5 h-5" />}
            {tab === 'delete' && <TrashIcon className="w-5 h-5" />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <form className="space-y-4" onSubmit={onSubmitProfile}>
          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              defaultValue={user?.name || ''}
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      )}

      {activeTab === 'password' && (
        <form className="space-y-4 max-w-md" onSubmit={onSubmitPassword}>
          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="currentPassword">Current Password</label>
            <input
              name="currentPassword"
              type="password"
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="newPassword">New Password</label>
            <input
              name="newPassword"
              type="password"
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      )}

      {activeTab === 'delete' && (
        <div className="max-w-md bg-red-50 border border-red-300 p-6 rounded">
          <h3 className="text-red-700 text-lg font-semibold mb-4 flex items-center gap-2">
            <TrashIcon className="w-6 h-6" /> Delete Account
          </h3>
          <p className="mb-6 text-red-600">
            Deleting your account will permanently remove all your data. This action cannot be undone.
            <br />
            Are you sure you want to delete your account?
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            disabled={isLoading}
          >
            Delete My Account
          </button>

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow max-w-sm text-center">
                <h4 className="font-bold text-lg mb-4 text-red-700">Confirm Deletion</h4>
                <p className="mb-4">All your data will be permanently removed. Are you sure?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Deleting...' : 'Yes, Delete'}
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;