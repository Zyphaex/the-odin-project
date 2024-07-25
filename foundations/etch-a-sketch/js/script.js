document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  let isMouseDown = false;

  document.addEventListener("mousedown", function () {
    isMouseDown = true;
  });

  document.addEventListener("mouseup", function () {
    isMouseDown = false;
  });

  for (let i = 0; i < 16 * 16; i++) {
    const square = document.createElement("div");
    square.className = "square";
    square.style.backgroundColor = "black";
    square.style.border = "1px solid white";

    square.addEventListener("mousedown", function () {
      toggleColor(square);
    });

    square.addEventListener("mouseover", function () {
      if (isMouseDown) {
        toggleColor(square);
      }
    });

    container.appendChild(square);
  }

  function toggleColor(element) {
    element.style.backgroundColor = "gray";
  }
});
