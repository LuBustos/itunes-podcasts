import axios from "axios";

export async function getData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
