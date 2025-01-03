import {
  signIn,
  signOut,
  signUp,
  confirmSignUp,
  type SignUpInput,
  resetPassword,
  confirmResetPassword,
} from 'aws-amplify/auth';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  name: string;
}

class AuthService {
  async signIn({ email, password }: SignInCredentials) {
    try {
      console.log('Attempting to sign in with:', email);
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
        options: {
          authFlowType: 'USER_PASSWORD_AUTH',
        },
      });
      console.log('Sign in response:', { isSignedIn, nextStep });

      if (nextStep.signInStep !== 'DONE') {
        throw new Error('Additional authentication steps required');
      }

      if (!isSignedIn) {
        throw new Error('Sign in failed');
      }

      return { isSignedIn, nextStep };
    } catch (error) {
      console.error('Sign in error:', error);
      throw this.handleError(error);
    }
  }

  async signUp({ email, password, name }: SignUpCredentials) {
    try {
      const signUpData: SignUpInput = {
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      };

      const { isSignUpComplete, userId, nextStep } = await signUp(signUpData);
      return { isSignUpComplete, userId, nextStep };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async confirmSignUp(email: string, code: string) {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      return isSignUpComplete;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async signOut() {
    try {
      await signOut();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resetPassword(email: string) {
    try {
      const { nextStep } = await resetPassword({ username: email });
      return nextStep;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async confirmResetPassword(email: string, code: string, newPassword: string) {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      // Handle specific AWS Cognito error messages
      const errorMessage = error.message;

      if (errorMessage.includes('UserNotConfirmedException')) {
        return new Error('Please verify your email address');
      }
      if (errorMessage.includes('UserNotFoundException')) {
        return new Error('Account not found. Please check your email');
      }
      if (errorMessage.includes('NotAuthorizedException')) {
        return new Error('Incorrect email or password');
      }
      if (errorMessage.includes('InvalidParameterException')) {
        return new Error('Please check your input');
      }
      if (errorMessage.includes('CodeMismatchException')) {
        return new Error('Invalid verification code');
      }
      if (errorMessage.includes('ExpiredCodeException')) {
        return new Error('Verification code has expired');
      }
      if (errorMessage.includes('LimitExceededException')) {
        return new Error('Too many attempts. Please try again later');
      }
      if (errorMessage.includes('UsernameExistsException')) {
        return new Error('An account with this email already exists');
      }
      if (errorMessage.includes('InvalidPasswordException')) {
        return new Error(
          'Password must be at least 8 characters and contain uppercase, lowercase, numbers, and symbols',
        );
      }
      if (errorMessage.includes('CodeDeliveryFailureException')) {
        return new Error('Failed to send verification code. Please try again');
      }

      return error;
    }
    return new Error('An unexpected error occurred. Please try again');
  }
}

export const authService = new AuthService();
