import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { resetPassword } from "../../features/auth/authSlice";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  TrashIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // Add this line
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Update failed');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      // Dispatch the resetPassword action with the required payload
      await dispatch(resetPassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      })).unwrap();
      toast.success('Password changed successfully');
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || 'Password change failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Account deleted successfully');
      // Redirect to home or login page after deletion
    } catch (err) {
      toast.error(err?.data?.message || 'Account deletion failed');
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
          <UserIcon className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user?.name || 'User'}</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'profile' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Information
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'password' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'delete' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('delete')}
        >
          Delete Account
        </button>
      </div>

      {activeTab === "profile" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-green-600" />
              Personal Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-gray-500 w-24">Name:</span>
                <span className="font-medium">{user?.name || '-'}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 w-24">Email:</span>
                <span className="font-medium">{user?.email || '-'}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 w-24">Phone:</span>
                <span className="font-medium">{user?.mobile || '-'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <PencilSquareIcon className="w-5 h-5 mr-2 text-green-600" />
              Update Profile
            </h2>
            <Formik
              enableReinitialize
              initialValues={{
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || ''
              }}
              onSubmit={handleProfileSubmit}
            >
              {() => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Field
                      name="email"
                      type="email"
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Field
                      name="phone"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full flex justify-center items-center"
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    Update Profile
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {activeTab === "password" && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 max-w-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <LockClosedIcon className="w-5 h-5 mr-2 text-green-600" />
            Change Password
          </h2>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            }}
            onSubmit={handlePasswordSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <Field
                    name="currentPassword"
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <Field
                    name="newPassword"
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full flex justify-center items-center"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  Change Password
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {activeTab === "delete" && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 max-w-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <TrashIcon className="w-5 h-5 mr-2 text-red-600" />
            Delete Account
          </h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Deleting your account will permanently remove all your data. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors w-full"
          >
            Delete My Account
          </button>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Account Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete your account? All your data will be permanently removed.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;