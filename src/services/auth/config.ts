import { Amplify } from "aws-amplify";

// AWS Cognito Configuration
export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID!,
        signUpVerificationMethod: "code",
      },
    },
  });
};
