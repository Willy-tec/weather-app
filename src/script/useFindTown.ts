import axios from "axios";

async function useFindTown(lat: number, lon: number): Promise<string> {
  const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}&type=street`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => resolve(response.data.features[0].properties.city))
      .catch((err) => reject(err));
  });
}

export default useFindTown;
