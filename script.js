const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = "TVTPkNTMNgybyMaTShWtCmZRAtLP2y0wDbCKtD3TV8I";
// const apiKey = "vm1iMYbcJUknVTZ6WzcSW0VW_EP5GbH6gjWLj7YXm_M";
const query = 'Travel'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    // if (totalImages){
    if(totalImages === imagesLoaded){
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in phtosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        // create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //  Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error
    } 
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    // const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // if (clientHeight + scrollTop >= scrollHeight - 5) {
    // }
    ready = false;
    getPhotos();
    }
});
// On Load
getPhotos();