import axios from "axios";

const baseurl = atob(import.meta.env.VITE_API_URL);

export const dispatcher = async (url, payload) => {
  try {
    const response = await axios.post(`${baseurl}/v1/${url}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response && response.data) {
      return response.data;
    } else {
      console.error("Unexpected response format:", response);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error("Dispatcher Error:", error.response.data);
    } else {
      console.error("Dispatcher Error (no response):", error.message);
    }
    return null;
  }
};
