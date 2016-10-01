var scaredDudeGroup;
var carGroup;
var numberOfDudes = 20;
var numberOfCars = 2;

function MiscPreload(){
	game.load.spritesheet('car','assets/car.png',192,120);
	game.load.spritesheet('scaredDude','assets/ScaredDude_spr.png',80,80);
}

function MiscCreate(){
	scaredDudeGroup = game.add.group();
	scaredDudeGroup.enableBody = true;
	scaredDudeGroup.physicsBodyType = Phaser.Physics.ARCADE;
	carGroup = game.add.group();
	carGroup.enableBody = true;
	carGroup.physicsBodyType = Phaser.Physics.ARCADE;
	for(var i=0;i<numberOfDudes;i++){
		var dude = scaredDudeGroup.create(game.rnd.integerInRange(700, game.world.width-400),game.rnd.integerInRange(game.world.height-100, game.world.height-80),'scaredDude');
		dude.animations.add('freak',[0,1,2,3],10,true);
		dude.animations.play('freak');
		dude.body.velocity.x = game.rnd.integerInRange(50, 80);
		dude.scale.x = -1;
		if(i%2 == 0){
			dude.body.velocity.x = -dude.body.velocity.x;
			dude.scale.x = -dude.scale.x;
		}
	}

	var lonelyDude = game.add.sprite(400,120,'scaredDude');
	lonelyDude.animations.add('freak',[0,1,2,3],10,true);
	lonelyDude.scale.x = -1;
	lonelyDude.animations.play('freak');
	/*for (var i=0;i<numberOfCars;i++){
		var car = carGroup.create(game.rnd.integerInRange(700, game.world.width-400),game.rnd.integerInRange(game.world.height-200, game.world.height-100),'car');
		car.animations.add('drive',[0,1,2],10,true);
		car.animations.play('drive');
		car.body.velocity.x = -game.rnd.integerInRange(80, 120);
		car.scale.x = -1;
		if(i%2 == 0){
			car.body.velocity.x = -car.body.velocity.x;
			car.scale.x = -car.scale.x;
		}
	} */
}

function MiscUpdate(){
	scaredDudeGroup.forEachAlive(function(dude){
		if(dude.body.position.x < game.world.width*0.3 || dude.body.position.x > game.world.width){
			dude.body.velocity.x = -dude.body.velocity.x;
			dude.scale.x = -dude.scale.x;
		}
	});
	/* carGroup.forEachAlive(function(car){
		if(car.body.position.x < game.world.width*0.3 || car.body.position.x > game.world.width){
			car.body.velocity.x = -car.body.velocity.x;
			car.scale.x = -car.scale.x;
		}
	}); */
}