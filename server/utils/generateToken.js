import jwt from "jsonwebtoken";

const generateAuthToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
export default generateAuthToken;
