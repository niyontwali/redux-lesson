import API from "../../api";

const getBlogs = async (data) => {
  const response = await API.get("http://localhost:8080/api/v1/blogs");

  console.log("blogs", response)
  return response?.data?.data;
};

 const getBlog = () => {}


const authServices = { getBlogs, getBlog };

export default authServices;