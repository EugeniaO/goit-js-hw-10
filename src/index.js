import './sass/index.scss';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import refs from './js/refs';

function catCard(data) { 
    const {
        image,
        name,
        description,
        temperament
    } = data;
    return `
        <div class="card">
            <div class="thumb">
                <img class="image" src="${image}" alt="${name} cat" />
            </div>
            <div class="info">
                <h1 class="title">${name}</h1>
                <p class="description">${description}</p>
                <p class="temperament"><b>Temperament:</b> ${temperament}</p>
            </div>
        </div>
    `
}

fetchBreeds()
    .then((data) => { 
        const selectOptions = data.map(({ id, name }) => ({ text: name, value: id }));

        new SlimSelect({
            select: '#breed-select',
            data: selectOptions,
            events: {
                afterChange: (breedId) => {
                    refs.catInfoElement.innerHTML = '';
                    refs.loaderBoxElement.classList.remove('hide');
                    const { value } = breedId[0];
                    fetchCatByBreed(value)
                        .then((data) => { 
                            refs.catInfoElement.innerHTML = catCard(data);
                        })
                        .catch((error) => { 
                            Notify.warning(error);
                        })
                        .finally(() => { 
                            refs.loaderBoxElement.classList.add('hide');
                        });            }
                }
        })
    })
    .catch((error) => { 
        Notify.warning(error);
    })
    .finally(() => { 
        refs.loaderBoxElement.classList.add('hide');
    });

