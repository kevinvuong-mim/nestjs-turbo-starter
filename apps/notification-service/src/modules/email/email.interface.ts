export interface EmailOptions {
  from?: string;
  to: string | string[];
  subject: string;
  cc?: string | string[];
  bcc?: string | string[];
  htmlContent: string;
}

export interface VerifySignupMailPayload {
  email: string;
  name: string;
  verifyUrl: string;
}

export interface ResetPasswordMailPayload {
  email: string;
  name: string;
  resetPasswordUrl: string;
}

export interface PasswordUpdatedMailPayload
  extends Pick<VerifySignupMailPayload, 'email' | 'name'> {}

export interface OtpSecureLoginMailPayload {
  email: string;
  userName: string;
  otp: string;
  expiresIn: string;
}

export type MailPayload =
  | VerifySignupMailPayload
  | ResetPasswordMailPayload
  | PasswordUpdatedMailPayload
  | OtpSecureLoginMailPayload;
