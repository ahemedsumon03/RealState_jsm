import axios from "axios";
export const baseUrl = "https://bayut.p.rapidapi.com";

export const faceApi = async (url) => {
    const { data } = await axios.get(url, {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '65c29d6bbdmsheb39ce21588c3cap18be62jsn0d4e3ef43b59'
          }
    });
    return data;
}
