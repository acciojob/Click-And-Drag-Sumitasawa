const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Get container boundaries
let containerRect = container.getBoundingClientRect();

// Arrange cubes in grid
cubes.forEach((cube, index) => {
  cube.style.position = "absolute";

  const col = index % 4;
  const row = Math.floor(index / 4);

  cube.style.left = `${col * 100}px`;
  cube.style.top = `${row * 100}px`;

  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;

    const cubeRect = cube.getBoundingClientRect();

    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    document.addEventListener("mousemove", dragCube);
    document.addEventListener("mouseup", dropCube);
  });
});

function dragCube(e) {
  if (!activeCube) return;

  // Compute new position
  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundaries
  x = Math.max(0, Math.min(x, containerRect.width - activeCube.offsetWidth));
  y = Math.max(0, Math.min(y, containerRect.height - activeCube.offsetHeight));

  activeCube.style.left = `${x}px`;
  activeCube.style.top = `${y}px`;
}

function dropCube() {
  activeCube = null;
  document.removeEventListener("mousemove", dragCube);
  document.removeEventListener("mouseup", dropCube);
}
