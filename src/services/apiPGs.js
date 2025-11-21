import axios from "axios";

export async function getAllPg() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/pg/getAllpg"
    );
    return response;
  } catch (error) {
    console.error("Error fetching PG's ", error);
    throw error;
  }
}

export async function getPgDetail() {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/pg/getSinglePg", {
      withCredentials: true,
    });
    console.log("result: ", res);
    console.log("resutl typ: ", typeof res);
    return res;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching pg data: ", err);
  }
}

/*
{
  title,
  description,
  address_line_1,
  city,
  area_name,
  monthly_rent_base,
  security_deposit_months,
  is_deposit_refundable,
  near_me,
  amenities,
  image_url,
}
*/
export async function createPg(formData) {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/pg/pgCreate",
      formData, // 2nd Argument: The Data
      {
        // 3rd Argument: The Configuration (Headers + Credentials)
        withCredentials: true, // <--- MUST BE INSIDE HERE
        headers: {
          // "Content-Type": "multipart/form-data" // Optional: Axios detects this automatically
        },
      }
    );
    console.log("pg create result: ", res);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error creating pg");
  }
}
