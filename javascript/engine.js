//For debugging purposes FPS is set to default 30

//Every GameObject needs to have an update() and draw() method

window.onload=function(){
	init();
}

var Game = function(){
	this.FPS = 30;
	this.levels = [];
	this.dimensions = new Point2( 800, 600 );
	this.paused = true;
	this.currentLevel = 0;
	
	this.start = function(){
		//call construct inside game
		//<gameScript> must have a construct method to be called
		construct(); //I think this will work properly
		this.startLevel();
	}
	
	//Start Employment of levels Here
	this.startLevel = function(){
		this.levels[ this.currentLevel ].start();
	}
	
	this.loadNextLevel = function(){
		this.currentLevel++;
	}
	
	this.pause = function(){
		this.paused = !paused;
	}
	
	this.addLevel = function( level ){
		this.levels.push( level );
	}
}

var Object = function( x, y ){
	Point2.apply( this, arguments );
}

var GameObject = function(  ){
	this.object = 0;
	this.rigidbody = null;
	
	var update = function(){}
}

var Rectangle = function( position, dimensions, color){
	this.position = position;
	this.dimensions = dimensions;
	this.color = color;
	
	this.draw = function(){
		game.map.fillStyle = this.color;
		game.map.fillRect(
			this.position.x,
			this.position.y,
			this.dimensions.x,
			this.dimensions.y
		);
	}
}

var Physics = function(){
	this.Rigidbodies = [];
	
	this.addRigidbody = function( rigidbody ){
		this.Rigidbodies.push( rigidbody );
	}
	
	this.run = function(){
		for ( rigidbody in Rigidbodies ){
			rigidbody.run();
		}
	}
}

var RigidBody = function( mass , point ){
	this.mass = new Mass( mass );
	this.location = new Point2( point.x, point.y );
	this.velocity = new Vector2( 0, 0 );
	this.acceleration = new Vector2( 0, 0 );
	this.forces = {
		constant: [],
		impulse: []
	};
	this.freefall = true;
	this.usesGravity = true;
	
	this.setGravity = function( set ){
		this.usesGravity = set;
	}
	
	this.addForce = function( force ){
		this.forces.push( force );
	}
	
	this.update = function(){
		this.run();
	}
	
	this.run = function(){
		this.applyForces();
		this.applyAcceleration();
		this.changePosition();
		this.checkForGround();
	}
	
	this.checkForGround = function(){
		//Check to see if any collisions have occurred
	}
	
	//Need to remove forces and or accelerations after they've been added.
	this.applyForces = function(){
		for ( force in this.forces ){
			this.acceleration = new Vector2(
				this.acceleration.x + ( force.x / this.mass ),
				this.acceleration.y + ( force.y / this.mass )
			);
		}
		
		if ( this.usesGravity == true ){
			this.acceleration = new Vector2(
				this.acceleration.x,
				this.acceleration.y + ( game.levels[ game.currentLevel ].gravity / this.mass )
			);
		}
	}
	
	this.applyAcceleration = function(){
		this.velocity = new Vector2(
			this.velocity.x + this.acceleration.x,
			this.velocity.y + this.acceleration.y
		);
	}
	
	this.changePosition = function(){
		this.location = new Point2( 
			this.location.x + this.velocity.x,
			this.location.y + this.velocity.y
		);
	}
}

var Mass = function( m ){
	this.mass = m;
}

var Point2 = function( x, y ){
	this.x = x;
	this.y = y;
	
	this.get_x = function(){
		return x;
	}
	
	this.get_y = function(){
		return y;
	}
}

var Vector2 = function( i, j ) {
	this.position = new Point2( i, j );
	
	this.getMagnitude = function(){
		// sqrt( i^2 + j^2 );
		return Math.sqrt( Math.pow(i, 2) + Math.pow(j, 2) );
	}
	this.getDirection = function(){
		//returns a new Point object representing unit vector
		console.log( this.position );
		return new Vector2( 
			( position.get_x() / getMagnitude() ) ,
			( position.get_y() / getMagnitude() ) 
		);
	}
}

var Force2 = function( i, j , isConstant){
	Vector2.apply( this, arguments[0], arguments[1] );
	//Ensures duration in seconds
	this.constant = isConstant;
}

var Impulse2 = function( i, j ){
	Force2.apply( arguments, 1/game.FPS );
}

var Gravity = function( i, j, duration ){
	Force2.apply( this, arguments );
}


//Initalization
var init = function(){
	var canvas = document.getElementById( 'map' );
	game.map = canvas.getContext( '2d' );
	game.start();
}

game = new Game();