import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getAllContacts,
    deleteContact,
    deleteAllContacts,
    updateContact,
    clearContactsState,
    clearContactsError,
    resetContactsSuccess
} from '../../features/contact/contactSlice';
import {
    ArrowPathIcon,
    TrashIcon,
    EyeIcon,
    PencilSquareIcon,
    EnvelopeIcon,
    UserIcon,
    ChatBubbleLeftRightIcon,
    CalendarDaysIcon,
    EllipsisVerticalIcon,
    CheckCircleIcon,
    ClockIcon,
    XMarkIcon,
    ExclamationTriangleIcon,
    MagnifyingGlassIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';

const Feedbacks = () => {
    const dispatch = useDispatch();
    const { contacts } = useSelector((state) => state.contact);
    const [selectedContact, setSelectedContact] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
    const [actionMenuContact, setActionMenuContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [localContacts, setLocalContacts] = useState([]);

    // Sync local contacts with Redux state
    useEffect(() => {
        if (contacts.data && contacts.data.length > 0) {
            setLocalContacts(contacts.data);
        }
    }, [contacts.data]);

    useEffect(() => {
        dispatch(getAllContacts());
        return () => {
            dispatch(clearContactsState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (contacts.success && (deleteDialogOpen || deleteAllDialogOpen || viewDialogOpen)) {
            setDeleteDialogOpen(false);
            setDeleteAllDialogOpen(false);
            setViewDialogOpen(false);
            setSelectedContact(null);
            dispatch(resetContactsSuccess());
        }
    }, [contacts.success, dispatch, deleteDialogOpen, deleteAllDialogOpen, viewDialogOpen]);

    const handleRefresh = () => {
        dispatch(clearContactsError());
        dispatch(getAllContacts());
    };

    const handleView = (contact) => {
        setSelectedContact(contact);
        setViewDialogOpen(true);
        setActionMenuAnchor(null);
    };

    const handleDelete = (contact) => {
        setSelectedContact(contact);
        setDeleteDialogOpen(true);
        setActionMenuAnchor(null);
    };

    const handleDeleteConfirm = () => {
        if (selectedContact) {
            setLocalContacts(prevContacts =>
                prevContacts.filter(contact => contact._id !== selectedContact._id)
            );

            dispatch(deleteContact(selectedContact._id))
                .unwrap()
                .then(() => {
                    dispatch(getAllContacts()); // <-- Fetch updated contacts after delete
                })
                .catch(error => {
                    console.error('Delete failed:', error);
                    setLocalContacts(contacts.data);
                });

            setDeleteDialogOpen(false);
            setSelectedContact(null);
        }
    };

    const handleDeleteAllConfirm = () => {
        // Optimistic update - clear local state immediately
        setLocalContacts([]);
        
        dispatch(deleteAllContacts())
            .unwrap()
            .catch(error => {
                // Revert if the API call fails
                console.error('Delete all failed:', error);
                setLocalContacts(contacts.data); // Revert to original state
            });
        
        setDeleteAllDialogOpen(false);
    };

    const handleUpdateContact = () => {
        if (selectedContact) {
            const updatedStatus = !selectedContact.isResolved;
            
            // Optimistic update - update local state immediately
            setLocalContacts(prevContacts => 
                prevContacts.map(contact => 
                    contact._id === selectedContact._id 
                        ? { ...contact, isResolved: updatedStatus }
                        : contact
                )
            );
            
            // Update the contact in the view dialog
            setSelectedContact({ ...selectedContact, isResolved: updatedStatus });
            
            dispatch(updateContact(selectedContact._id))
                .unwrap()
                .catch(error => {
                    // Revert if the API call fails
                    console.error('Update failed:', error);
                    setLocalContacts(contacts.data); // Revert to original state
                    setSelectedContact(contacts.data.find(c => c._id === selectedContact._id));
                });
        }
    };

    const handleCloseSnackbar = () => {
        dispatch(clearContactsError());
        dispatch(resetContactsSuccess());
    };

    const handleActionMenuOpen = (event, contact) => {
        setActionMenuAnchor(event.currentTarget);
        setActionMenuContact(contact);
    };

    const handleActionMenuClose = () => {
        setActionMenuAnchor(null);
        setActionMenuContact(null);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
    };

    // Filter contacts based on search term and status
    const filteredContacts = localContacts.filter(contact => {
        const matchesSearch =
            contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.subject?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'resolved' && contact.isResolved) ||
            (statusFilter === 'pending' && (!contact.isResolved));
        return matchesSearch && matchesStatus;
    });

    if (contacts.loading && localContacts.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading contacts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 overflow-x-hidden">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="overflow-hidden">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 truncate">Contact Management</h1>
                            <p className="text-gray-500 truncate">Manage all customer feedback and inquiries</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleRefresh}
                                disabled={contacts.loading}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Refresh contacts"
                            >
                                <ArrowPathIcon className={`h-5 w-5 ${contacts.loading ? 'animate-spin' : ''}`} />
                            </button>
                            <button
                                onClick={() => setDeleteAllDialogOpen(true)}
                                disabled={localContacts.length === 0 || contacts.loading}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <TrashIcon className="h-5 w-5" />
                                <span className="hidden md:block">Delete All</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-500 text-white p-4 md:p-5 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="overflow-hidden">
                                <p className="text-sm opacity-80 truncate">TOTAL CONTACTS</p>
                                <h3 className="text-xl md:text-2xl font-bold mt-1 truncate">{localContacts.length}</h3>
                            </div>
                            <div className="p-2 md:p-3 bg-purple-700 bg-opacity-20 rounded-lg">
                                <EnvelopeIcon className="h-5 md:h-6 w-5 md:w-6" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="overflow-hidden">
                                <p className="text-sm text-gray-500 truncate">RESOLVED</p>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1 truncate">
                                    {localContacts.filter(c => c.isResolved === true).length}
                                </h3>
                            </div>
                            <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                                <CheckCircleIcon className="h-5 md:h-6 w-5 md:w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="overflow-hidden">
                                <p className="text-sm text-gray-500 truncate">PENDING</p>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1 truncate">
                                    {localContacts.filter(c => !c.isResolved).length}
                                </h3>
                            </div>
                            <div className="p-2 md:p-3 bg-yellow-100 rounded-lg">
                                <ClockIcon className="h-5 md:h-6 w-5 md:w-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="overflow-hidden">
                                <p className="text-sm text-gray-500 truncate">NEW TODAY</p>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1 truncate">
                                    {localContacts.filter(c => {
                                        const today = new Date();
                                        const contactDate = new Date(c.createdAt);
                                        return contactDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
                                    }).length}
                                </h3>
                            </div>
                            <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                                <CalendarDaysIcon className="h-5 md:h-6 w-5 md:w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 min-w-0">
                            <label htmlFor="search-contacts" className="sr-only">Search contacts</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="search-contacts"
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Search by name, email, or subject..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        {/* Status Filter */}
                        <div className="flex items-center gap-2 md:w-56">
                            <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                            <FunnelIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            <select
                                id="status-filter"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full"
                            >
                                <option value="all">All Status</option>
                                <option value="resolved">Resolved</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Error/Success Messages */}
                {(contacts.error || contacts.success) && (
                    <div className={`mb-6 p-4 rounded-lg ${contacts.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center overflow-hidden">
                                {contacts.error ? (
                                    <ExclamationTriangleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                                ) : (
                                    <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                                )}
                                <span className="truncate">{contacts.error || contacts.message}</span>
                            </div>
                            <button onClick={handleCloseSnackbar} className="flex-shrink-0">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Contacts Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Contact
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                                        Email
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Subject
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                                        Date
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredContacts.length > 0 ? (
                                    filteredContacts.map((contact) => (
                                        <tr key={contact._id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-3 py-4 whitespace-nowrap">
                                                <div className="flex items-center min-w-0">
                                                    <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                        <span className="text-purple-600 font-medium text-xs md:text-sm">
                                                            {getInitials(contact.name)}
                                                        </span>
                                                    </div>
                                                    <div className="ml-3 min-w-0">
                                                        <div className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{contact.name}</div>
                                                        <div className="text-sm text-gray-500 md:hidden truncate max-w-[120px]">{contact.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell truncate max-w-[150px]">
                                                {contact.email}
                                            </td>
                                            <td className="px-3 py-4 min-w-0">
                                                <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] md:max-w-[200px]" title={contact.subject}>
                                                    {contact.subject}
                                                </div>
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                                {formatDate(contact.createdAt)}
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${contact.isResolved === true
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {contact.isResolved === true ? 'Resolved' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-1 md:gap-2">
                                                    <button
                                                        onClick={() => handleView(contact)}
                                                        disabled={contacts.loading}
                                                        className="text-blue-600 hover:text-blue-900 p-1 md:p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                                                        title="View details"
                                                    >
                                                        <EyeIcon className="h-4 w-4 md:h-5 md:w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(contact)}
                                                        disabled={contacts.loading}
                                                        className="text-red-600 hover:text-red-900 p-1 md:p-1.5 rounded-md hover:bg-red-50 transition-colors"
                                                        title="Delete contact"
                                                    >
                                                        <TrashIcon className="h-4 w-4 md:h-5 md:w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <EnvelopeIcon className="w-12 h-12 md:w-16 md:h-16 mb-4" />
                                                <p className="text-lg font-medium">No contacts found</p>
                                                <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* View Dialog */}
                {viewDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                        {/* Blurred background */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                        <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto mx-2">
                            <div className="bg-purple-600 text-white p-4 rounded-t-xl flex items-center">
                                <UserIcon className="h-6 w-6 mr-2" />
                                <h3 className="text-lg font-semibold">Contact Details</h3>
                                <button
                                    onClick={() => setViewDialogOpen(false)}
                                    className="ml-auto text-white hover:text-gray-200"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            {selectedContact && (
                                <div className="p-4 md:p-6">
                                    <div className="flex items-center mb-6">
                                        <div className="flex-shrink-0 h-12 w-12 md:h-14 md:w-14 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                                            <span className="text-purple-600 font-medium text-base md:text-lg">
                                                {getInitials(selectedContact.name)}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-lg font-semibold text-gray-900 truncate">{selectedContact.name}</h4>
                                            <p className="text-gray-500 truncate">{selectedContact.email}</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 mb-4">
                                        <div className="flex items-center mb-3">
                                            <ChatBubbleLeftRightIcon className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                                            <h5 className="font-medium text-gray-900 truncate">{selectedContact.subject}</h5>
                                        </div>

                                        <div className="flex items-start mb-4">
                                            <EnvelopeIcon className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <p className="text-gray-700 break-words">{selectedContact.message}</p>
                                        </div>

                                        <div className="flex items-center">
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-6">
                                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${selectedContact.isResolved
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {selectedContact.isResolved ? 'Resolved' : 'Pending'}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleUpdateContact}
                                                disabled={contacts.loading}
                                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                {selectedContact.isResolved ? 'Mark as Pending' : 'Mark as Resolved'}
                                            </button>
                                            <button
                                                onClick={() => setViewDialogOpen(false)}
                                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Delete Dialog */}
                {deleteDialogOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-2">
                            <div className="p-4 md:p-6">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-red-100 rounded-lg mr-3">
                                        <TrashIcon className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Delete Contact</h3>
                                </div>

                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete the contact from <strong>{selectedContact?.name}</strong>?
                                </p>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setDeleteDialogOpen(false)}
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteConfirm}
                                        disabled={contacts.loading}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {contacts.loading && (
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        )}
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete All Dialog */}
                {deleteAllDialogOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-2">
                            <div className="p-4 md:p-6">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-red-100 rounded-lg mr-3">
                                        <TrashIcon className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Delete All Contacts</h3>
                                </div>

                                <p className="text-gray-600 mb-4">
                                    Are you sure you want to delete all {localContacts.length} contacts?
                                </p>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                    <div className="flex">
                                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-yellow-700">
                                                This action cannot be undone and will permanently remove all contact data.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setDeleteAllDialogOpen(false)}
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteAllConfirm}
                                        disabled={contacts.loading}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {contacts.loading && (
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        )}
                                        Delete All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feedbacks;