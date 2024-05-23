const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = 64*9;
canvas.width = 64*16;




// definizione immagini

const playerStandRight = new Image();
playerStandRight.src = './img/king/IdleRight.png';

const playerStandLeft = new Image();
playerStandLeft.src = './img/king/IdleLeft.png';

const playerRunRight = new Image();
playerRunRight.src = './img/king/RunRight.png';

const playerRunLeft = new Image();
playerRunLeft.src = './img/king/RunLeft.png';



const backgroundImg = new Image();
backgroundImg.src = './img/background.png';



const grasslv1 = new Image();
grasslv1.src = './img/grasslv1.png';

const grasslv2 = new Image();
grasslv2.src = './img/grasslv2.png';

const grasslv3 = new Image();
grasslv3.src = './img/grasslv3.png';


const woodenSlab = new Image();
woodenSlab.src = './img/woodenSlab.png';



const morningStar = new Image();
morningStar.src = './img/morningStar.png';


const dagger = new Image();
dagger.src = './img/dagger.png';




// variabili e oggetti

const gravity = 0.6;
var player;
var background;
var obstacle1;
var obstacle2;
var platforms;
var keys = {
	w: {
		pressed: false
	},
	a: {
		pressed: false
	},
	d: {
		pressed: false
	},
	s: {
		pressed: false
	}
}
var lastkey;
var scrollOffset;
var platformFlag;
var spriteFlag;
var indicator = 0;




// azzeramento

function inizializzazione() {
	// player
	
	player = new Player({
		position: {
			x:100,
			y:100
		},
		velocity: {
			x:0,
			y:0
		},
		frameBuffer: 2,
		frameRate: 11,
		image: playerStandRight
	});

	
	// sfondo

	background = new Background(backgroundImg);


	// ostacoli

	obstacle1 = new NotVelocitySprites({
		position: {
			x:6*100,
			y:439.9
		},
		dimentions: {
			x:80,
			y:80
		},
		image: morningStar
	});

	obstacle2 = new VelocitySprites({
		position: {
			x:15*100,
			y:220
		},
		dimentions: {
			x:20,
			y:70
		},
		velocity: {
			x:0,
			y:0
		},
		image: dagger
	});


	// piattaforme

	platforms = [

        // primo blocco alto
        new NotVelocitySprites({
            position: {
                x:0*100,
                y:320
            },
            dimentions: {
                x:100,
                y:300
            },
            image: grasslv3
        }),

        new NotVelocitySprites({
            position: {
                x:1*100,
                y:320
            },
            dimentions: {
                x:100,
                y:300
            },
            image: grasslv3
        }),
        new NotVelocitySprites({
            position: {
                x:2*100,
                y:320
            },
            dimentions: {
                x:100,
                y:300
            },
            image: grasslv3
        }),

        // primo blocco medio
        new NotVelocitySprites({
            position: {
                x:5*100,
                y:420
            },
            dimentions: {
                x:100,
                y:200
            },
            image: grasslv2
        }),
        
        // prime piattaforme sospese
        new NotVelocitySprites({
            position: {
                x:7*100,
                y:320
            },
            dimentions: {
                x:100,
                y:40
            },
            image: woodenSlab
        }),

        new NotVelocitySprites({
            position: {
                x:9*100,
                y:220
            },
            dimentions: {
                x:100,
                y:40
            },
            image: woodenSlab
        }),
        new NotVelocitySprites({
            position: {
                x:10*100,
                y:220
            },
            dimentions: {
                x:100,
                y:40
            },
            image: woodenSlab
        }),

        // primo blocco basso
        new NotVelocitySprites({
            position: {
                x:6*100,
                y:520
            },
            dimentions: {
                x:100,
                y:100
            },
            image: grasslv1
        }),

        new NotVelocitySprites({
            position: {
                x:7*100,
                y:520
            },
            dimentions: {
                x:100,
                y:100
            },
            image: grasslv1
        }),

        new NotVelocitySprites({
            position: {
                x:8*100,
                y:520
            },
            dimentions: {
                x:100,
                y:100
            },
            image: grasslv1
        }),

        new NotVelocitySprites({
            position: {
                x:9*100,
                y:520
            },
            dimentions: {
                x:100,
                y:100
            },
            image: grasslv1
        }),

        // secondo blocco alto
        new NotVelocitySprites({
            position: {
                x:13*100,
                y:220
            },
            dimentions: {
                x:100,
                y:40
            },
            image: woodenSlab
        }),

        new NotVelocitySprites({
            position: {
                x:14*100,
                y:220
            },
            dimentions: {
                x:100,
                y:40
            },
            image: woodenSlab
        }),

        new NotVelocitySprites({
            position: {
                x:15*100,
                y:220
            },
            dimentions: {
                x:100,
                y:40
            },
            image: woodenSlab
        }),

        new NotVelocitySprites({
            position: {
                x:16*100,
                y:220
            },
            dimentions: {
                x:100,
                y:40
            },
            image: woodenSlab
        }),

        // secondo blocco medio
        new NotVelocitySprites({
            position: {
                x:10*100,
                y:420
            },
            dimentions: {
                x:100,
                y:200
            },
            image: grasslv2
        }),

        new NotVelocitySprites({
            position: {
                x:12*100,
                y:420
            },
            dimentions: {
                x:100,
                y:200
            },
            image: grasslv2
        }),

        new NotVelocitySprites({
            position: {
                x:13*100,
                y:420
            },
            dimentions: {
                x:100,
                y:200
            },
            image: grasslv2
        }),

        new NotVelocitySprites({
            position: {
                x:14*100,
                y:420
            },
            dimentions: {
                x:100,
                y:200
            },
            image: grasslv2
        }),

        new NotVelocitySprites({
            position: {
                x:15*100,
                y:420
            },
            dimentions: {
                x:100,
                y:200
            },
            image: grasslv2
        }),

        new NotVelocitySprites({
            position: {
                x:16*100,
                y:420
            },
            dimentions: {
                x:100,
                y:200
            },
            image: grasslv2
        }),

        // terzo blocco medio
        new NotVelocitySprites({
            position: {
                x:18*100,
                y:420
            },
            dimentions: {
                x:100,
                y:200
            },
            image: grasslv2
        }),

        // secondo blocco alto
        new NotVelocitySprites({
            position: {
                x:21*100,
                y:320
            },
            dimentions: {
                x:100,
                y:300
            },
            image: grasslv3
        }),
        new NotVelocitySprites({
            position: {
                x:22*100,
                y:320
            },
            dimentions: {
                x:100,
                y:300
            },
            image: grasslv3
        }),
        new NotVelocitySprites({
            position: {
                x:23*100,
                y:320
            },
            dimentions: {
                x:100,
                y:300
            },
            image: grasslv3
        }),
        new NotVelocitySprites({
            position: {
                x:24*100,
                y:320
            },
            dimentions: {
                x:100,
                y:300
            },
            image: grasslv3
        }),
        new NotVelocitySprites({
            position: {
                x:25*100,
                y:320
            },
            dimentions: {
                x:100,
                y:300
            },
            image: grasslv3
        }),
    ];


	// variabili di circostanza

	scrollOffset = 0;
}



// collision detectors

function platformControlPlayer() {
	var flag = 'null';
	platforms.forEach(platform => {
		if(
			player.hitbox.position.x + player.hitbox.width >= platform.position.x &&
			player.hitbox.position.x <= platform.position.x + platform.width &&
			player.hitbox.position.y + player.hitbox.height >= platform.position.y &&
			player.hitbox.position.y <= platform.position.y + platform.height
		) {
			// console.log("Ciao");
			if(player.hitbox.position.x + player.hitbox.width == platform.position.x) {
				flag = 'right';
			} else if(player.hitbox.position.x  == platform.position.x + platform.width) {
				flag = 'left';
			} else if(player.hitbox.position.y <= platform.position.y + platform.height && player.hitbox.position.y + player.hitbox.height >= platform.position.y) {
				flag = 'up';
			}
		}
	});
	return flag;
}

function platformControlObstacle() {
	var flag = 'null';
	platforms.forEach(platform => {
		if(
			obstacle1.position.x + obstacle1.width >= platform.position.x &&
			obstacle1.position.x <= platform.position.x + platform.width &&
			obstacle1.position.y + obstacle1.height >= platform.position.y &&
			obstacle1.position.y <= platform.position.y + platform.height
		) {
			// console.log("Ciao");
			if(obstacle1.position.x + obstacle1.width == platform.position.x) {
				flag = 'right';
			} else if(obstacle1.position.x  == platform.position.x + platform.width) {
				flag = 'left';
			} else if(obstacle1.position.y <= platform.position.y + platform.height && obstacle1.position.y + obstacle1.height >= platform.position.y) {
				flag = 'up';
			}
		}
	});
	return flag;
}

function spriteControl(obstacle) {
	var flag = false;

	if(
		player.hitbox.position.x + player.hitbox.width >= obstacle.position.x &&
		player.hitbox.position.x <= obstacle.position.x + obstacle.width &&
		player.hitbox.position.y + player.hitbox.height >= obstacle.position.y &&
		player.hitbox.position.y <= obstacle.position.y + obstacle.height
	) {
		// console.log("Ciao");
		flag = true;
	}

	return flag;
}




// animazione

function animazione() {
	// console.log(player.position.x);
	// console.log(scrollOffset);
	window.requestAnimationFrame(animazione);
	// c.fillStyle = 'white';
	// c.fillRect(0, 0, canvas.width, canvas.height);
	
	background.draw();
	
	obstacle1.draw();

	obstacle2.update();

	platforms.forEach((platform) => {
		platform.draw();
	});

	player.update();

	platformFlag = platformControlPlayer();
	// console.log(platformFlag);

	if((keys.d.pressed && lastkey == 'd' && player.hitbox.position.x < 500 || keys.d.pressed && scrollOffset == 1550 && player.hitbox.position.x < 980) && platformFlag != 'right') {
        player.velocity.x = 5;
    } else if((keys.a.pressed && lastkey == 'a' && player.hitbox.position.x > 300 || keys.a.pressed && scrollOffset == 0 && player.hitbox.position.x > 0) && platformFlag != 'left') {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;
        if(keys.d.pressed && scrollOffset < 1550 && platformFlag != 'right') {
            scrollOffset += 5;
            obstacle1.position.x -= 5;
            obstacle2.position.x -= 5;
            platforms.forEach((platform) => {
                platform.position.x -= 5;
            });
            background.position.x -= 1;
        } else if(keys.a.pressed && scrollOffset > 0 && platformFlag != 'left') {
            scrollOffset -= 5;
            obstacle1.position.x += 5;
            obstacle2.position.x += 5;
            platforms.forEach((platform) => {
                platform.position.x += 5;
            });
            background.position.x += 1;
        }
	}


	platforms.forEach((platform) => {
		if(
			player.hitbox.position.y + player.hitbox.height <= platform.position.y &&
			player.hitbox.position.y + player.hitbox.height + player.velocity.y >= platform.position.y &&
			player.hitbox.position.x + player.hitbox.width >= platform.position.x &&
			player.hitbox.position.x <= platform.position.x + platform.width
		){
			player.velocity.y = 0;
		}
	});

	platforms.forEach((platform) => {
		if(
			platformFlag == 'up' &&
			player.hitbox.position.y + player.hitbox.height >= platform.position.y &&
			player.hitbox.position.y <= platform.position.y + platform.height &&
			player.hitbox.position.x + player.hitbox.width >= platform.position.x &&
			player.hitbox.position.x <= platform.position.x + platform.width
		){
			player.velocity.y = gravity;
		}
	});

	platformFlag = platformControlObstacle();
	// console.log(platformFlag);
	// console.log(obstacle1.width);


	if(platformFlag == 'right') {
		indicator = 0;
	} else if(platformFlag == 'left') {
		indicator = 1;
	}
	if(indicator == 0) {
		obstacle1.position.x -= 5;
	} else if(indicator == 1) {
		obstacle1.position.x += 5;
	}

	if(obstacle2.position.y > canvas.height) {
		obstacle2.velocity.y = 0;
		obstacle2.position.y = 220;
	}
	
	if(player.hitbox.position.x >= 980) {
		alert("HAI VINTO !!!");
		keys.d.pressed = false;
		inizializzazione();
	}
	
	if(spriteControl(obstacle1) == true || spriteControl(obstacle2) == true) {
		inizializzazione();
	}

	if(player.position.y > canvas.height) {
		inizializzazione();
	}
}


inizializzazione();
animazione();