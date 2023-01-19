const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const count = 30;
const apiKey = 'YorbQQPFUqTES8Dgm5DvoSJqKiMd-ozmmKz9Q-WPmLE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //  Run function for each object in photos array
    photosArray.forEach((photo) => {
       // Create <a> to link to unsplash
       const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });
       // Create <img> for photo
       const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
       // Put <img> inside <a>, then put both inside imageContainer Element
       item.appendChild(img);
       imageContainer.appendChild(item);
    } );
    
    
}

// Get Photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    }catch(error) {
        // Catch Error here
    }
}

// Check to see if scrolling near bottom of page, if yes Load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On load
getPhotos();