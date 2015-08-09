var Player;
var Level1;
var key = {};
var levels = [];
/**
var _Player = {
	groundState : 'freefall',
	up : new Vector2( 0, 10, 1/Game.FPS ),
	left : new Vector2( -5, 0, 0.1 ),
	right : new Vector2( 5, 0, 0.1 ),
	down : new Vector2( 0, 0, 1/Game.FPS ),
	
	addComponent : function( object ){
		if ( object.typeof( RigidBody ) ){
			rigidbody = object;
		} else if ( object.typeof ( Force2 ) ){
			rigidbody.addForce( object );
		}
	},
	
	jump : function(){
		rigidbody.addForce( new Vector2( 0, 20 ) )
	},
	
	move : function( direction ){
		rigidbody.addForce( direction );
	},
	
	draw : function(){
		
	}
	
}
**/

//Level Design

/*Levels must have 
	start(), start the level
	update(), update the physics
	draw(),  draw everything to the canvas
	getAll(), return a 'copy' of the level for Game to use
functions
and
	GameObjects[], to hold all objects within the GameObjects
	gravity vector, [optional-ish]
	player, to play the Game obviously

*/

function setup(){
	Player = {};
	Player.body = [];
	Player.position = new Point2(Game.dimensions.x / 2, Game.dimensions.y / 2);
	Player.mass = 1;
	Player.rigidbody = new RigidBody( Player.mass , Player.position );
	Player.up = new Vector2( 0, 10, 1 / Game.FPS );
	Player.left = new Vector2( -5, 0, 0.1 );
	Player.right = new Vector2( 5, 0, 0.1 );
	Player.down = new Vector2( 0, 0, 1 / Game.FPS );
	Player.resetPosition = function(){
		this.position = new Point2(
			Game.dimensions.x / 2,
			Game.dimensions.y / 2
		);
	};
	Player.init = function(){
		position = new Point2(Player.position.x, Player.position.y);
		head = new Rectangle(
			new Point2(
				position.x - 3,
				position.y + 10
			),
			new Point2(
				20,
				20
			),
			"#FFCCBB"
		);
		torso = new Rectangle(
			new Point2(
				position.x - 10,
				position.y + 30
			),
			new Point2(
				35,
				60
			),
			"#FFBB66"
		),
		pantBase = new Rectangle(
			new Point2(
				position.x - 10,
				position.y + 90
			),
			new Point2(
				35,
				10
			),
			"#0099BB"
		);
		pantLegs = new Rectangle(
			new Point2(
				position.x - 3,
				position.y + 100
			),
			new Point2(
				20,
				50
			),
			"#0099BB"
		);
		shoeL = new Rectangle(
			new Point2(
				position.x - 4,
				position.y + 150
			),
			new Point2(
				15,
				7
			),
			"#FFBB66"
		);
		shoeR = new Rectangle(
			new Point2(
				position.x + 10,
				position.y + 150
			),
			new Point2(
				15,
				7
			),
			"#FFBB66"
		);
		Player.body.push( head     );
		Player.body.push( torso    );
		Player.body.push( pantBase );
		Player.body.push( pantLegs );
		Player.body.push( shoeL    );
		Player.body.push( shoeR    );
	};
	Player.jump = function(){
		Player.rigidbody.addImpulseForce( Player.up )
	};
	Player.move = function( direction ){
		Player.rigidbody.addImpulseForce( direction );
	};
	Player.userInput = function(){
		//Handle the users input here
		if (Game.paused == false) {
			if (key[87]){
				//W Key
				//If on platform
				if (Player.groundState == 'grounded') {
					Player.jump();
				}
			}
			
			if (key[65]){
				//A Key
				Player.move( Player.left );
			}
			
			if (key[83]){ 
				//S Key
				Player.move( Player.down );
			}
			
			if (key[68]){
				//D Key
				Player.move( Player.right );
			}
		/*
			if (key[32]){
				//Spacebar
				if (jetPack.has == true){
					rigidbody.addForce( new Vector2( 0, jetpack.force ) );
				}
			}
		*/
		}
	};
	Player.update = function(){
		Player.userInput();
		Player.rigidbody.update();
	};
	Player.draw = function(){
		for( var x = 0; x < Player.body.length; x++ ){
			Player.body[ x ].draw();
		}
	};

	Level1 = {};
	Level1.title = "null";
	Level1.GameObjects = [];
	Level1.gravity = -9.81;
	Level1.setTitle = function(t){
		title = t;
	};
	Level1.setupEnvironment = function(){
		return true;
	};
	Level1.setupPickups = function(){
		return true;
	};
	Level1.setupPlayer = function(){
		Player.resetPosition();
	};
	Level1.addGameObject = function( object ){
		Level.GameObjects.push( object );
	};
	Level1.draw = function(){
		if ( Game.paused == false ){
			Player.draw();
			for( object in Level1.GameObjects ){
				object.draw();
			}
			requestAnimationFrame( Level1.update );
		} else {
			//requestAnimationFrame( pauseScreen );
		}
	};
	Level1.update = function(){
		Player.update();
		for( object in Level1.GameObjects ){
			object.update();
		}
		Level1.draw();
	};
	Level1.start = function(){
		//setup the level here
		Level1.setupEnvironment();
		Level1.setupPickups();
		Level1.setupPlayer();
		Level1.update();
	};
}

//Input Event Handling System
document.addEventListener("keydown", function(evt) {
	if (evt.keyCode != 80) {
		key[evt.keyCode] = true;
	}
	else {
		pause();
	}
});
 
document.addEventListener("keyup", function(evt) {
    key[evt.keyCode] = false;
});

function start(){
	if(Game.ready == true){
		setup();
		Player.init();
		Level1.setTitle("Level 1");
		Game.addLevel( Level1 );
		Game.start();
	}else{
		requestAnimationFrame(start);
	}
}

start();