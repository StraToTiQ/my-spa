
let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery'
};

function OnStartUp() {
    popStateHandler();
}

OnStartUp();

// --- Obsługa nawigacji (About) ---
document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

// --- Obsługa nawigacji (Contact) ---
document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

// --- Obsługa nawigacji---
if(document.querySelector('#gallery-link')){
    document.querySelector('#gallery-link').addEventListener('click', (event) => {
        let stateObj = { page: 'gallery' };
        document.title = 'Gallery';
        history.pushState(stateObj, "gallery", "?gallery");
        RenderGalleryPage();
    });
}

// --- Funkcje Renderujące ---

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">About Me</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Contact with me</h1>
        <form id="contact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            
            <button type="submit">Send</button>
        </form>`;

    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');
    });
}

// Implementacja Galerii
async function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Gallery</h1>
        <div id="gallery-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <p style="grid-column: 1 / -1;">Loading images...</p>
        </div>
    `;

    const galleryContainer = document.getElementById('gallery-container');
    
    const imageUrls = [
        'https://picsum.photos/300/200?random=1',
        'https://picsum.photos/300/200?random=2',
        'https://picsum.photos/300/200?random=3',
        'https://picsum.photos/300/200?random=4',
        'https://picsum.photos/300/200?random=5',
        'https://picsum.photos/300/200?random=6'
    ];

    galleryContainer.innerHTML = '';

    imageUrls.forEach(async (url, index) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);
            const img = document.createElement('img');
            img.src = objectURL;
            img.alt = `Image ${index + 1}`;
            img.style.width = '100%';
            img.style.borderRadius = '5px';
            
            img.loading = 'lazy'; 

            img.style.cursor = 'pointer';
            img.addEventListener('click', () => openModal(objectURL));

            galleryContainer.appendChild(img);
        } catch (error) {
            console.error('Błąd ładowania obrazka:', error);
        }
    });
}

function openModal(imageSrc) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    modal.innerHTML = `
        <div style="position: relative;">
            <img src="${imageSrc}" style="max-width: 90%; max-height: 90vh; border-radius: 8px;">
            <button id="close-modal" style="position: absolute; top: -40px; right: 0; color: white; background: none; border: none; font-size: 2rem; cursor: pointer;">&times;</button>
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'close-modal') {
            document.body.removeChild(modal);
        }
    });

    document.body.appendChild(modal);
}

// --- Obsługa Historii Przeglądarki ---
function popStateHandler() {
    let loc = window.location.search; 

    if (loc === '?contact') {
        RenderContactPage();
    } else if (loc === '?about') {
        RenderAboutPage();
    } else if (loc === '?gallery') {
        RenderGalleryPage();
    } else {
        document.querySelector('main').innerHTML = '<h1 class="title">Hello World!</h1><p>Welcome to SPA.</p>';
    }
}

window.onpopstate = popStateHandler;

// --- Przełącznik Motywu ---
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});