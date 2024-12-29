import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<AuthStackParamList, "ConfirmSignUp">;

export default function ConfirmSignUpScreen({ route, navigation }: Props) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { confirmSignUp } = useAuth();
  const { email } = route.params;

  const handleConfirmation = async () => {
    if (!code) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    try {
      setIsLoading(true);
      const isConfirmed = await confirmSignUp(email, code);
      if (isConfirmed) {
        Alert.alert("Success", "Your account has been verified", [
          {
            text: "Sign In",
            onPress: () => navigation.navigate("SignIn"),
          },
        ]);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Verification failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          Please enter the verification code sent to {email}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Verification Code"
          placeholderTextColor="#666"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoComplete="off"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleConfirmation}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Verifying..." : "Verify"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
