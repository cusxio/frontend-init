import random from './random';

const title = document.querySelector('.section--welcome .section__title');

setInterval(() => {
    title.innerHTML = random();
}, 5000);

// https://webpack.github.io/docs/hot-module-replacement.html
if (module.hot) {
    module.hot.accept();
}
