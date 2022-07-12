// require("dotenv").config();
// console.log(process.env.API_KEY);

const sprite = {
  x: 0,
  y: 0,
};

function move(dx, dy) {
  this.x += dx;
  this.y += dy;

  function log() {
    console.log(`New Position: (${this.x}, ${this.y})`);
  }

  log = log.bind(this);

  log();
}

move.call(sprite, 25, 20); // New Position: (25, 20)

// move.apply(sprite, [25, 20]); // New Position: (50, 40)

// const moveSprite = move.bind(sprite);

// moveSprite(25, 20); // "New Position: (70, 60)"

/* function someFunction() {
    const 
}

const arr = [2, 4, 6, 8, 10];

const multiplier = 2;

const arr2 = arr.map((num) => {
  return num * multiplier;
});

console.log(arr2);
 */
