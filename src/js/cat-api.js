import axios from "axios";

const API_KEY = "live_zsjQj9RzTIBRHZJncFfewDUCQN5x89pkMHFQogeb1HzzCcgwEMm8FKAfkk0Dvxmi";

axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.baseURL = "https://api.thecatapi.com/v1";

export async function fetchBreeds() { 
    try {
        const { data } = await axios("/breeds");

        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function fetchBreedInfo(breedId) { 
    try {
        const { data } = await axios(`/breeds/${breedId}`);

        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function fetchCatByBreed(breedId) { 
    try {
        const { data } = await axios("/images/search", {
            breed_ids: breedId
        });
        const { url: image } = data[0];
        const { name, description, temperament } = await fetchBreedInfo(breedId);

        return {
            image,
            name,
            description,
            temperament
        };
    } catch (error) {
        throw new Error(error);
    }
}