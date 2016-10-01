var horizontal_platforms;
var vertical_platforms;
var shrinkCount = 1;
var score = 0;
var speed = 750;

function loadPlayer(game){
	game.load.spritesheet('PlayerShip','assets/PlayerShip.png',140,193);
	game.load.spritesheet('PlayerShip_Side','assets/PlayerShip_Side.png',193,140);
}

function createPlatforms(game){
	createHorizontalPlatforms();
	createVerticalPlatforms();
}

function createHorizontalPlatforms(){
	horizontal_platforms = game.add.group();
	horizontal_platforms.enableBody = true;	
	horizontal_platforms.physicsBodyType = Phaser.Physics.ARCADE;	
	var horizontal_platform = horizontal_platforms.create(game.world.width/2-70,game.world.height-280,'PlayerShip');
	horizontal_platform.immovable = true;
	horizontal_platform.body.collideWorldBounds = true;
	horizontal_platform.animations.add('normal',[0,1,2,3,4,5],10,true);
	horizontal_platform.animations.add('absorb',[6,7,8,9],10,false);
	horizontal_platform.play('normal');
}

function createVerticalPlatforms(){
	vertical_platforms = game.add.group();
	vertical_platforms.enableBody = true;	
	vertical_platforms.physicsBodyType = Phaser.Physics.ARCADE	
	var vertical_platform = vertical_platforms.create(400,game.world.height/2,'PlayerShip_Side');	
	vertical_platform.immovable = true;
	vertical_platform.body.collideWorldBounds = true;
	vertical_platform.animations.add('normal',[0,1,2,3,4,5],10,true);
	vertical_platform.animations.add('absorb',[6,7,8,9],10,false);
	vertical_platform.play('normal');
}

function updatePlatforms(game,cursors){	
	if(cursors.left.isDown){
		horizontal_platforms.forEachAlive(function(platform){
			if(platform.body.position.x >= 600){
				platform.body.velocity.x = -speed;
			}else{
				platform.body.velocity.x = 0;
			}
		});
		vertical_platforms.forEachAlive(function(platform){
			platform.body.velocity.y = 0;
		});
	}else if(cursors.right.isDown){
		horizontal_platforms.forEachAlive(function(platform){
			if(platform.body.position.x <= game.world.width - 300){
				platform.body.velocity.x = speed;
			}else{
				platform.body.velocity.x = 0;
			}
		});
		vertical_platforms.forEachAlive(function(platform){
			platform.body.velocity.y = 0;
		});
	}else if(cursors.up.isDown){
		vertical_platforms.forEachAlive(function(platform){
			if(platform.body.position.y >= 200){
				platform.body.velocity.y = -speed;
			}else{
				platform.body.velocity.y = 0;
			}
		});
		horizontal_platforms.forEachAlive(function(platform){
			platform.body.velocity.x = 0;
		});
	}else if(cursors.down.isDown){
		vertical_platforms.forEachAlive(function(platform){
			if(platform.body.position.y <= game.world.height - 400){
			platform.body.velocity.y = speed;
			}else{
				platform.body.velocity.y = 0;
			}
		});
		horizontal_platforms.forEachAlive(function(platform){
			platform.body.velocity.x = 0;
		});
	}else{
		horizontal_platforms.forEachAlive(function(platform){			
			platform.body.velocity.x = 0;
		});
		vertical_platforms.forEachAlive(function(platform){			
			platform.body.velocity.y = 0;
		});
	}	
	game.physics.arcade.overlap(missileGroup, vertical_platforms, KillProjectile, null, this);
	game.physics.arcade.overlap(bombGroup, horizontal_platforms, KillProjectile, null, this);
	game.physics.arcade.overlap(comboMissileBombGroup, horizontal_platforms, KillProjectile, null, this);
	game.physics.arcade.overlap(comboMissileBombGroup, vertical_platforms, KillProjectile, null, this);
}

function KillProjectile(projectile,platform){
	projectile.kill();
	score += 100;
	text.setText("SCORE:"+score);	
	platform.play('absorb');
	platform.events.onAnimationComplete.add(function(platform){platform.play('normal')},this);
}

function increasePlayerSpeed(){
		speed += 50;
}

function decreasePlayerSpeed(){	
		speed -= 50;	
}