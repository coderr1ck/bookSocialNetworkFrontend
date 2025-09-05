import {jwtDecode} from "jwt-decode";

export const ERR_MSG = "Something went wrong";

export const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
export const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!#%*?&]{8,}$/;
        return regex.test(password);
};
export const fakeApi = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                resolve({ message: "Hello from fake API!" });
                }, 3500); // 1.5s delay
            });
};  


export function getUserFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return {
        email : decoded.sub,
        exp : decoded.exp
    }
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}
