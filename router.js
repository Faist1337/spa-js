let pageUrls = {
  about: '?about',
  contact: '?contact',
  gallery: '?gallery'
};

function OnStartUp() {
  popStateHandler();
}

function popStateHandler() {
  let loc = window.location.search;

  if (loc === pageUrls.contact) { 
    RenderContactPage(); 
  }
  else if (loc === pageUrls.about) { 
    RenderAboutPage(); 
  }
  else if (loc === pageUrls.gallery) { 
    RenderGalleryPage(); 
  }
  else {
    // Domyślna strona, np. About
    RenderAboutPage();
  }
}

document.querySelector('#about-link').addEventListener('click', (event) => {
  event.preventDefault();
  let stateObj = { page: 'about' };
  document.title = 'About';
  history.pushState(stateObj, "about", "?about");
  RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', (event) => {
  event.preventDefault();
  let stateObj = { page: 'contact' };
  document.title = 'Contact';
  history.pushState(stateObj, "contact", "?contact");
  RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', (event) => {
  event.preventDefault();
  let stateObj = { page: 'gallery' };
  document.title = 'Gallery';
  history.pushState(stateObj, "gallery", "?gallery");
  RenderGalleryPage();
});

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

function RenderGalleryPage() {
  document.querySelector('main').innerHTML = `
    <h1 class="title">Gallery</h1>
    <div class="gallery-grid">
      <img data-src="img1.jpg" class="lazy gallery-img" alt="Image 1">
      <img data-src="img2.jpg" class="lazy gallery-img" alt="Image 2">
      <img data-src="img3.jpg" class="lazy gallery-img" alt="Image 3">
      <img data-src="img4.jpg" class="lazy gallery-img" alt="Image 4">
      <img data-src="img5.jpg" class="lazy gallery-img" alt="Image 5">
      <img data-src="img6.jpg" class="lazy gallery-img" alt="Image 6">
      <img data-src="img7.jpg" class="lazy gallery-img" alt="Image 7">
      <img data-src="img8.jpg" class="lazy gallery-img" alt="Image 8">
      <img data-src="img9.jpg" class="lazy gallery-img" alt="Image 9">
    </div>
    <div id="modal" class="modal hidden">
      <span id="modal-close" class="modal-close">✖</span>
      <img id="modal-img" class="modal-img" src="" alt="Full image">
    </div>
  `;

  initLazyLoad();
  initModal();
}

window.onpopstate = popStateHandler;

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Lazy loading
function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img.lazy');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        obs.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => observer.observe(img));
}

// Modal image
function initModal() {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.getElementById('modal-close');

  document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modalImg.src = img.src;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalImg.src = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modalImg.src = '';
    }
  });
}

OnStartUp();
