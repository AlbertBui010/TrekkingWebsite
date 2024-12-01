import axios from "axios";

const getAllGuide = (id) => {
  return axios.get(`/api/get-all-guide?id=${id}`);
};

export default { getAllGuide };
