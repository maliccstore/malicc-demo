import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    signupAPI,
    requestLoginOTPAPI,
    verifyOTPAPI,
    getMeAPI,
    resendOTPAPI,
    // updateUserAPI,
} from "../../services/auth.service";
import { User, SignupInput, AuthPayload } from "../../types/user";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    otpSent: boolean;
    verificationPhone: string | null; // Phone number to verify
}

const initialState: AuthState = {
    user: null,
    token: typeof window !== "undefined" ? localStorage.getItem("auth-token") : null,
    isAuthenticated: false,
    loading: false,
    error: null,
    otpSent: false,
    verificationPhone: null,
};

// Async Thunks
export const signupThunk = createAsyncThunk(
    "auth/signup",
    async (input: SignupInput, { rejectWithValue }) => {
        try {
            const response = await signupAPI(input);
            return { user: response.data.data.signup.user, input };
        } catch (error: any) {
            return rejectWithValue(error.message || "Signup failed");
        }
    }
);

export const loginStartThunk = createAsyncThunk(
    "auth/loginStart",
    async (phoneNumber: string, { rejectWithValue }) => {
        try {
            const response = await requestLoginOTPAPI(phoneNumber);
            return phoneNumber;
        } catch (error: any) {
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

export const verifyOTPThunk = createAsyncThunk(
    "auth/verifyOTP",
    async (
        { phoneNumber, otp }: { phoneNumber: string; otp: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await verifyOTPAPI(phoneNumber, otp);
            return response.data.data.verifyOTP;
        } catch (error: any) {
            return rejectWithValue(error.message || "Verification failed");
        }
    }
);

export const loadUserThunk = createAsyncThunk(
    "auth/loadUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getMeAPI();
            return response.data.data.user;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to load user");
        }
    }

);

export const resendOTPThunk = createAsyncThunk(
    "auth/resendOTP",
    async (phoneNumber: string, { rejectWithValue }) => {
        try {
            await resendOTPAPI(phoneNumber);
            return phoneNumber;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to resend OTP");
        }
    }
);

// TODO: Update User
// export const updateUserThunk = createAsyncThunk(
//     "auth/updateUser",
//     async (input: Partial<User> & { address?: Address }, { rejectWithValue }) => {
//         try {
//             const response = await updateUserAPI(input);
//             return response.data.data.updateUser.user;
//         } catch (error: any) {
//             return rejectWithValue(error.message || "Failed to update user");
//         }
//     }
// );


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.otpSent = false;
            state.verificationPhone = null;
            localStorage.removeItem("auth-token");
        },
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Signup
        builder.addCase(signupThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signupThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.otpSent = true;
            state.verificationPhone = action.payload.input.phoneNumber;
        });
        builder.addCase(signupThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Login Start
        builder.addCase(loginStartThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginStartThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.otpSent = true;
            state.verificationPhone = action.payload;
        });
        builder.addCase(loginStartThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Verify OTP
        builder.addCase(verifyOTPThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(verifyOTPThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.otpSent = false;
            state.verificationPhone = null;
            localStorage.setItem("auth-token", action.payload.token);
        });
        builder.addCase(verifyOTPThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Load User
        builder.addCase(loadUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(loadUserThunk.rejected, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("auth-token");
            localStorage.removeItem("auth-token");
        });

        // Update User
        // builder.addCase(updateUserThunk.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // });
        // builder.addCase(updateUserThunk.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.user = action.payload;
        // });
        // builder.addCase(updateUserThunk.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload as string;
        // });
    },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;
