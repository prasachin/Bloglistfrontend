import axios from "axios";

const baseUrl = "https://bloglistapp-vej2.onrender.com/api/login";

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(baseUrl, credentials);
      const token = response.data.token;
      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;

      return response.data;
    } catch (error) {
      throw new Error("Login failed");
    }
  },
};

export default authService;
