const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("closeBtn");

// Lista plików do załadowania
const imageFiles = [
  "1.jpg", "2.jpg", "3.jpg",
  "4.jpg", "5.jpg", "6.jpg",
  "7.jpg", "8.jpg", "9.jpg"
];

// Lazy loading z użyciem Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      fetch(img.dataset.src)
        .then(res => res.blob())
        .then(blob => {
          img.src = URL.createObjectURL(blob);
        });
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: "50px",
  threshold: 0.1
});

// Tworzenie miniatur
imageFiles.forEach(filename => {
  const img = document.createElement("img");
  img.dataset.src = `images/${filename}`;
  img.alt = filename;
  img.loading = "lazy";
  img.addEventListener("click", () => openModal(img.src));
  gallery.appendChild(img);
  observer.observe(img);
});

// Modal
function openModal(src) {
  modal.classList.remove("hidden");
  modalImg.src = src;
}

function closeModal() {
  modal.classList.add("hidden");
  modalImg.src = "";
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
