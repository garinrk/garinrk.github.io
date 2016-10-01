var bombGroup;
var currentLevel = 1;
var bombsDroppedThisLevel = 0;

var comboMissileBombGroup;
var explosionGroup;
var waveText = undefined;

var removeTextEvent;
var spawnLoopEvent;
var background;

/******BALANCE VALUES******/

var bombsPerWave = 15; // how many per wave
var spawnSpeed = 1.5; // spawn frequency
var spawnSpeedModifier = 0.9; // how much to take away from the spawn frequency per wave

/******END BALANCE VALUES******/

var baseFieldDropRate = 150;
var variableDropRate = baseFieldDropRate;

function FieldPreload() {
    game.load.spritesheet('bomb', 'assets/bomb.png',43,64);
	game.load.spritesheet('background','assets/Background_Destruction.png',1920,1080);
	game.load.spritesheet('alienShip','assets/AlienShip_SpriteSheet.png',721,200);
	game.load.spritesheet('comboMissileBomb','assets/Combo_Missile_Bomb.png',64,78);
	game.load.spritesheet('BombDetonate','assets/BombDetonate_spr.png',256,256);	
}

function FieldCreate(game) {
    background = game.add.sprite(0, 0, 'background');
	background.animations.add('stage1',[0],false);
	background.animations.add('stage2',[1],false);
	background.animations.add('stage3',[2],false);
	background.animations.play('stage1');
	var alienShip = game.add.sprite(750,0,'alienShip');
	alienShip.animations.add('dance',[0,1,2,3],10,true);
	alienShip.animations.play('dance');
    bombGroup = game.add.group();
    bombGroup.enableBody = true;
    bombGroup.physicsBodyType = Phaser.Physics.ARCADE;
	comboMissileBombGroup = game.add.group();
	comboMissileBombGroup.enableBody = true;
    comboMissileBombGroup.physicsBodyType = Phaser.Physics.ARCADE;
	explosionGroup = game.add.group();
}

function StartBombs(){
	spawnLoopEvent = game.time.events.loop(Phaser.Timer.SECOND*spawnSpeed, SpawnBomb, this);
}

function FieldUpdate() {
	if(isGameRunning){
	    // game.physics.arcade.overlap(floor, coinGroup1, KillCoin, null, this);
	    if(bombsDroppedThisLevel == bombsPerWave && gameOverFlag == false){
	    	baseFieldDropRate += 50;
	    	variableDropRate = baseFieldDropRate;
	        bombsDroppedThisLevel = 0;
	        nextWaveSound.play();
	        currentLevel++;
	        DisplayWaveNumber();
			
			spawnSpeed = spawnSpeed * spawnSpeedModifier;
	    	spawnLoopEvent.delay	= spawnSpeed * Phaser.Timer.SECOND;

	    }
		game.physics.arcade.overlap(bombGroup,missileGroup,SpawnFusedProjectile,null,this);
		bombGroup.forEachAlive(function(bomb){
			if(bomb.body.position.y > game.world.height-80){
				var explosion = explosionGroup.create(bomb.body.position.x-128,bomb.body.position.y-128,'BombDetonate');
				explosion.animations.add('explosion',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],24,false);
				explosion.animations.play('explosion',null,false,true);
				bomb.kill();
				bombExplosion.play();
				health -= 10;			
				if(health == 0){
					isGameRunning = false;
					gameOverFlag = true;				
					FireGameOverGraphic();				
				}
			}else if(bomb.body.position.y > game.world.height*.75){
				if(bomb.animations.currentAnim.name !== 'warning'){
					bomb.animations.play('warning');
				}
			}
		});
		comboMissileBombGroup.forEachAlive(function(bomb){
			if(bomb.body.position.y > game.world.height-80||bomb.body.position.x < 400){
				var explosion = explosionGroup.create(bomb.body.position.x-128,bomb.body.position.y-128,'BombDetonate');
				explosion.animations.add('explosion',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],48,false);
				explosion.animations.play('explosion',null,false,true);
				bomb.kill();
				health -= 10;
				if(health == 0){
					isGameRunning = false;
					gameOverSound.play();
					FireGameOverGraphic();				
				}
			}else if(bomb.body.position.y > game.world.height*.75 || bomb.body.position.x < game.world.height*.25){
				if(bomb.animations.currentAnim.name !== 'warning'){
					bomb.animations.play('warning');
				}
			}
		});

	}
}

function KillCoin(player, coin) {
    bombGroup.kill();
}

function SpawnBomb() {
    var bomb = bombGroup.create(game.rnd.integerInRange(700, game.world.width-400),200,'bomb');
	bomb.animations.add('pulse',[0,1,2,3],10,true);
	bomb.animations.add('warning',[4,5,6,7,8],10,true);
	bomb.animations.play('pulse');
	bomb.body.velocity.y = variableDropRate;
	bomb.isFalling = true;
	bomb.fuseAble = true;
    bombsDroppedThisLevel++;
}

function ClearFallingBombs(){

    bombGroup.forEachAlive(function(bomb){
        if(bomb.isFalling === true)
            bomb.kill();
    });
	comboMissileBombGroup.forEachAlive(function(projectile){
       projectile.kill();
    });


}


function SpawnFusedProjectile(bomb,missile){
	if(game.rnd.integerInRange(0, 100)>75 && bomb.fuseAble && missile.fuseAble){
		var comboMissileBomb = comboMissileBombGroup.create(bomb.body.position.x,bomb.body.position.y,'comboMissileBomb');
		comboMissileBomb.angle = 45;
		comboMissileBomb.animations.add('boost',[0,1,2,3,4,5],10,true);
		comboMissileBomb.animations.add('warning',[6,7,8,9,10,11],10,true);
		comboMissileBomb.animations.play('boost');
		comboMissileBomb.body.velocity.y = variableDropRate*0.8;
		comboMissileBomb.body.velocity.x = -variableDropRate*0.8;
		bomb.kill();
		missile.kill();	
	}else{
		bomb.fuseAble = false;
		missile.fuseAble = false;
	}
}

function DisplayWaveNumber(){
	 if(waveText == undefined){
	 	waveText = game.add.bitmapText(game.world.width/2,game.world.height/2,'pixeled','WAVE ' + currentLevel,48);
	 	removeTextEvent = game.time.events.add(Phaser.Timer.SECOND * 2, RemoveWaveText, this);
        }
	else{
		waveText.setText("WAVE " + currentLevel);

		removeTextEvent = game.time.events.add(Phaser.Timer.SECOND * 2, RemoveWaveText, this);
		}
}

function RemoveWaveText(){
	waveText.destroy();
	waveText = undefined;
	game.time.events.remove(removeTextEvent);
}