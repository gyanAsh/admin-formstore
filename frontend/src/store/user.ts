import { persistentAtom } from "@nanostores/persistent";

interface UserLogin {
  id?: number;
  email?: string;
  username?: string;
}

export const $userLoginData = persistentAtom<UserLogin>(
  "userLoginData",
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
