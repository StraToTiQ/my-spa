
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
function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Gallery</h1>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <img src="https://via.placeholder.com/150" alt="Image 1" loading="lazy" style="width:100%">
            <img src="https://via.placeholder.com/150" alt="Image 2" loading="lazy" style="width:100%">
            <img src="https://via.placeholder.com/150" alt="Image 3" loading="lazy" style="width:100%">
            <img src="https://via.placeholder.com/150" alt="Image 4" loading="lazy" style="width:100%">
            <img src="https://via.placeholder.com/150" alt="Image 5" loading="lazy" style="width:100%">
            <img src="https://via.placeholder.com/150" alt="Image 6" loading="lazy" style="width:100%">
        </div>
    `;
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