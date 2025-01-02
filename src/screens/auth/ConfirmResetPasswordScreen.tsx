import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { AuthStackScreenProps } from '../../types/navigation';

export default function ConfirmResetPasswordScreen({
  route,
  navigation,
}: AuthStackScreenProps<'ConfirmResetPassword'>) {
  const { email } = route.params;
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { confirmResetPassword, error } = useAuth();

  const handleConfirmResetPassword = async () => {
    if (!code || !newPassword) return;

    setIsLoading(true);
    try {
      await confirmResetPassword(email, code, newPassword);
      navigation.navigate('SignIn');
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Enter the verification code sent to your email and your new password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        placeholderTextColor="#666"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#666"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        editable={!isLoading}
      />

      {error && <Text style={styles.errorText}>{error.message}</Text>}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleConfirmResetPassword}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('ResetPassword')}
        disabled={isLoading}>
        <Text style={styles.linkText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff3b30',
    marginBottom: 15,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
