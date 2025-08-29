import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contactAPI from './contactAPI';

// Helper function to create contact thunks with consistent error handling
const createContactThunk = (name, apiCall) => createAsyncThunk(
    `contact/${name}`,
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCall(data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);

// Create all thunks using the helper
export const submitContactForm = createContactThunk('submitContactForm', contactAPI.submitContactFormAPI);
export const submitBugReport = createContactThunk('submitBugReport', contactAPI.submitBugReportAPI);
export const getAllContacts = createContactThunk('getAllContacts', contactAPI.getAllContactsAPI);
export const getContactById = createContactThunk('getContactById', (id) => contactAPI.getContactByIdAPI(id));
export const updateContact = createContactThunk('updateContact', ({ id, data }) => contactAPI.updateContactAPI(id, data));
export const deleteContact = createContactThunk('deleteContact', (id) => contactAPI.deleteContactAPI(id));
export const deleteAllContacts = createContactThunk('deleteAllContacts', contactAPI.deleteAllContactsAPI);

const initialState = {
    // Contact form specific state
    contactForm: {
        loading: false,
        error: null,
        message: null,
        success: false
    },
    // Bug report specific state
    bugReport: {
        loading: false,
        error: null,
        message: null,
        success: false
    },
    // Contacts management state
    contacts: {
        loading: false,
        error: null,
        data: [],
        currentContact: null,
        success: false
    }
};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        // Contact form actions
        clearContactError: (state) => {
            state.contactForm.error = null;
        },
        clearContactMessage: (state) => {
            state.contactForm.message = null;
        },
        clearContactState: (state) => {
            state.contactForm.loading = false;
            state.contactForm.error = null;
            state.contactForm.message = null;
            state.contactForm.success = false;
        },
        resetContactSuccess: (state) => {
            state.contactForm.success = false;
        },

        // Bug report actions
        clearBugReportError: (state) => {
            state.bugReport.error = null;
        },
        clearBugReportMessage: (state) => {
            state.bugReport.message = null;
        },
        clearBugReportState: (state) => {
            state.bugReport.loading = false;
            state.bugReport.error = null;
            state.bugReport.message = null;
            state.bugReport.success = false;
        },
        resetBugReportSuccess: (state) => {
            state.bugReport.success = false;
        },

        // Contacts management actions
        clearContactsError: (state) => {
            state.contacts.error = null;
        },
        clearContactsData: (state) => {
            state.contacts.data = [];
        },
        clearCurrentContact: (state) => {
            state.contacts.currentContact = null;
        },
        clearContactsState: (state) => {
            state.contacts.loading = false;
            state.contacts.error = null;
            state.contacts.data = [];
            state.contacts.currentContact = null;
            state.contacts.success = false;
        },
        resetContactsSuccess: (state) => {
            state.contacts.success = false;
        },

        // Clear all states
        clearAllContactStates: (state) => {
            state.contactForm.loading = false;
            state.contactForm.error = null;
            state.contactForm.message = null;
            state.contactForm.success = false;
            state.bugReport.loading = false;
            state.bugReport.error = null;
            state.bugReport.message = null;
            state.bugReport.success = false;
            state.contacts.loading = false;
            state.contacts.error = null;
            state.contacts.data = [];
            state.contacts.currentContact = null;
            state.contacts.success = false;
        }
    },
    extraReducers: (builder) => {
        // Helper function for common pending/rejected cases
        const addCommonCases = (thunk, stateKey) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state[stateKey].loading = true;
                    state[stateKey].error = null;
                    state[stateKey].success = false;
                })
                .addCase(thunk.rejected, (state, action) => {
                    state[stateKey].loading = false;
                    state[stateKey].error = action.payload?.message || 'Request failed';
                    state[stateKey].success = false;
                });
        };

        // Submit Contact Form
        addCommonCases(submitContactForm, 'contactForm');
        builder.addCase(submitContactForm.fulfilled, (state, action) => {
            state.contactForm.loading = false;
            state.contactForm.message = action.payload.message || 'Message sent successfully';
            state.contactForm.success = true;
        });

        // Submit Bug Report
        addCommonCases(submitBugReport, 'bugReport');
        builder.addCase(submitBugReport.fulfilled, (state, action) => {
            state.bugReport.loading = false;
            state.bugReport.message = action.payload.message || 'Bug report submitted successfully';
            state.bugReport.success = true;
        });

        // Get All Contacts
        addCommonCases(getAllContacts, 'contacts');
        builder.addCase(getAllContacts.fulfilled, (state, action) => {
            state.contacts.loading = false;
            // Ensure we're getting an array from the response
            state.contacts.data = Array.isArray(action.payload)
                ? action.payload
                : (action.payload.data || []);
            state.contacts.success = true;
        });

        // Get Contact By ID
        addCommonCases(getContactById, 'contacts');
        builder.addCase(getContactById.fulfilled, (state, action) => {
            state.contacts.loading = false;
            state.contacts.currentContact = action.payload;
            state.contacts.success = true;
        });

        // Update Contact
        addCommonCases(updateContact, 'contacts');
        builder.addCase(updateContact.fulfilled, (state, action) => {
            state.contacts.loading = false;
            state.contacts.message = action.payload.message || 'Contact updated successfully';
            state.contacts.success = true;
            // Update the contact in the list if it exists
            if (state.contacts.currentContact?.id === action.payload.id) {
                state.contacts.currentContact = action.payload;
            }
        });

        // Delete Contact
        addCommonCases(deleteContact, 'contacts');
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            state.contacts.loading = false;
            state.contacts.message = action.payload.message || 'Contact deleted successfully';
            state.contacts.success = true;
            // Remove the contact from the list
            state.contacts.data = state.contacts.data.filter(contact => contact.id !== action.meta.arg);
            // Clear current contact if it was the deleted one
            if (state.contacts.currentContact?.id === action.meta.arg) {
                state.contacts.currentContact = null;
            }
        });

        // Delete All Contacts
        addCommonCases(deleteAllContacts, 'contacts');
        builder.addCase(deleteAllContacts.fulfilled, (state, action) => {
            state.contacts.loading = false;
            state.contacts.message = action.payload.message || 'All contacts deleted successfully';
            state.contacts.data = [];
            state.contacts.currentContact = null;
            state.contacts.success = true;
        });
    }
});

export const {
    clearContactError,
    clearContactMessage,
    clearContactState,
    resetContactSuccess,
    clearBugReportError,
    clearBugReportMessage,
    clearBugReportState,
    resetBugReportSuccess,
    clearContactsError,
    clearContactsData,
    clearCurrentContact,
    clearContactsState,
    resetContactsSuccess,
    clearAllContactStates
} = contactSlice.actions;

export default contactSlice.reducer;