var utils = require('utils'),
  blocks = require('blocks'),
  Drone = require('./drone').Drone;

/************************************************************************
### Loading and Saving Copied Areas using Drone

From time to time, you'll refresh, and lose a copied area, or worse, you'll tinker with it, and want what you had back.

### Drone.save() method

Saves a pre-existing copy to disk.

#### Parameters

 * name - the name of the copied area to save to disk

#### Example

    drone.copy('somethingCool',10,5,10 ).save('somethingCool');

### Drone.load() method

#### Parameters

 * name - the name of the copied area to load from disk

Pastes a copied area to the current location.

#### Example


***/

function save(name) {
	if (!Drone.clipBoard[name]) {
		echo(name + " was not found in the clipboard. You must first save it.");
	}
	// should remove arbitrary characters from the path to prevent abuse
	var filename = name.replace(/[^a-z0-9]/gi, '_')+".json";
	scsave(Drone.clipBoard[name], name+'.json');
}

function load(name) {
	// disallow incoming arbitrary characters from the path to prevent abuse
	var filename = name.replace(/[^a-z0-9]/gi, '_')+".json";
	Drone.clipBoard[name] = scload(name+'.json');
}


Drone.extend( save );
Drone.extend( load );