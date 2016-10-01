var powerUpGroup;

var originalDropSpeed;
var originalSideDropSpeed;

var powerUpDuration = 5;
var speedUpTxt = undefined;
var slowDownTxt = undefined;

var currentlySpeedingUp = false;
var currentlySpeedingDown = false;

function PowerupPreload(){
	game.load.image('speedUp','assets/SpeedUp_red.png');
	game.load.image('speedDown','assets/SlowDown.png');
	game.load.spritesheet('clear','assets/clearScreen.png',98,43);
	game.load.image('speedUpTxt','assets/SpeedUp_txt.png');
	game.load.image('slowDownTxt','assets/SlowDown_txt.png');
	game.load.spritesheet('ClearBox','assets/Flash_SPR.png',1920,1080);
}

function PowerupCreate(){
	powerUpGroup = game.add.group();
	powerUpGroup.enableBody = true;
	powerUpGroup.physicsBodyType = Phaser.Physics.ARCADE;

}

function StartPowerupSpawn(){
	game.time.events.loop(Phaser.Timer.SECOND, SpawnPowerup, this);
}

function PowerupUpdate(){
	game.physics.arcade.overlap(powerUpGroup, horizontal_platforms, FireOffPowerup, null, this);	
	game.physics.arcade.overlap(powerUpGroup, vertical_platforms, FireOffPowerup, null, this);
}

function FireOffPowerup(powerup, platform){


	if(powerup.powerType == "slow"){
		ActivateSpeedDown();
	}
	else if(powerup.powerType == "speed"){
		ActivateSpeedUp();
	}
	else if(powerup.powerType == "clear"){
		ActivateClearScreen();
	}
	powerup.kill();
}

function ActivateSpeedUp(){

	if(currentlySpeedingDown || currentlySpeedingUp)
		return;

	variableDropRate = baseFieldDropRate * 1.3;
	variableSideDropRate = sideBaseFieldDropRate * 1.3;
	game.time.events.add(Phaser.Timer.SECOND * powerUpDuration, resetSpeeds, this);
	
	if(slowDownTxt !== undefined){
		slowDownTxt.kill();
		slowDownTxt = undefined;
	}
	if(speedUpTxt !== undefined){
		speedUpTxt.kill();
		speedUpTxt = undefined;
	}
	speedUpTxt = game.add.sprite(game.world.centerX-114,game.world.centerY,'speedUpTxt');
	speedupSound.play();

}

function ActivateSpeedDown(){
	if(currentlySpeedingDown || currentlySpeedingUp)
		return;

	variableDropRate = baseFieldDropRate * 0.7;
	variableSideDropRate = sideBaseFieldDropRate * 0.7;
	game.time.events.add(Phaser.Timer.SECOND * powerUpDuration, resetSpeeds, this);
	if(slowDownTxt !== undefined){
		slowDownTxt.kill();
		slowDownTxt = undefined;
	}
	if(speedUpTxt !== undefined){
		speedUpTxt.kill();
		speedUpTxt = undefined;
	}
	slowDownTxt = game.add.sprite(game.world.centerX-114,game.world.centerY,'slowDownTxt');
	speeddownSound.play();

}

function ActivateClearScreen(){
	var clearBox = game.add.sprite(0,0,'ClearBox');
	clearBox.animations.add('clearScreenExplosion',[0,1,2,3,4],10,false);
	clearBox.animations.play('clearScreenExplosion',null,false,true);

	
	ClearFallingBombs();
	ClearFallingMissles();
	clearScreenSound.play();
}
function resetSpeeds(){
	variableDropRate = baseFieldDropRate;
	variableSideDropRate = sideBaseFieldDropRate;
	currentlySpeedingUp = false;
	currentlySpeedingDown = false;
	if(speedUpTxt !== undefined){
		speedUpTxt.kill();
		speedUpTxt = undefined;
	}
	if(slowDownTxt !== undefined){
		slowDownTxt.kill();
		slowDownTxt = undefined;
	}
}

function SpawnPowerup(){

	var spawnProb = game.rnd.integerInRange(0,10);
	var whichPowerup = game.rnd.integerInRange(1,3);
	var whichDir = game.rnd.integerInRange(0,1);

	if(spawnProb == 1){
		//slow down
		if(whichPowerup == 1){
			SpawnSlowDownPowerup(whichDir);
		}
		else if(whichPowerup == 2){
			SpawnSpeedUpPowerup(whichDir);
		}
		else{
			SpawnClearPowerup(whichDir);
		}

	}

}

function SpawnSlowDownPowerup(direction){
	if(direction == 0){
		//left
		var powerup = powerUpGroup.create(game.rnd.integerInRange(700, game.world.width-400),game.rnd.integerInRange(200, game.world.height-400),'speedDown');
		powerup.scale.setTo(2,2);
		powerup.body.velocity.x = -sideBaseFieldDropRate;
		powerup.isFalling = true;
		powerup.powerType = "slow";
	}
	else{
		//down
		var powerup = powerUpGroup.create(game.rnd.integerInRange(700, game.world.width-400),game.rnd.integerInRange(200, game.world.height-400),'speedDown');
		powerup.scale.setTo(2,2);
		powerup.body.velocity.y = baseFieldDropRate;
		powerup.isFalling = true;
		powerup.powerType = "slow";
	}

}

function SpawnSpeedUpPowerup(direction){

	if(direction == 0){
		//left
		var powerup = powerUpGroup.create(game.rnd.integerInRange(700, game.world.width-400),game.rnd.integerInRange(200, game.world.height-400),'speedUp');
		powerup.body.velocity.x = -sideBaseFieldDropRate;
		powerup.scale.setTo(2,2);
		powerup.isFalling = true;
		powerup.powerType = "speed";
	}
	else{
		//down
		var powerup = powerUpGroup.create(game.rnd.integerInRange(700, game.world.width-400),game.rnd.integerInRange(200, game.world.height-400),'speedUp');
		powerup.scale.setTo(2,2);
		powerup.body.velocity.y = baseFieldDropRate;
		powerup.isFalling = true;
		powerup.powerType = "speed";
	}
}

function SpawnClearPowerup(direction){

	if(direction == 0){
	//left
	var powerup = powerUpGroup.create(game.rnd.integerInRange(700, game.world.width-400),game.rnd.integerInRange(200, game.world.height-400),'clear');
	powerup.scale.setTo(2,2);
	powerup.animations.add('flash',[0,1,2],10,true);
	powerup.animations.play('flash');
	powerup.body.velocity.x = -sideBaseFieldDropRate;
	powerup.isFalling = true;
	powerup.powerType = "clear";
	}
	else{
	//down
	var powerup = powerUpGroup.create(game.rnd.integerInRange(700, game.world.width-400),game.rnd.integerInRange(200, game.world.height-400),'clear');
	powerup.scale.setTo(2,2);
	powerup.animations.add('flash',[0,1,2],10,true);
	powerup.animations.play('flash');
	powerup.body.velocity.y = baseFieldDropRate;
	powerup.isFalling = true;
	powerup.powerType = "clear";
	}

}