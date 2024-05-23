addEventListener('keydown', ({key}) => {
	switch(key){
		case 'w':
			if(player.velocity.y == 0 && player ) {
				player.velocity.y = -13;
			}
			break;
		case 'a':
			keys.a.pressed = true;
			lastkey = 'a';
			player.frameRate = 8;
			player.image = playerRunLeft;
			break;
		case 'd':
			keys.d.pressed = true;
			lastkey = 'd';
			player.frameRate = 8;
			player.image = playerRunRight;
			break;
	}
});

addEventListener('keyup', ({key}) => {
	switch(key){
		case 'a':
			keys.a.pressed = false;
            lastkey = 'd';
			player.frameRate = 11;
			player.image = playerStandLeft;
			break;
		case 'd':
			keys.d.pressed = false;
			lastkey = 'a';
			player.frameRate = 11;
			player.image = playerStandRight;
			break;
	}
});