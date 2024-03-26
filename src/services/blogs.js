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

const create = async (formData) => {
  const formdata = new FormData();
  formdata.append("title", formData.get("title"));
  formdata.append("author", formData.get("author"));
  formdata.append("url", formData.get("url"));
  formdata.append("likes", formData.get("likes"));

  if (formData.get("video")) {
    formdata.append("video", formData.get("video"));
  }

  const config = {
    headers: { Authorization: token },
    "Content-Type": "multipart/form-data",
  };
  const response = await axios.post(baseUrl, formdata, config);
  return response.data;
};

const update = (id) => {
  const request = axios.put(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updateuser = (id, name, username, profileicon) => {
  const newdata = { name: name, username: username, profileicon: profileicon };
  const request = axios.put(`${signurl}/${id}`, newdata);
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

const signup = (formData) => {
  const formdata = new FormData();
  formdata.append("username", formData.get("username"));
  formdata.append("name", formData.get("name"));
  formdata.append("password", formData.get("password"));
  if (formData.get("profileicon")) {
    formdata.append("profileicon", formData.get("profileicon"));
  }
  const request = axios.post(signurl, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
  updateuser,
};
