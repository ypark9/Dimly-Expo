import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ConfirmSignUp: {
    email: string;
  };
  ResetPassword: undefined;
  ConfirmResetPassword: {
    email: string;
  };
};

export type MainTabParamList = {
  Feed: undefined;
  Library: undefined;
  Settings: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;
