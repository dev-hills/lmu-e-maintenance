import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  login,
  register,
  verifyEmail,
} from "../../services/AuthService";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data) => register(data),
  });
};

export const useVerify = () => {
  return useMutation({
    mutationKey: ["Verify"],
    mutationFn: (data) => verifyEmail(data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["Login"],
    mutationFn: (data) => login(data),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["ForgotPassword"],
    mutationFn: (data) => forgotPassword(data),
  });
};
