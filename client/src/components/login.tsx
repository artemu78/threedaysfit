import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUser, IUser, IUserState } from "@/lib/store";

export const Login = () => {
  const setUser = useUser((state) => state.setUser);

  const handleSignInSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const user: IUser = jwtDecode(credentialResponse.credential);
      setUser(user);
    }
    // TODO: Handle the credentialResponse, e.g., send the token to your backend
  };

  const handleSignInError = () => {
    console.error("Login Failed");
    // TODO: Show a toast or message to the user
  };

  return (
    <GoogleLogin onSuccess={handleSignInSuccess} onError={handleSignInError} />
  );
};
