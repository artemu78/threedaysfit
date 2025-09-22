import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUser, IGoogleUser } from "@/lib/store";
import { UserAvatar } from "@/components/user-avatar";
import { writeToFirestore } from "@/lib/firestore-api";
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from "@/components/ui/button";

export const Login = () => {
  const { user, setGoogleData, setAccessToken } = useUser((state) => state);

  const handleSignInError = (error: any) => {
    console.error("Login Failed", error);
    // TODO: Show a toast or message to the user
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setAccessToken(tokenResponse.access_token);

        const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }).then((res) => res.json());

        setGoogleData(userInfo);

        const {
          aud,
          azp,
          exp,
          iat,
          iss,
          jti,
          nbf,
          ...userProfile
        } = userInfo;
        const documentId = userInfo.sub;

        await writeToFirestore(
          tokenResponse.access_token,
          "users",
          userProfile,
          documentId
        );
      } catch (error) {
        console.error("Login process failed:", error);

        // Clear any partially set state to maintain consistent UX
        setAccessToken();
        setGoogleData();

        // Handle the error using the existing error handler
        handleSignInError(error);
      }
    },
    onError: handleSignInError,
    scope: "openid profile email https://www.googleapis.com/auth/datastore",
  });

  return (
    <>
      {user?.googleData ? (
        <UserAvatar />
      ) : (
        <Button onClick={() => login()} variant={"outline"}>
          <img src="/images/google_icon.png" style={{ height: '100%', width: 'auto' }} />
          Login</Button>
      )}
    </>
  );
};
