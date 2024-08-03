import axios from "axios";
export const validateToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const response = await axios.post("/vt/verifytoken");
    console.log(response);
    if (response.ok) {
      return true;
    } else {
      localStorage.removeItem("token");
      return false;
    }
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    return false;
  }
};
