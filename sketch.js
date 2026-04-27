bubbles = [];
canvas_width = 600;
canvas_height = 600;

class Bubble {
  constructor(
    radius,
    direction = null,
    bubbleX,
    bubbleY,
    speed,
    color = "#d92e3c",
    opacity = 1
  ) {
    this.bubbleId = this.generateBubbleId();

    this.setRadius(radius);
    this.setDirection(direction);
    this.setBubbleX(bubbleX);
    this.setBubbleY(bubbleY);
    this.setSpeed(speed);
    this.setColor(color);
    this.setOpacity(opacity);
  }

  // Auto-generate 5-character alphanumeric ID
  generateBubbleId() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  }

  // Random direction generator
  getRandomDirection() {
    const validDirections = [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
    ];

    return validDirections[Math.floor(Math.random() * validDirections.length)];
  }

  getBubbleId() {
    return this.bubbleId;
  }

  getRadius() {
    return this.radius;
  }

  setRadius(radius) {
    if (radius <= 0) {
      throw new Error("Bubble radius must be greater than 0.");
    }

    this.radius = radius;
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction) {
    const validDirections = [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
    ];

    if (!direction) {
      this.direction = this.getRandomDirection();
      return;
    }

    if (!validDirections.includes(direction)) {
      throw new Error(
        `Invalid direction. Allowed values: ${validDirections.join(", ")}`
      );
    }

    this.direction = direction;
  }

  getBubbleX() {
    return this.bubbleX;
  }

  setBubbleX(bubbleX) {
    this.bubbleX = bubbleX;
  }

  getBubbleY() {
    return this.bubbleY;
  }

  setBubbleY(bubbleY) {
    this.bubbleY = bubbleY;
  }

  getSpeed() {
    return this.speed;
  }

  setSpeed(speed) {
    if (speed < 0) {
      throw new Error("Bubble speed cannot be negative.");
    }

    this.speed = speed;
  }

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color || "lightblue";
  }

  getOpacity() {
    return this.opacity;
  }

  setOpacity(opacity) {
    if (opacity < 0 || opacity > 1) {
      throw new Error("Opacity must be between 0 and 1.");
    }

    this.opacity = opacity;
  }
}
function setup() {
  createCanvas(canvas_width, canvas_height);
  console.log("draw");
}

function mouseClicked() {
  console.log("clicked at mouseX:" + mouseX + " mouseY:" + mouseY);
  bubbles.push(new Bubble(20, null, mouseX, mouseY, 4));
}

function draw() {
  background(220);
  console.log("draw");
  bubbles.forEach((bubble) => {
    direction = bubble.getDirection();
    console.log(direction)
    bubbleX = bubble.getBubbleX();
    bubbleY = bubble.getBubbleY();
    if (direction === "top-right") {
      bubbleX++;
      bubbleY--;
      if(isTopWallHit(bubbleY, bubble.getRadius())){
        bubble.setDirection("bottom-right");
      }

      if(isRightWallHit(bubbleX, bubble.getRadius())){
        bubble.setDirection("top-left");
      }
    } else if (direction === "top-left") {
      bubbleX--;
      bubbleY--;
      if(isTopWallHit(bubbleY, bubble.getRadius())){
        bubble.setDirection("bottom-left");
      }

      if(isLeftWallHit(bubbleX, bubble.getRadius())){
        bubble.setDirection("top-right");
      }
    } else if (direction === "bottom-left") {
      bubbleX--;
      bubbleY++;
      if(isBottomWallHit(bubbleY, bubble.getRadius())){
        bubble.setDirection("top-left");
      }

      if(isLeftWallHit(bubbleX, bubble.getRadius())){
        bubble.setDirection("bottom-right");
      }
    } else if (direction === "bottom-right") {
      bubbleX++;
      bubbleY++;
      if(isBottomWallHit(bubbleY, bubble.getRadius())){
        bubble.setDirection("top-right");
      }

      if(isRightWallHit(bubbleX, bubble.getRadius())){
        bubble.setDirection("bottom-left");
      }
    }
    
    bubble.setBubbleX(bubbleX);
    bubble.setBubbleY(bubbleY);
    handleBubbleCollision();
    fill(bubble.getColor());
    circle(bubbleX, bubbleY, bubble.getRadius()*2);
  });
}

function isLeftWallHit(bubbleX, bubble_radius){
  return (bubbleX-bubble_radius <=0);
}

function isRightWallHit(bubbleX, bubble_radius){
  return (bubbleX+bubble_radius >=canvas_width);
}

function isTopWallHit(bubbleY, bubble_radius){
  return (bubbleY-bubble_radius <=0);
}

function isBottomWallHit(bubbleY, bubble_radius){
  return (bubbleY+bubble_radius >=canvas_height);
}

function handleBubbleCollision() {
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      let b1 = bubbles[i];
      let b2 = bubbles[j];

      let dx = b1.getBubbleX() - b2.getBubbleX();
      let dy = b1.getBubbleY() - b2.getBubbleY();

      let distance = Math.sqrt(dx * dx + dy * dy);

      let minDistance = b1.getRadius() + b2.getRadius();

      if (distance <= minDistance) {
        // Simple collision response → swap directions
        let tempDirection = b1.getDirection();
        b1.setDirection(b2.getDirection());
        b2.setDirection(tempDirection);
      }
    }
  }
}
