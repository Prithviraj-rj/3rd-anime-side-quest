/** @type {HTMLCanvasElement} */
const screen = document.getElementById("screen");
// const screenHeight = window.innerHeight * 0.95;
// const screenWidth = window.innerWidth * 0.95;
const screenHeight = 900;
const screenWidth = 900;
const zDash = 0.3; // obserevers z coordinate sitting on z axis
screen.width = screenWidth;
screen.height = screenHeight;
const radious = 5;

/** @type {CanvasRenderingContext2D} */
const ctx = screen.getContext("2d");

function clear() {
  ctx.fillStyle = "rgb(0, 14, 14)";
  ctx.fillRect(0, 0, screenWidth, screenHeight);
}

// ctx.fillRect(0, 0, screenWidth * 0.5, screenHeight * 0.5);
function Point({ x, y }, color = "rgb(0, 128, 128)") {
  // console.log(x, y);
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(x, y, radious, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}
x_max = screenWidth / 2;
y_max = screenHeight / 2;
// 675 225
// Point(toScreenPoint({ x: -1, y: 1 }));

// Point({ x: 300, y: 0 });
// Point({ x: x_max, y: y_max });
// Point({ x: x_max, y: -y_max });
// Point({ x: -x_max, y: y_max });
// Point({ x: -x_max, y: -y_max });

function toScreenPoint(p) {
  return {
    x: ((p.x + 1) / 2) * screenWidth,
    y: (1 - (p.y + 1) / 2) * screenHeight,
  };
}
function line(p1, p2, color = "rgb(0, 128, 128)") {
  console.log("drawining line .. for ", p1, p2);
  ctx.beginPath();

  ctx.moveTo(p1.x, p1.y);
  ctx.strokeStyle = color;
  ctx.lineTo(p2.x, p2.y);
  ctx.lineWidth = 2;
  ctx.stroke();
}
line({ x: 0, y: 0 }, { x: x_max, y: y_max });

vs = [
  { x: 0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
  { x: -0.5, y: 0.5, z: -0.5 },
  { x: -0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },
  { x: -0.5, y: -0.5, z: -0.5 },
  { x: -0.5, y: -0.5, z: 0.5 },
];
fs = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [5, 1],
  [6, 2],
  [7, 3],
  [8, 4],
];

function projection({ x, y, z }) {
  return { x: (zDash * x) / (zDash - z), y: (zDash * y) / (zDash - z) };
}

const colors = [
  "rgb(32, 255, 2)", // Index 0
  "rgba(255, 99, 132, 0.8)", // Index 1
  "rgba(54, 162, 235, 0.8)", // Index 2
  "rgba(255, 206, 86, 0.8)", // Index 3
  "rgba(75, 192, 192, 1.0)", // Index 4
  "rgb(255, 255, 255)", // Index 5
  "rgba(255, 159, 64, 1)", // Index 6
  "rgb(243, 3, 3)", // Index 7
];
function frame(vs, fs) {
  for (i = 0; i < vs.length; ++i) {
    const alpha = (i + 1) / 8;
    Point(toScreenPoint(projection(vs[i])), (color = colors[i]));
  }
  for (f of fs) {
    for (k = 0; k < f.length; ++k) {
      console.log(k, f);
      const a = vs[f[k] - 1];
      const b = vs[f[(k + 1) % f.length] - 1];
      console.log(a, b);
      line(toScreenPoint(projection(a)), toScreenPoint(projection(b)));
      // pass;
    }
  }
}

function axis() {
  line(
    toScreenPoint(projection({ x: 0, y: 0, z: 0.9 })),
    toScreenPoint(projection({ x: 0, y: 0, z: -0.9 })),
    // (color = colors[1]),
  );
  line(
    toScreenPoint(projection({ x: 0.9, y: 0, z: 0 })),
    toScreenPoint(projection({ x: -0.9, y: 0, z: 0 })),
    // (color = colors[2]),
  );
  line(
    toScreenPoint(projection({ x: 0, y: 0.9, z: 0 })),
    toScreenPoint(projection({ x: 0, y: -0.9, z: 0 })),
    // (color = colors[3]),
  );
}

Point(toScreenPoint(projection({ x: 0.5, y: 0.5, z: 0 })));
// Point(toScreenPoint({ x: -1, y: 0 }));
// clear();
axis();
frame(vs, fs);
// Point(toScreenPoint({ x: 0.5, y: 0.5 }));
// let y = 0;
// const ballSpeed = 480;
// let direction = 1;
// const FPS = 24;
// let dy = ballSpeed / FPS;
// const SPF = 1000 / FPS;
// let timePassed = 0;
// let lastRenderTime = 0;

// function movePoint(currentTime) {
//   requestAnimationFrame(movePoint);

//   timePassed = currentTime - lastRenderTime;
//   if (timePassed <= SPF) {
//     return;
//   }
//   lastRenderTime = currentTime;
//   console.log("rendered");

//   if (y > -radious + screenHeight / 2 || y < radious - screenHeight / 2) {
//     direction = -direction;
//   }
//   y += dy * direction;
//   clear();
//   Point({ x: 0, y: y });
// }

// movePoint(0);
