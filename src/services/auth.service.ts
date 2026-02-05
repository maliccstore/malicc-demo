import { SignupInput, User } from "../types/user";
import { demoUser } from "../data/users";

// Simulate server-side user state
let currentUser: User = { ...demoUser };

export const signupAPI = async (_input: SignupInput) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  // Mock response structure matching original
  return {
    data: {
      data: {
        signup: {
          user: currentUser
        }
      }
    }
  };
};

export const requestLoginOTPAPI = async (_phoneNumber: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: { data: { requestLoginOTP: true } } };
};

export const verifyOTPAPI = async (_phoneNumber: string, _otp: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return a fake token and user
  return {
    data: {
      data: {
        verifyOTP: {
          token: "mock-jwt-token-12345",
          user: currentUser
        }
      }
    }
  };
};

export const resendOTPAPI = async (_phoneNumber: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: { data: { RequestOTP: true } } };
};

export const getMeAPI = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    data: {
      data: {
        user: currentUser
      }
    }
  };
};

export const updateUserByPhoneAPI = async (input: { username?: string; email?: string }) => {
  await new Promise(resolve => setTimeout(resolve, 600));

  // Update local Mock User
  currentUser = {
    ...currentUser,
    ...input
  };

  return {
    data: {
      data: {
        updateUserByPhone: currentUser
      }
    }
  };
};
