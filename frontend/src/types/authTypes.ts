export type User = {
    _id: string;
    name: string;
    email: string;
    bookings: [];
    isVerified: boolean;
    verificationToken: string;
    verificationTokenExpires: Date;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
}


export type LoginData = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    user: User;
}

export type RegisterData = {
    email: string;
    password: string;
    name: string;
}

export type RegisterResponse = {
    message: string;
    user: User;
}

export type VerifyEmailData = {
    token: string;
}

export type VerifyEmailResponse = {
    message: string;
}

export type RequestPasswordResetData = {
    email: string;
}

export type RequestPasswordResetResponse = {
    message: string;
}

export type ResetPasswordData = {
    token: string;
    password: string;
}


export type ResetPasswordResponse = {
    message: string;
}

export type UpdateUserData = {
    name: string;
}

export type UpdateUserResponse = {
    message: string;
}

export type DeleteUserResponse = {
    message: string;
}

export type ResendVerificationTokenData = {
    email: string;
}

export type ResendVerificationTokenResponse = {
    message: string;
}
