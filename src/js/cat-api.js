import axios from "axios";

const API_KEY = "live_zsjQj9RzTIBRHZJncFfewDUCQN5x89pkMHFQogeb1HzzCcgwEMm8FKAfkk0Dvxmi";

axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.baseURL = "https://api.thecatapi.com/v1";

export function fetchBreeds() {
    return new Promise((resolve, reject) => {
        axios("/breeds")
            .then((response) => { 
                const { data } = response;

                resolve(data);
            })
            .catch(() => {
                reject('Oops! Something went wrong! Try reloading the page!');
            });
    })
};

export function fetchBreedInfo(breedId) { 
    return new Promise((resolve, reject) => {
        axios(`/breeds/${breedId}`)
            .then((response) => { 
                const { data } = response;

                resolve(data);
            })
            .catch(() => {
               reject('Oops! Something went wrong! Try reloading the page!');
            });
    })
}

export function fetchCatByBreed(breedId) {
    return new Promise((resolve, reject) => {
            axios("/images/search", {
                breed_ids: breedId
            })
            .then((response) => { 
                const { data } = response;
                const { url: image } = data[0];

                fetchBreedInfo(breedId)
                    .then((data) => { 
                        const { name, description, temperament } = data;
                        resolve({
                            image,
                            name,
                            description,
                            temperament
                        });
                    });  
            })
            .catch(() => {
                reject('Oops! Something went wrong! Try reloading the page!');
            });
    })
}