EventRegistry
=============

EventRegistry extension for EventEmitter.js

Registers any class or object with a specified EventEmitter.  Objects can communicate through events instead of using callbacks.

	var Person = function(name) {
			this.name = name;
		};

		// Person prototype
		Person.prototype = {
			greet : function() {
				alert("Hi, my name is " + this.name)
			},
			reply : function() {
				alert('Nice to meet you! I\'m ' + this.name);
			}
		};

		//Create new emitter
		var emitter = new EventEmitter();

		//Register the Person class to the emitter.
		//This can also be done at the instance or object level. 
		emitter.register(Person);

		//Create 2 Persons'
		var me = new Person("Steven");
		var you = new Person("David");

		me.on('greet', function() {
			this.reply();
		});

		//Greet and then emit to everyone on this emitter
		you.greet();
		you.emit('greet');