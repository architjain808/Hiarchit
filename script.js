document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  let currentSectionIndex = 0;
  let isScrolling = false;

  function changeSections(direction) {
    if (isScrolling) return;
    isScrolling = true;

    // Remove active class from current section
    sections[currentSectionIndex].classList.remove("active");

    // Update section index based on scroll direction
    if (direction === "down") {
      currentSectionIndex = (currentSectionIndex + 1) % sections.length;
    } else {
      currentSectionIndex =
        (currentSectionIndex - 1 + sections.length) % sections.length;
    }

    // Add active class to new section
    sections[currentSectionIndex].classList.add("active");

    // Prevent multiple scrolls
    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }

  // Wheel event for scrolling
  window.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        changeSections("down");
      } else {
        changeSections("up");
      }
    },
    { passive: false }
  );

  // Touch events for mobile support
  let touchStartY = 0;

  window.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY;
  });

  window.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault();
    },
    { passive: false }
  );

  window.addEventListener("touchend", (event) => {
    const touchEndY = event.changedTouches[0].clientY;
    if (touchStartY > touchEndY) {
      changeSections("down");
    } else {
      changeSections("up");
    }
  });
});
