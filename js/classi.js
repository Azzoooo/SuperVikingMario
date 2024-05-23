class Background {
	constructor(image) {
		this.position = {
			x: 0,
			y: 0
		};
		this.image = image;

		this.height = canvas.height;
		// this.width = image.width * canvas.width / canvas.height;
		this.width = 25000;
	}

	draw() {
		c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
}

class Player {
	constructor({position, velocity, image, frameRate, frameBuffer, scale = 1.5}) {
		this.scale = scale;

		this.position = position;
		this.velocity = velocity;
		this.width = 78;
		this.height = 58;

		this.frameRate = frameRate;
		this.image = image;

		this.currentFrame = 0;
		this.frameBuffer = frameBuffer;
		this.elapsedFrame = 0;
		
		this.hitbox = {
			position: {
				x: this.position.x + 20,
				y: this.position.y + 20
			},
			width: 45,
			height: 45
		};
	}

	draw() {
		// c.fillStyle = 'rgba(0, 0, 255, 0.2)';
		// c.fillRect(this.position.x, this.position.y, this.width * this.scale, this.height * this.scale);
		
		const cropBox = {
			position: {
				x: this.currentFrame * (this.image.width / this.frameRate),
				y: 0
			},
			width: this.width,
			height: this.height
		}
		
		c.drawImage(
			this.image,
			cropBox.position.x,
			cropBox.position.y,
			cropBox.width,
			cropBox.height,
			this.position.x,
			this.position.y,
			this.width * this.scale,
			this.height * this.scale,
			this.hitbox
		);
	}

	update() {
		this.draw();
		this.updateFrame();
		
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;

		this.hitbox = {
			position: {
				x: this.position.x + 20,
				y: this.position.y + 20
			},
			width: 45,
			height: 45
		}

		// c.fillStyle = 'rgba(255, 0, 0, 0.2)';
		// c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
		
		this.velocity.y += gravity;
	}

	updateFrame() {
		this.elapsedFrame ++;

		if(this.elapsedFrame % this.frameBuffer == 0) {
			if(this.currentFrame < this.frameRate - 1) {
				this.currentFrame ++;
			} else {
				this.currentFrame = 0;
			}
		}
	}
}


class VelocitySprites {
	constructor({position, dimentions, velocity, image}) {
		this.position = position;

		this.image = image;
		this.velocity = velocity;
		this.width = dimentions.x;
		this.height = dimentions.y;
	}

	draw() {
		c.drawImage(this.image,  this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();
		
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;

		this.velocity.y += gravity;
	}
}

class NotVelocitySprites {
	constructor({position, dimentions, image}) {
		this.position = position;

		this.image = image;
		this.width = dimentions.x;
		this.height = dimentions.y;
	}
	
	draw() {
		c.drawImage(this.image,  this.position.x, this.position.y, this.width, this.height);
	}
}