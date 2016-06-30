//Your script must call game.start();
//Every GameObject needs to have an update() and draw() method
// Use requestAnimationFrame to call game.update() and game.draw();
//

class Game {
	constructor( ctx, canvasSize, dimensions, fps, physics ){
		//canvasSize = Vector( x, y );
		this.ctx = ctx;
		this.canvasSize = canvasSize;
		this.dimensions = dimensions;
		this.fps = fps;
		this.physics = physics;
		this.gameObjects = [];
		this.startTime;
		this.framesRun = 0;
		this.showFPS = false;
		this.defaultParam = new Array( dimensions ).join("0").split("").map(parseFloat);
	}
	
	addGameObject( gameObject ){
		this.gameObjects.push( gameObject );
	}
	
	start(){
		//Initialization
		var date = new Date();
		this.startTime = date.getTime();
	}
	
	blankCanvas(){
		this.ctx.clearRect( 0, 0, this.canvasSize.c[0], this.canvasSize.c[1] );
	}
	
	update(){
		// Update rigidBody physics for all rigidBody objects using Physics
		for( var i=0; i<this.gameObjects.length; i++ ){
			var gameObject = this.gameObjects[i];
			
			if( rigidBody != "Undefined" ){
				var rigidBody = gameObject.rigidBody;
				var position = gameObject.position;
				rigidBody.position = position;
				rigidBody = this.physics.applyTo( rigidBody, this.fps );
				gameObject.rigidBody = rigidBody;
				gameObject.rigidBody.update();
			}
			
			this.gameObjects[i] = gameObject;
			
			this.gameObjects[i].update();
		}
		
		//Use Physics to check for collisions between gameObjects
		this.gameObjects = this.physics.checkCollisions( this.gameObjects );
		
		//For showing the FPS in case of potential lag issues
		if( this.showFPS ){
			var date = new Date();
			var now = date.getTime();
			var time = (now - this.startTime) / 1000;
			this.framesRun++;
			var estimateFPS = this.framesRun / time;
			console.log( "FPS: " + estimateFPS );
		}
	}
	
	draw(){
		this.blankCanvas();
		for( var i=0; i<this.gameObjects.length; i++ ){
			this.gameObjects[i].draw();
		}
	}
}

class GameObject {
	constructor( name, position ){
		this.name = name;
		this.position = position;
		this.rigidBody = "Undefined";
	}
	
	setRigidBody( rigidBody ){
		this.rigidBody = rigidBody;
		this.rigidBody.position = this.position;
	}
	
	//If GameObject has a rigidBody, then
	// the position of the rigidBody becomes
	// the position of the GameObject
	update(){}
	
	//This method should be overridden by user
	draw(){}
}

class Physics {
	//Array of rigidbodies
	constructor( gravity="Undefined" ){
		this.gravity = gravity;
	}
	
	//Takes a rigidBody object
	// applies physics transformations to that object
	// then returns the altered object
	applyTo( rigidBody, fps ){
		//Apply physics here to gb's rigibBody
		if( this.gravity != "Undefined" ){
			var deltaGravity = this.gravity.divide(fps);
			rigidBody.velocity = rigidBody.velocity.add( deltaGravity );
		}
		if( rigidBody.velocity != "Undefined" ){
			var deltaVelocity = rigidBody.velocity.divide(fps);
			rigidBody.position = rigidBody.position.add( deltaVelocity ) ;
		}
		return rigidBody;
	}
	
	checkCollisions( gameObjects ){
		var k = 0;
		var size = gameObjects.length;
		
		while( k < size ){
			if( gameObjects[k].rigidBody != "Undefined" ){
				for( var i=k+1; i<size; i++ ){
					if( gameObjects[k].rigidBody.collider.isColliding( gameObjects[i].rigidbody.collider ) ){
						gameObjects[k].rigidBody.collisions[ gameObjects.rigidBody ];
						gameObjects[i].rigidBody.collisions[ gameObjects.rigidBody ];
					}
				}
				k++;
			}
		}
		
		return gameObjects;
	}
}

//User needs to provide dimensionality
class RigidBody {
	constructor( position ){
		this.mass = new Mass();
		this.position = position;
		this.velocity = "Undefined";
		this.forces = [];
		this.colliders = [];
		this.useGravity = false;
	}
	
	update(){
		//if collisions, then calculate deflection
		// then pop the collision
		if( this.colliders.length > 0 ){
			//there are some collisions
			
		}
		return this.position;
	}
	
	addCollider(){
		var numArguments = arguments.length;
		for( var i=0; i<numArguments; i++ ){
			colliders.push( argument[i] );
		}
	}
}

/*
	Collider types
	----------------
	Box			- Simple box with width and height
	Circle      - Simple circle with a radius
*/
class Collider {
	constructor( type="Undefined" ){
		this.position = new Vector( Game.defaultParam );
		this.type = type;
		//Colorize the collider for debugging
		this.collisions = [];
		this.debug = false;
	}
}

Collider.prototype = {
	isColliding( otherCollider ){
		if( otherCollider.position.x == this.position.x &&
			otherCollider.position.y == this.position.y &&
			otherCollider.position.z == this.position.z )
		{ 
			return true;
		}
		
		return false;
	}
}

class SphereCollider extends Collider {
	//Collider.apply( offset, "Sphere" );
	constructor( offset, radius ){
		super( "SphereCollider" );
		this.radius = radius;
		this.type = "SphereCollider";
	}
	
	isColliding( otherCollider ){
		if( otherCollider.type == "SphereCollider"){
			var position = this.position.add( objectPosition );
			var distance = position.distance( otherCollider.position );
			var sumRadii = this.radius + otherCollider.radius;
			
			if( distance < sumRadii ){
				return true;
			}
			
			return false;
		}
	}
}

class BoxCollider extends Collider {
	constructor( position, shape ){
		Collider.apply( position );
		this.shape = shape;
	}
}

class Mass{
	constructor(m){
		this.mass = m;
	}
}

class Vector {
	// Vector can be of any number of dimensions
	constructor(){
		this.c = arguments;
		this.size = arguments.length;
	}
	
	getMagnitude()
	{
		var magnitude = 0.0;
		
		// Add each squared component
		for( var i=0; i<this.c.length; i++ ){
			magnitude = magnitude + Math.pow( parseFloat(this.c[i]), 2.0 );
		}
		
		// Take sqare root of sum
		magnitude = Math.sqrt( magnitude );
		
		return magnitude;
	}
	
	getDirection(){
		
		var components = [];
		
		// Arguments format:  { "0": 1, "1": 2, "2": 3 }
		for( var i=0; i<this.c.length; i++ ){
			var parameter = {};
			components.push( this.c[i] / this.getMagnitude() );
		}
		
		var dirVector = new Vector;
		dirVector.c = components;
		
		return dirVector;
	}
	
	distance( otherVector ){
		//return distance between to vectors centered at (0,0,...,0)
		var distance = 0;
		var tmp = new Vector( 0,0 );
		var numArguments = arguments.length;
		for( var i=0; i<numArguments; i++ ){
			tmp.c[i] = otherVector.c[i] - this.c[i];
		}
		distance = tmp.getMagnitude();
		return distance;
	}
	
	// Vector addition
	add( addend ){
		var sum = new Vector();
		sum.c = this.c;
		
		var maxSize = this.size;
		if( addend.size > maxSize ){
			maxSize = addend.size;
			sum.c = addend.c;
			
			for( var i=0; i<maxSize; i++ ){
				if( typeof this.c[i] == "undefined" ){
					// Nothing to add
				}else{
					sum.c[i] += this.c[i];
				}
			}
		}else{
			for( var i=0; i<maxSize; i++ ){
				if( typeof addend.c[i] == "undefined" ){
					// Nothing to add
				}else{
					sum.c[i] += addend.c[i];
				}
			}
		}
		return sum;		
	}
	
	//Vector subtraction
	subtract( subtrahend ){
		var sum = new Vector();
		sum.c = this.c;
		
		var maxSize = this.size;
		if( subtrahend.size > maxSize ){
			maxSize = subtrahend.size;
			sum.c = subtrahend.c;
			
			for( var i=0; i<maxSize; i++ ){
				if( typeof this.c[i] == "undefined" ){
					// Nothing to add
				}else{
					sum.c[i] += this.c[i];
				}
			}
		}else{
			for( var i=0; i<maxSize; i++ ){
				if( typeof subtrahend.c[i] == "undefined" ){
					// Nothing to add
				}else{
					sum.c[i] += subtrahend.c[i];
				}
			}
		}
		
		return sum;	
	}
	
	// Scalar multiplication
	multiply( multiplier ){
		var tmp = new Vector();
		tmp.c = [];
		
		for( var i=0; i<this.size; i++ ){
			tmp.c.push( this.c[i] * multiplier );
		}
		
		return tmp;
	}
	
	//Scalar division
	divide( divisor ){
		var tmp = new Vector();
		tmp.c = [];
		
		for( var i=0; i<this.size; i++ ){
			tmp.c.push( this.c[i] * divisor );
		}
		
		return tmp;
	}
	
	//Vector dot product
	dot(){
		var numArguments = arguments.length;
		var minNumComponents = Infinity;
		
		for( var i=0; i<numArguments; i++ ){
			if( arguments[i] instanceof Vector ){
				if( arguments[i].c.length < minNumComponents ){
					minNumComponents = arguments[i].c.length;
				}
			}
		}
		
		var dotProduct = 0;
		
		for( var i=0; i<minNumComponents; i++ ){
			var product = 1;
			
			for( var j=0; j<numArguments; j++ ){
				if( typeof arguments[j].c[i] == "undefined" ){
					//product would be 0
					//nothing to add
				}else{
					product = this.c[i] * arguments[j].c[i];
				}
			}
			
			dotProduct += product;
		}
	
		return dotProduct;
	}
	
	//Vector cross product
	cross(){
		//This will be resolved later when the 
		// computation methods which I understand are more rigorous
		var crossProduct = "This has yet to be implemented. Sorry :(";
		return crossProduct;
	}
}

class Force extends Vector {
	//Force is constant if arguments[numArguments] == Infinity
	//Final argument i.e( arguments[numArguments] ) 
	// should be set to milliseconds to apply force
	constructor( force, time, fps ){
		var framesToApply = time * fps;
		//Make the force components such that they
		// are scaled to the force per frame
		for ( var i=0; i<force.size; i++){
			force.c[ i ] = force.c[ i ] / framesToApply;
		}
		super( force );
		this.framesRemaining = framesToApply;
	}
	
	apply(){
		this.framesRemaining--;
	}
	
	isDone(){
		var done = ( this.framesRemaining <= 0 );
		return done;
	}
}
class Impulse extends Force {
	constructor(force, fps){
		this.framesRemaining = 1;
		super( force, framesToApply );
	}
}

class Gravity extends Force {
	//Gravity is a constant force
	// therefore its time is Infinity
	constructor( gForce, fps ){
		super( gForce, Infinity );
	}
}