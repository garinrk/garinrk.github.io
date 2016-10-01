var missileGroup;
var isGameRunning = true;
var sideCurrentLevel = 1;

var misslesShotThisLevel = 0;

var sideSpawnLoopEvent;

/******BALANCE VALUES******/

var misslesPerWave = 15; // how many per wave
var sideSpawnSpeed = 1.5; // spawn frequency
var sideSpawnSpeedModifier = 0.9; // how much to take away from the spawn frequency per wave

/******END BALANCE VALUES******/

var sideBaseFieldDropRate = 150;
var variableSideDropRate = sideBaseFieldDropRate;

function SideFieldPreload() {
    game.load.spritesheet('missile', 'assets/Missile.png',64,64);
	game.load.spritesheet('sideAlien1', 'assets/SideAlien_1.png', 64, 120);
	game.load.spritesheet('sideAlien2', 'assets/SideAlien_2.png', 64, 120);
	game.load.spritesheet('sideAlien3', 'assets/SideAlien_3.png', 64, 120);
	game.load.spritesheet('sideAlien4', 'assets/SideAlien_4.png', 64, 120);
	game.load.spritesheet('sideAlien5', 'assets/SideAlien_5.png', 64, 120);
}

function SideFieldCreate(game) {	
    missileGroup = game.add.group();   
    missileGroup.enableBody = true;
    missileGroup.physicsBodyType = Phaser.Physics.ARCADE;
	var alien1 = game.add.sprite(game.world.width-64,200,'sideAlien1');
	alien1.animations.add('hover',[0,1,2,3,4],10,true);
	alien1.animations.play('hover');
	var alien2 = game.add.sprite(game.world.width-64,320,'sideAlien2');
	alien2.animations.add('hover',[0,1,2,3,4],10,true);
	alien2.animations.play('hover');
	var alien3 = game.add.sprite(game.world.width-64,440,'sideAlien3');
	alien3.animations.add('hover',[0,1,2,3,4],10,true);
	alien3.animations.play('hover');
	var alien4 = game.add.sprite(game.world.width-64,560,'sideAlien4');
	alien4.animations.add('hover',[0,1,2,3,4],10,true);
	alien4.animations.play('hover');
	var alien5 = game.add.sprite(game.world.width-64,680,'sideAlien5');
	alien5.animations.add('hover',[0,1,2,3,4],10,true);
	alien5.animations.play('hover');
}

function StartSideMissles(){
	 sideSpawnLoopEvent = game.time.events.loop(Phaser.Timer.SECOND*sideSpawnSpeed, SpawnMissile, this);
}

function SideFieldUpdate() {
	if(isGameRunning){

	    if(misslesShotThisLevel == misslesPerWave && gameOverFlag == false){
	    	sideBaseFieldDropRate += 50;
	    	variableSideDropRate = sideBaseFieldDropRate;
	    	misslesShotThisLevel = 0;
	    	sideCurrentLevel++;

	    	sideSpawnSpeed = sideSpawnSpeed * sideSpawnSpeedModifier;
	    	sideSpawnLoopEvent.delay	= sideSpawnSpeed * Phaser.Timer.SECOND;

	    }
		missileGroup.forEachAlive(function(missile){
			if(missile.body.position.x < 400){
				var explosion = explosionGroup.create(missile.body.position.x-128,missile.body.position.y-128,'BombDetonate');
				explosion.animations.add('explosion',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],48,false);
				explosion.animations.play('explosion',null,false,true);
				missleExplosion.play();
				missile.kill();
				health -= 10;			
				if(health == 0){
					isGameRunning = false;
					gameOverFlag = true;
					FireGameOverGraphic();
				}
			}else if(missile.body.position.x < game.world.width*.3){
				if(missile.animations.currentAnim.name !== 'warning'){
					missile.animations.play('warning');
				}
			}
		});
	}
}

function SideKillCoin(coin) {
    coin.kill();
	killText.setText("GAME OVER!");
	isGameRunning = false;
	// missleExplosion.play();
}

function SpawnMissile() {
	var missile = missileGroup.create(game.world.width-100,game.rnd.integerInRange(200, game.world.height-400),'missile');
	missile.animations.add('boost',[0,1,2,3],10,true);
	missile.animations.add('warning',[4,5,6,7],10,true);
	missile.animations.play('boost');
	missile.body.velocity.x = -variableSideDropRate;
	missile.isFalling = true;
	missile.fuseAble = true;
	misslesShotThisLevel++;

}

function ClearFallingMissles(){
    missileGroup.forEachAlive(function(missile){
        if(missile.isFalling === true)
            missile.kill();
    });

}
