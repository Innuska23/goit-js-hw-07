import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
const galleryList = galleryItems.map(({ preview, original, description }) => {
    const divEl = document.createElement('div');
    const imgEl = document.createElement('img');
    const linkEl = document.createElement('a');

    divEl.classList.add('gallery__item');
    imgEl.classList.add('gallery__image');
    linkEl.classList.add('gallery__link');
    linkEl.href = original;
    imgEl.src = preview;
    imgEl.alt = description;
    imgEl.dataset.source = preview;
    imgEl.dataset.loading = "lazy";

    linkEl.append(imgEl);
    divEl.append(linkEl);
    return divEl;
});

const gallery = document.querySelector('.gallery');
gallery.append(...galleryList);

gallery.addEventListener("click", handleGalleryClick);

function handleGalleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") {
        return;
    }
    const instance = basicLightbox.create(
        `<img src=${event.target.parentElement.href}>`,
        {
            onShow: () => {
                window.addEventListener('keydown', onKeydownEscape.bind(instance));
            },
        }
    );
    instance.show();
}

function onKeydownEscape(event) {
    if (event.code === 'Escape') {
        this.close();
    }
};
