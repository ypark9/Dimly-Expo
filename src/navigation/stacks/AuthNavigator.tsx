import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import SignInScreen from '../../screens/auth/SignInScreen';
import SignUpScreen from '../../screens/auth/SignUpScreen';
import ConfirmSignUpScreen from '../../screens/auth/ConfirmSignUpScreen';
import ResetPasswordScreen from '../../screens/auth/ResetPasswordScreen';
import ConfirmResetPasswordScreen from '../../screens/auth/ConfirmResetPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'Sign In' }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUpScreen}
        options={{ title: 'Verify Email' }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: 'Reset Password' }}
      />
      <Stack.Screen
        name="ConfirmResetPassword"
        component={ConfirmResetPasswordScreen}
        options={{ title: 'Reset Password' }}
      />
    </Stack.Navigator>
  );
}
