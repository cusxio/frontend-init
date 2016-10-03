import random from './random';

const title = document.querySelector('.section--welcome .section__title');

setInterval(() => {
    title.innerHTML = random();
}, 5000);

if (module.hot) {
    module.hot.accept();
}
