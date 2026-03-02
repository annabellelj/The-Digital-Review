const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");
const commentCount = document.getElementById("comment-count");
const nameInput = document.getElementById("comment-name");
const commentInput = document.getElementById("comment-text");
const heroCarousel = document.getElementById("hero-carousel");
const heroImage = document.getElementById("hero-image");
const heroCaption = document.getElementById("hero-caption");
const heroDots = document.getElementById("hero-dots");
const heroPrev = document.getElementById("hero-prev");
const heroNext = document.getElementById("hero-next");

const heroSlides = [
  {
    src: "./Screenshot 2026-03-02 at 12.47.00 PM.png",
    alt: "Comparison figure showing marching cubes, NDCx, and the paper's method on low- and high-resolution signed distance field grids.",
    caption:
      "Comparison figure from Sellán, Batty, and Stein, “Reach for the Spheres: Tangency-Aware Surface Reconstruction of SDFs,” presented at SIGGRAPH Asia 2023.",
  },
  {
    src: "./Screenshot 2026-03-02 at 12.49.32 PM.png",
    alt: "Diagram showing sphere constraints for valid and invalid surface reconstructions.",
    caption:
      "Constraint illustration from Sellán, Batty, and Stein, “Reach for the Spheres: Tangency-Aware Surface Reconstruction of SDFs.”",
  },
  {
    src: "./Screenshot 2026-03-02 at 12.49.51 PM.png",
    alt: "Diagram showing tangency violations and how the flow corrects them.",
    caption:
      "Flow and tangency diagram from Sellán, Batty, and Stein, “Reach for the Spheres: Tangency-Aware Surface Reconstruction of SDFs.”",
  },
  {
    src: "./Screenshot 2026-03-02 at 12.50.03 PM.png",
    alt: "Comparison figure showing marching squares, marching cubes, and the paper's method on two examples.",
    caption:
      "Additional comparison figure from Sellán, Batty, and Stein, “Reach for the Spheres: Tangency-Aware Surface Reconstruction of SDFs.”",
  },
];

let heroIndex = 0;

function updateCommentCount() {
  commentCount.textContent = String(commentList.children.length);
}

function renderHeroSlide(index) {
  const slide = heroSlides[index];
  if (!slide) return;

  heroImage.src = slide.src;
  heroImage.alt = slide.alt;
  heroCaption.textContent = slide.caption;

  Array.from(heroDots.children).forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
    dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
  });
}

function moveHeroSlide(direction) {
  heroIndex = (heroIndex + direction + heroSlides.length) % heroSlides.length;
  renderHeroSlide(heroIndex);
}

function buildHeroDots() {
  heroSlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to image ${index + 1}`);
    dot.addEventListener("click", () => {
      heroIndex = index;
      renderHeroSlide(heroIndex);
    });
    heroDots.appendChild(dot);
  });
}

function formatTimestamp() {
  return "Just now";
}

function createComment(name, text) {
  const comment = document.createElement("article");
  comment.className = "comment";
  comment.innerHTML = `
    <div class="comment-head">
      <strong></strong>
      <span>${formatTimestamp()}</span>
    </div>
    <p></p>
  `;

  comment.querySelector("strong").textContent = name;
  comment.querySelector("p").textContent = text;

  return comment;
}

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const text = commentInput.value.trim();
  if (!name || !text) return;

  const comment = createComment(name, text);
  commentList.prepend(comment);
  commentForm.reset();
  updateCommentCount();
  nameInput.focus();
});

heroPrev.addEventListener("click", () => moveHeroSlide(-1));
heroNext.addEventListener("click", () => moveHeroSlide(1));
heroCarousel.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveHeroSlide(-1);
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveHeroSlide(1);
  }
});

buildHeroDots();
renderHeroSlide(heroIndex);
updateCommentCount();
