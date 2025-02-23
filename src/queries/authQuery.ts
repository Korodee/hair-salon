import { deleteUser, ErrorResponse, getCurrentUser, login, register, requestPasswordReset, resetPassword, updateUser, verifyEmail, resendVerificationToken } from "@/services/authService";
import { LoginData, LoginResponse, RegisterData, RegisterResponse, RequestPasswordResetResponse, RequestPasswordResetData, VerifyEmailData, VerifyEmailResponse, ResetPasswordResponse, ResetPasswordData, UpdateUserData, UpdateUserResponse, DeleteUserResponse, ResendVerificationTokenData, ResendVerificationTokenResponse } from "@/types/authTypes";
import { useMutation, useQuery } from "@tanstack/react-query";



export const useLogin = () => {
    return useMutation<LoginResponse, ErrorResponse, LoginData>({
        mutationFn: (data: LoginData) => login(data.email, data.password),
        onSuccess: (response) => {
            return response;
        }
      });
}

export const useRegister = () => {
    return useMutation<RegisterResponse, ErrorResponse, RegisterData>({
        mutationFn: (data: RegisterData) => register(data.email, data.password, data.name),
        onSuccess: (response) => {
            return response;
        }
    })
}

export const useGetCurrentUser = () => {
    return useQuery<ErrorResponse>({
        queryKey: ["user"],
        queryFn: () => getCurrentUser(),
    })
}

export const useVerifyEmail = () => {
    return useMutation<VerifyEmailResponse, ErrorResponse, VerifyEmailData>({
        mutationFn: (data: VerifyEmailData) => verifyEmail(data.token),
        onSuccess: (response) => {
                return response;
            }
    })
}
export const useRequestPasswordReset = () => {
    return useMutation<RequestPasswordResetResponse, ErrorResponse, RequestPasswordResetData>({
        mutationFn: (data: RequestPasswordResetData) => requestPasswordReset(data.email),
        onSuccess: (response) => {
            return response;
        }
    })
}

export const useResetPassword = () => {
    return useMutation<ResetPasswordResponse, ErrorResponse, ResetPasswordData>({
        mutationFn: (data: ResetPasswordData) => resetPassword(data.token, data.password),
        onSuccess: (response) => {
            return response;
        }
    })
}

export const useUpdateUser = () => {
    return useMutation<UpdateUserResponse, ErrorResponse, UpdateUserData>({
        mutationFn: (data: UpdateUserData) => updateUser(data.name),
        onSuccess: (response) => {
            return response;
        }
    })
}

export const useDeleteUser = () => {
    return useMutation<DeleteUserResponse, ErrorResponse>({
        mutationFn: () => deleteUser(),
        onSuccess: (response) => {
            return response;
        }
    })
}

export const useResendVerificationToken = () => {
    return useMutation<ResendVerificationTokenResponse, ErrorResponse, ResendVerificationTokenData>({
        mutationFn: (data: ResendVerificationTokenData) => resendVerificationToken(data.email),
        onSuccess: (response) => {
            return response;
        }
    })
}

