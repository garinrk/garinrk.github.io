var game = new Phaser.Game(1920,1080, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var cursors;
var player;
var blocks;
var score = 0;
var scoreText;
var text;
var isGameRunning = false;
var health = 100;

var startGameKey;
var menuObject;

var startFlag = true;
var gameOverFlag = false;
//Load assets in here
function preload(){	
	FieldPreload();
	SideFieldPreload();
	AudioPreload();
	loadPlayer(game);	
	PowerupPreload();
	MiscPreload();
	game.load.image('menuScreen','assets/Menu_Screen.png');
	game.load.image('gameOverScreen','assets/gameoverscreen.png');
	game.load.bitmapFont('pixeled', 'assets/fonts/pixeled.png', 'assets/fonts/pixeled.xml');
}

function create(){		
	startGameKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	game.physics.startSystem(Phaser.Physics.ARCADE);
	FieldCreate(game);
	AudioCreate();
	SideFieldCreate(game);
	PowerupCreate();
	createPlatforms(game);
	MiscCreate();
	cursors = game.input.keyboard.createCursorKeys();
	text = game.add.bitmapText(400,40,'pixeled','SCORE:0',48);
	/*game.add.text(400, 40, 'SCORE: 0', {
        font: "48px pixeled",
        fill: "#ffffff",
        align: "center"
    });*/	
    //stop keys from propagating to browser
    game.input.keyboard.addKeyCapture( Phaser.Keyboard.ENTER );
    DisplayMainMenu();
}

function DisplayMainMenu(){
	menuObject = game.add.sprite(0,0,'menuScreen');

}

function update(){

	if(startGameKey.isDown && startFlag == true){

		StartGame();
	}
	if(isGameRunning){
		updatePlatforms(game,cursors);
		PowerupUpdate();
		MiscUpdate();
	}
	if(health < 60 && health > 30){
		background.play('stage2');
	}
	if(health < 30){
		background.play('stage3');
	}

	FieldUpdate();
	SideFieldUpdate();

	if(gameOverFlag){

		spawnSpeed = .5;
		sideSpawnSpeed = .5;
		variableDropRate = 800;
		variableSideDropRate = 800;
    	sideSpawnLoopEvent.delay = .25 * Phaser.Timer.SECOND;
    	spawnLoopEvent.delay = .25 * Phaser.Timer.SECOND;
	}
	
}

function StartGame(){
	menuObject.kill();
	isGameRunning = true;
	StartSideMissles();
	StartBombs();
	StartPowerupSpawn();
	startFlag = false;
	gameMusic.play();
	startScreenMusic.stop();
}

function FireGameOverGraphic(){
	removeTextEvent = game.time.events.add(Phaser.Timer.SECOND * 3, ShowGameOverGraphic, this);
}

function ShowGameOverGraphic(){

	menuObject = game.add.sprite(0,0,'gameOverScreen');
	gameMusic.stop();
	gameOverSound.play();
}