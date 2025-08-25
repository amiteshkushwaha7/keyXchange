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
        
        // Clear both states
        clearAllContactStates: (state) => {
            state.contactForm.loading = false;
            state.contactForm.error = null;
            state.contactForm.message = null;
            state.contactForm.success = false;
            state.bugReport.loading = false;
            state.bugReport.error = null;
            state.bugReport.message = null;
            state.bugReport.success = false;
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
    clearAllContactStates
} = contactSlice.actions;

export default contactSlice.reducer;