import axios from "axios";

export async function getUser() {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/user/getuser", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching user datab", err);
  }
}
