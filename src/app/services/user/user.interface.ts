export interface User {
  id: number
  url: string
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  is_email_verified: boolean
}

export interface PasswordReset {
  email: string
}

export interface PasswordResetConfirm {
  new_password1: string
  new_password2: string
  uid: string
  toker: string
}