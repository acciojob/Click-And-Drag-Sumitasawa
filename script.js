const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Store container boundary box
let containerRect = container.getBoundingClientRect();

// Position cubes in a simple grid layout (absolute)
cubes.forEach((cube, index) => {
  cube.style.position = "absolute";

  const col = index % 4;
  const row = Math.floor(index / 4);

  cube.style.left = `${col * 110}px`;
  cube.style.top = `${row * 110}px`;

  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;

    const cubeRect = cube.getBoundingClientRect();

    // mouse position inside cube
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    // Add event listeners on document (for smooth dragging)
    document.addEventListener("mousemove", dragCube);
    document.addEventListener("mouseup", dropCube);
  });
});

function dragCube(e) {
  if (!activeCube) return;

  // Calculate new cube position
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundaries
  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - activeCube.offsetWidth));
  newTop = Math.max(0, Math.min(newTop, containerRect.height - activeCube.offsetHeight));

  // Set position
  activeCube.style.left = `${newLeft}px`;
  activeCube.style.top = `${newTop}px`;
}

function dropCube() {
  activeCube = null;
  document.removeEventListener("mousemove", dragCube);
  document.removeEventListener("mouseup", dropCube);
}
