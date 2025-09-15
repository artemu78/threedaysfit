import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUser, IGoogleUser } from "@/lib/store";
import { UserAvatar } from "@/components/user-avatar";

export const Login = () => {
  const { user, setGoogleData } = useUser((state) => state);

  const handleSignInSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const user: IGoogleUser = jwtDecode(credentialResponse.credential);
      setGoogleData(user);
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
