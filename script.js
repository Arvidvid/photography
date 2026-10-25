const container = document.getElementById("galleries");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const closeButton = document.getElementById("close");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");


let currentGallery = [];
let currentIndex = 0;


fetch("galleries.json")

    .then(response => response.json())

    .then(galleries => {

        galleries.forEach(gallery => {

            const section = document.createElement("section");

            section.className = "gallery";


            const title = document.createElement("h2");

            title.className = "gallery-title";

            title.textContent = gallery.title.toUpperCase();


            const grid = document.createElement("div");

            grid.className = "photo-grid";


            gallery.photos.forEach((photo, index) => {

                const image = document.createElement("img");

                image.src = photo;

                image.className = "photo";

                image.loading = "lazy";

                image.addEventListener("click", () => {

                    openLightbox(
                        gallery.photos,
                        index
                    );

                });


                grid.appendChild(image);

            });


            section.appendChild(title);

            section.appendChild(grid);

            container.appendChild(section);

        });

    });


function openLightbox(gallery, index) {

    currentGallery = gallery;

    currentIndex = index;

    lightboxImage.src =
        currentGallery[currentIndex];

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


function nextImage() {

    currentIndex =
        (currentIndex + 1)
        % currentGallery.length;

    lightboxImage.src =
        currentGallery[currentIndex];

}


function previousImage() {

    currentIndex =
        (currentIndex - 1 + currentGallery.length)
        % currentGallery.length;

    lightboxImage.src =
        currentGallery[currentIndex];

}


closeButton.addEventListener(
    "click",
    closeLightbox
);


nextButton.addEventListener(
    "click",
    nextImage
);


previousButton.addEventListener(
    "click",
    previousImage
);


/* KEYBOARD CONTROLS */

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }

});