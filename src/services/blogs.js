import axios from "axios";
const baseUrl = "https://bloglistapp-vej2.onrender.com/api/blogs";

const signurl = "https://bloglistapp-vej2.onrender.com/api/users";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getBlogById = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

const getallusers = () => {
  const request = axios.get(signurl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id) => {
  const request = axios.put(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const addcomment = (id, comment) => {
  const request = axios.put(`${baseUrl}/${id}`, { comment });
  return request.then((response) => response.data);
};

const deletee = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const signup = (username, name, password) => {
  const signupdata = { username, name, password };
  const request = axios.post(signurl, signupdata);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  setToken,
  deletee,
  signup,
  getallusers,
  getBlogById,
  addcomment,
};
