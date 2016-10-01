
var startScreenMusic;
var missleExplosion;
var bombExplosion;
var nextWaveSound;
var gameOverSound;
var winGameSound;

var backgroundMusic;
var speedupSound;
var speeddownSound;
var clearScreenSound;

var gameMusic;



function AudioPreload(){



	game.load.audio('startscreen',['assets/audio/startscreen.ogg','assets/audio/startscreen.mp3']);
	game.load.audio('missleexplode',['assets/audio/missleexplode.ogg','assets/audio/missleexplode.mp3']);
	game.load.audio('bombexplode',['assets/audio/bombexplosion.ogg','assets/audio/bombexplosion.mp3']);
	game.load.audio('nextwave',['assets/audio/nextwave.ogg','assets/audio/nextwave.mp3']);
	game.load.audio('gameover',['assets/audio/gameover.ogg','assets/audio/gameover.mp3']);
	game.load.audio('wingame',['assets/audio/wingame.ogg','assets/audio/wingame.mp3']);
	game.load.audio('gameMusic',['assets/audio/gameMusic.ogg','assets/audio/gameMusic.mp3']);

	game.load.audio('speedup',['assets/audio/speedup.ogg','assets/audio/speedup.mp3']);
	game.load.audio('speeddown',['assets/audio/speeddown.ogg','assets/audio/speeddown.mp3']);
	game.load.audio('clearscreen',['assets/audio/clearscreen.ogg','assets/audio/clearscreen.mp3']);
}

function AudioCreate(){
	// backgroundMusic = game.add.audio('bgmusic');
	speedupSound = game.add.audio('speedup',0.1);
	speeddownSound = game.add.audio('speeddown',0.1);
	clearScreenSound = game.add.audio('clearscreen');
	startScreenMusic = game.add.audio('startscreen',0.1,true);
	missleExplosion = game.add.audio('missleexplode',0.1);
	bombExplosion = game.add.audio('bombexplode',0.1);
	nextWaveSound = game.add.audio('nextwave',0.5);
	winGameSound = game.add.audio('wingame');
	gameOverSound = game.add.audio('gameover',0.1);
	gameMusic = game.add.audio('gameMusic',1,true);

	startScreenMusic.play();
}