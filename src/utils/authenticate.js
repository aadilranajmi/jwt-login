import jwt from "jsonwebtoken";
const secretKey = "secretKEY";

const tempUser = {
  email: "test@test.com",
  password: "password",
};

export const authenticate = async () => {
  const { email, password } = credential;
  if (email === tempUser.email && password === tempUser.password) {
    const accessToken = jwt.sign({ email: email }, secretKey);
    return {
      status: 202,
      token: accessToken,
      email: tempUser.email,
    };
  } else {
    return {
      status: 404,
      error: "invalid_user",
    };
  }
};
