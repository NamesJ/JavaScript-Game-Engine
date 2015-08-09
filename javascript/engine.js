//For debugging purposes FPS is set to default 30
//Your script must call Game.start();
//Every GameObject needs to have an update() and draw() method

window.onload = function(){
	init();
}

var Object = function(x, y){
	Point2.apply(arguments);
}

var GameObject = function(){
	this.rigidbody = null;
	this.update = function(){}
	this.draw = function(){}
}

var Rectangle = function(p, d, c){
	this.position = p;
	this.dimensions = d;
	this.color = c;
	
	this.draw = function(){
		Game.map.fillStyle = this.color;
		Game.map.fillRect(
			this.position.x,
			this.position.y,
			this.dimensions.x,
			this.dimensions.y
		);
	}
}

var Physics = function(){
	Rigidbodies = [];
	
	addRigidbody = function( rigidbody ){
		Rigidbodies.push( rigidbody );
	}
	
	run = function(){
		for ( rigidbody in Rigidbodies ){
			rigidbody.run();
		}
	}
}

var RigidBody = function(m,p){
	this.mass = m;
	this.location = p;
	this.velocity = new Vector2( 0, 0 );
	this.acceleration = new Vector2( 0, 0 );
	this.forces = {
		constant : [],
		impulse : []
	};
	this.freefall = true;
	this.usesGravity = true;
	
	this.setGravity = function( set ){
		this.usesGravity = set;
	}
	
	this.addConstantForce = function( force ){
		this.forces.constant.push( force );
	}
	
	this.addImpulseForce = function(force){
		this.forces.impulse.push(force);
	}
	
	
	this.update = function(){
		this.run();
	}
	
	this.run = function(){
		this.applyGravity();
		this.applyForces();
		this.applyAcceleration();
		this.changePosition();
		this.checkForGround();
	}

	this.checkForGround = function(){
		//Check to see if any collisions have occurred
	}
	
	this.applyGravity = function(){
		if ( this.usesGravity == true ){
			this.acceleration = new Vector2(
				this.acceleration.i,
				this.acceleration.j + ( Game.levels[ Game.currentLevel ].gravity / this.mass )
			);
		}
	}
	
	//Need to remove forces and or accelerations after they've been added.
	this.applyForces = function(){
		for ( force in this.forces.constant ){
			this.acceleration = new Vector2(
				this.acceleration.i + ( this.force.i / this.mass ),
				this.acceleration.j + ( this.force.j / this.mass )
			);
		}
		if(this.forces.impulse != null){
			for( force in this.forces.impulse){
				this.acceleration = new Vector2(
					this.acceleration.i + ( this.force.i / this.mass ),
					this.acceleration.j + ( this.force.j / this.mass )
				);
			}
		}
		this.forces.impulse = [];
	}

	this.applyAcceleration = function(){
		this.velocity = new Vector2(
			this.velocity.i + this.acceleration.i,
			this.velocity.j + this.acceleration.j
		);
	}
	
	this.changePosition = function(){
		this.location = new Point2( 
			this.location.i + this.velocity.i,
			this.location.j + this.velocity.j
		);
	}
}

//this is useless
var Mass = function(m){
	mass = m;
}

var Point2 = function(newX, newY){
	this.x = newX;
	this.y = newY;
}

var Vector2 = function(newI, newJ){
	this.i = newI;
	this.j = newJ;
	
	getMagnitude = function(){
		// sqrt( i^2 + j^2 );
		return Math.sqrt( Math.pow(i, 2) + Math.pow(j, 2) );
	}
	
	getDirection = function(){
		//returns a new Point object representing unit vector
		console.log( position );
		return new Vector2( 
			( position.get_x() / getMagnitude() ) ,
			( position.get_y() / getMagnitude() ) 
		);
	}
}

var Force2 = function(i, j , isConstant){
	Vector2.apply(arguments[0], arguments[1]);
		//Ensures duration in seconds
		constant = isConstant;
}

var Impulse2 = function( i, j ){
	Force2.apply(arguments, 1/game.FPS);
}

var Gravity = function( i, j, duration ){
	Force2.apply(arguments);
}

var Game = {
	ready : false,
	FPS : 30,
	levels : [],
	dimensions : new Point2( 800, 600 ),
	paused : false,
	currentLevel : 0,
	
	//Start Employment of levels Here
	startLevel : function(){
		this.levels[ this.currentLevel ].start();
	},
	
	start : function(){
		this.startLevel();
	},
	
	loadNextLevel : function(){
		this.currentLevel++;
	},
	
	pause : function(){
		this.paused = !paused;
	},
	
	addLevel : function( level ){
		this.levels.push( level );
	}
};

//Initalization
function init(){
	var canvas = document.getElementById('map');
	Game.map = canvas.getContext('2d');
	Game.ready = true;
}