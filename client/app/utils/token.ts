interface TokenData {
  userId: string;
  token: string;
  expiration: number;
}

interface SetTokenParams {
  userId: string;
  token: string;
}

// Store the token with expiration time (24 hours)
export const setTokenWithExpiration = ({ userId, token }: SetTokenParams) => {
  const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
  const tokenData: TokenData = {
    userId,
    token,
    expiration: expirationTime,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(tokenData));
  }
};

// Retrieve the token with expiration check
export const getTokenWithExpiration = () => {
  let storedUser;
  if (typeof window !== "undefined") {
    storedUser = localStorage.getItem("user");
  }
  if (!storedUser) return null;

  const data = JSON.parse(storedUser);

  if (!data) return null;

  const currentTime = Date.now();

  // Check if the token has expired
  if (currentTime > data.expiration) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    return null;
  }

  return data; // Return the valid token
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};
