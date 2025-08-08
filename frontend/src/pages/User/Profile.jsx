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
import { 
  LockClosedIcon, 
  TrashIcon, 
  PencilSquareIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

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
    <div className="w-full min-h-screen mx-auto px-8 py-4 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-violet-100 p-3 rounded-full">
          <UserCircleIcon className="h-10 w-10 text-violet-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">MY ACCOUNT</h2>
          <p className="text-gray-500">Manage your profile and account settings</p>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
        {[
          { id: 'profile', icon: PencilSquareIcon, label: 'Profile' },
          { id: 'password', icon: LockClosedIcon, label: 'Password' },
          { id: 'delete', icon: TrashIcon, label: 'Delete Account' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === tab.id
                ? 'bg-white shadow-sm text-violet-600 font-medium'
                : 'text-gray-600 hover:text-violet-600'
              }`}
            type="button"
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="space-y-8">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form className="space-y-6" onSubmit={onSubmitProfile}>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                defaultValue={user?.name || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full md:w-auto px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all shadow-md hover:shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <form className="space-y-6" onSubmit={onSubmitPassword}>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="currentPassword">Current Password</label>
              <input
                name="currentPassword"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="newPassword">New Password</label>
              <input
                name="newPassword"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <ShieldCheckIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                After changing your password, you'll be logged out and need to sign in again with your new password.
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full md:w-auto px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all shadow-md hover:shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        )}

        {/* Delete Account Tab */}
        {activeTab === 'delete' && (
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-red-50 border border-red-200 rounded-xl">
              <div className="bg-red-100 p-2 rounded-full">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">Delete Your Account</h3>
                <p className="text-red-600">
                  This will permanently delete all your data including orders and personal information. 
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDeleteModal(true)}
              className={`w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              Delete My Account
            </button>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                    <h4 className="text-xl font-bold text-gray-800">Confirm Account Deletion</h4>
                  </div>
                  <p className="mb-6 text-gray-600">
                    Are you absolutely sure you want to delete your account? All your data will be permanently removed from our systems.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDeleteAccount}
                      className={`flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Deleting...' : 'Yes, Delete Permanently'}
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
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
    </div>
  );
};

export default Profile;