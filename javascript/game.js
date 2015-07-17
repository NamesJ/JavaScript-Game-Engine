var player;
var key = {};
var levels = [];

var _Player = function(){
	this.groundState = 'freefall';
	this.paused = false;
	this.up = new Vector2( 0, 10, 1/game.FPS );
	this.left = new Vector2( -5, 0, 0.1 );
	this.right = new Vector2( 5, 0, 0.1 );
	this.down = new Vector2( 0, 0, 1/game.FPS );
	
	this.addComponent = function( object ){
		if ( object.typeof( RigidBody ) ){
			this.rigidbody = object;
		} else if ( object.typeof ( Force2 ) ){
			this.rigidbody.addForce( object );
		}
	}
	
	this.jump = function(){
		this.rigidbody.addForce( new Vector2( 0, 20 ) )
	}
	
	this.move = function( direction ){
		this.rigidbody.addForce( direction );
	}
	
	this.draw = function(){
		
	}
	
	
	
}

//Level Design

/*Levels must have 
	start(), start the level
	update(), update the physics
	draw(),  draw everything to the canvas
	getAll(), return a 'copy' of the level for Game to use
functions
and
	gameObjects[], to hold all objects within the gameObjects
	gravity vector, [optional-ish]
	player, to play the game obviously

*/

var Player = function(){
	this.position = new Point2(
		game.dimensions.x / 2,
		game.dimensions.y / 2
	);
	this.mass = new Mass( 1 );
	this.rigidbody = new RigidBody( this.mass, this.position );
	this.up = new Vector2( 0, 10, 1 / game.FPS );
	this.left = new Vector2( -5, 0, 0.1 );
	this.right = new Vector2( 5, 0, 0.1 );
	this.down = new Vector2( 0, 0, 1 / game.FPS );
	
	this.resetPosition = function(){
		this.position = new Point2(
			game.dimensions.x / 2,
			game.dimensions.y / 2
		);
	}
	
	this.init = function(){
		this.body = [];
		var lorem = new Rectangle();
		var head = new Rectangle(
			new Point2(
				this.position.x - 3,
				this.position.y + 10
			),
			new Point2(
				20,
				20
			),
			"#FFCCBB"
		);
		var torso = new Rectangle(
			new Point2(
				this.position.x - 10,
				this.position.y + 30
			),
			new Point2(
				35,
				60
			),
			"#FFBB66"
		);
		var pantBase = new Rectangle(
			new Point2(
				this.position.x - 10,
				this.position.y + 90
			),
			new Point2(
				35,
				10
			),
			"#0099BB"
		);
		var pantLegs = new Rectangle(
			new Point2(
				this.position.x - 3,
				this.position.y + 100
			),
			new Point2(
				20,
				50
			),
			"#0099BB"
		);
		var shoeL = new Rectangle(
			new Point2(
				this.position.x - 4,
				this.position.y + 150
			),
			new Point2(
				15,
				7
			),
			"#FFBB66"
		);
		var shoeR = new Rectangle(
			new Point2(
				this.position.x + 10,
				this.position.y + 150
			),
			new Point2(
				15,
				7
			),
			"#FFBB66"
		);
		this.body.push( head     );
		this.body.push( torso    );
		this.body.push( pantBase );
		this.body.push( pantLegs );
		this.body.push( shoeL    );
		this.body.push( shoeR    );
	}
	
	this.jump = function(){
		this.rigidbody.addForce( this.up )
	}
	
	this.move = function( direction ){
		this.rigidbody.addForce( direction );
	}
	
	this.userInput = function(){
		//Handle the users input here
		if (game.paused == false) {
			if (key[87]){
				//W Key
				//If on platform
				if (this.groundState == 'grounded') {
					this.jump();
				}
			}
			
			if (key[65]){
				//A Key
				this.move( this.left );
			}
			
			if (key[83]){ 
				//S Key
				this.move( this.down );
			}
			
			if (key[68]){
				//D Key
				this.move( this.right );
			}
		/*
			if (key[32]){
				//Spacebar
				if (this.jetPack.has == true){
					this.rigidbody.addForce( new Vector2( 0, this.jetpack.force ) );
				}
			}
		*/
		}
	}
	
	this.update = function(){
		console.log( "update called" );
		this.userInput();
		this.rigidbody.update();
		this.draw();
	}
	
	this.draw = function(){
		for( var x = 0; x < this.body.length; x++ ){
			this.body[ x ].draw();
		}
	}
	
	this.init();
}

var Level1 = function( title ){
	
	this.title = title;
	this.gameObjects = []
	this.gravity = -9.81;
	
	this.setupEnvironment = function(){
		return true;
	}
	
	this.setupPickups = function(){
		return true;
	}
	
	this.setupPlayer = function(){
		player.resetPosition();
	}
	
	this.addGameObject = function( object ){
		gameObjects.push( object );
	}
	
	this.update = function(){
		player.update();
		for( object in this.gameObjects ){
			object.update();
		}
		this.draw();
	}

	this.draw = function(){
		if ( game.paused == false ){
			requestAnimationFrame( this.update );
		} else {
			//requestAnimationFrame( pauseScreen );
		}
	}
	
	this.start = function(){
		//setup the level here
		this.setupEnvironment();
		this.setupPickups();
		this.setupPlayer();
		this.update();
	}
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

var construct = function(){
	//Add levels
	//persistent player object
	player = new Player();
	game.addLevel( new Level1('Level 1') );
}