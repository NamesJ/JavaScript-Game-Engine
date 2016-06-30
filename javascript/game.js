var g = window.onload = function(){
	var canvas = document.getElementById("GameMap");
	var ctx = canvas.getContext("2d");
	//Get instance of Game
	var dimensions = 2;
	var fps = 30;
	//Create Physics object
	var physics = new Physics();
	//Set size of canvas
	var width = 800;
	var height= 500;
	var canvasSize = new Vector( width, height );
	var game = new Game( ctx, canvasSize, dimensions, fps, physics );
	//Assign gravity object
	//game.physics.gravity = new Gravity( 0, -1, 0);
	
	var key = [];

	//Create player GameObject
	var position = new Vector(100,100);
	var player = new GameObject( "Player", position );
	//Define player rigidBody attribute
	var rigidBody = new RigidBody();
	player.setRigidBody( rigidBody );
	//Define player colliders
	var coll = new SphereCollider( player.position, 1 );
	player.rigidBody.colliders.push( coll );
	
	//Define draw method
	player.draw = function(){
		//console.log( this.position.c );
		//console.log( this.rigidBody.velocity.c );
		ctx.fillStyle = "#333333";
		ctx.beginPath();
		ctx.arc( this.position.c[0], this.position.c[1], 20, 0, 2*Math.PI );
		ctx.stroke();
	}

	//Add player to game
	player.rigidBody.velocity = new Vector( 0.1, 0 );
	game.addGameObject( player   );
	
	//Create platform object
	var platform = new GameObject("Platform")
	platform.position = new Vector( 200, 100 );
	platform.rigidBody = new RigidBody();
	
	//Define draw method
	platform.draw = function(){
		ctx.fillStyle = "#333333";
		ctx.beginPath();
		ctx.arc( this.position.c[0], this.position.c[1], 20, 0, 2*Math.PI );
		ctx.stroke();
	}

	//Define colliders for platform
	coll = new SphereCollider( platform.position, 2 );
	platform.rigidBody.colliders.push( coll );
	
	//Add platform to game
	game.addGameObject( platform );
	
	var loop = function(){
		setTimeout( function(){
			window.requestAnimationFrame( loop );
			game.update()
			game.draw();
		}, 1000 / Game.fps);
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
	
	game.start();
	loop();
}