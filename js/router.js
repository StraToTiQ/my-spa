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