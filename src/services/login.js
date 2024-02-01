import axios from "axios";

const baseUrl = "https://bloglistapp-vej2.onrender.com/api/login";

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(baseUrl, credentials);

      // Assuming the server returns a token upon successful login
      const token = response.data.token;

      // Set the token in the Authorization header for subsequent requests
      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;

      return response.data;
    } catch (error) {
      throw new Error("Login failed");
    }
  },
};

export default authService;
