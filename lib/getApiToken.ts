// Makes a request to the HelloFresh website to get a bearer token,
// then returns it.
export const getApiToken = async () => {
  const res = await fetch(
    "https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials",
    {
      method: "POST",
    }
  );
  const data: GetTokenResponse = await res.json();
  return data.access_token;
};

type GetTokenResponse = {
  access_token: string;
  expires_in: number;
  issued_at: number;
  scope: string;
  token_type: string;
};
