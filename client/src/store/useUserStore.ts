import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

// Define API endpoint
const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

// User type
type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

// UserState type
type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  Signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateProfile: (input: any) => Promise<void>;
};

// Zustand store definition
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      
      // Signup API implementation
      Signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/Signup`, input, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Signup Error: ', error.response?.data);  // Log the error details
            toast.error(error.response?.data.message || 'Error during signup');
            set({ loading: false });
          }
      },

      // Login API implementation
      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/Login`, input, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast.error(error.response?.data.message || 'Error during login');
          set({ loading: false });
        }
      },

      // Email verification API implementation
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast.error(error.response?.data.message || 'Error during email verification');
          set({ loading: false });
        }
      },

      // Check Authentication status
      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`);
          if (response.data.success) {
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          set({ isAuthenticated: false, isCheckingAuth: false });
        }
      },

      // Logout API implementation
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast.error(error.response?.data.message || 'Error during logout');
          set({ loading: false });
        }
      },

      // Forgot Password API implementation
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast.error(error.response?.data.message || 'Error during password reset');
          set({ loading: false });
        }
      },

      // Reset Password API implementation
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast.error(error.response?.data.message || 'Error resetting password');
          set({ loading: false });
        }
      },

      // Update Profile API implementation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateProfile: async (input: any) => {
        try {
          const response = await axios.put(`${API_END_POINT}/profile/update`, input, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ user: response.data.user, isAuthenticated: true });
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast.error(error.response?.data.message || 'Error updating profile');
        }
      },
    }),
    {
      name: 'user-storage', // Store name in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
