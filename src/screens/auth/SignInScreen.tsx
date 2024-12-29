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

type Props = NativeStackScreenProps<AuthStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Starting sign in process...");
      const result = await signIn({ email, password });
      console.log("Sign in completed:", result);

      if (!result.isSignedIn) {
        Alert.alert(
          "Error",
          "Failed to sign in. Please check your credentials and try again.",
        );
      }
    } catch (error) {
      console.error("Sign in error in screen:", error);
      if (error instanceof Error && error.message.includes("not confirmed")) {
        Alert.alert(
          "Account Not Verified",
          "Please verify your email address first",
          [
            {
              text: "Verify Now",
              onPress: () => navigation.navigate("ConfirmSignUp", { email }),
            },
            { text: "OK" },
          ],
        );
      } else {
        Alert.alert(
          "Error",
          error instanceof Error ? error.message : "Sign in failed",
        );
      }
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
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
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
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
  },
});
