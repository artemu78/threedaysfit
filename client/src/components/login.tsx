import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUser, IGoogleUser } from "@/lib/store";
import { UserAvatar } from "@/components/user-avatar";
import { writeToFirestore } from "@/lib/firestore-api";

export const Login = () => {
  const { user, setGoogleData } = useUser((state) => state);

  const handleSignInSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const decodedUser: IGoogleUser = jwtDecode(credentialResponse.credential);
        setGoogleData(decodedUser);

        // Use the Google ID as the document ID in Firestore
        const documentId = decodedUser.sub;

        await writeToFirestore(
          credentialResponse.credential,
          "users",
          decodedUser,
          documentId
        );
      } catch (error) {
        console.error("Sign in or Firestore write failed:", error);
        // TODO: Show a toast or message to the user
      }
    }
  };

  const handleSignInError = () => {
    console.error("Login Failed");
    // TODO: Show a toast or message to the user
  };

  return (
    <>
      {user?.googleData ? (
        <UserAvatar />
      ) : (
        <GoogleLogin
          onSuccess={handleSignInSuccess}
          onError={handleSignInError}
        />
      )}
    </>
  );
};
