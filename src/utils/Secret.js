import CryptoJS from "crypto-js";

export const deCryptData = (data) => {
  const value =
    (data &&
      CryptoJS.AES.decrypt(data, "94035kjgfkdjfoijo934058kogfljdsgi90458dkljgfr0e98564kret34089kjdgfspos")?.toString(CryptoJS.enc.Utf8)) ||
    null;
  return value && JSON.parse(value);
};
export const enCryptData = (data) => {
  const value =
    data && CryptoJS.AES.encrypt(JSON.stringify(data), "94035kjgfkdjfoijo934058kogfljdsgi90458dkljgfr0e98564kret34089kjdgfspos")?.toString();
  return value;
};
