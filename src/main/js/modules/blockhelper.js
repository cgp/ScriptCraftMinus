'use strict';
/*global module, exports, require, Packages, __plugin, server*/
var Facing = Packages.net.minecraft.util.EnumFacing,
    DoorHalf = Packages.net.minecraft.block.BlockDoor.EnumDoorHalf,
    HingePosition = Packages.net.minecraft.block.BlockDoor.EnumHingePosition,
    DyeColor = Packages.net.minecraft.item.EnumDyeColor,
    blocks = require('blocks'),
    bountiful = false;

if (__plugin.canary){
  bountiful = parseFloat(server.canaryModVersion) > 1.7;
}

var lookup = {};
function initLookup(){
  lookup = {
    facing: {
      0: Facing.EAST, 
      1: Facing.SOUTH, 
      2: Facing.WEST, 
      3: Facing.NORTH, 
      5: Facing.UP,
      east: Facing.EAST,
      south: Facing.SOUTH,
      west: Facing.WEST,
      north: Facing.NORTH,
      up: Facing.UP,
      down: Facing.DOWN
    },
    half: {   upper: DoorHalf.UPPER, lower: DoorHalf.LOWER },
    hinge: { left: HingePosition.LEFT, right: HingePosition.RIGHT },
    color: { 
      black: DyeColor.BLACK, 
      blue: DyeColor.BLUE, 
      brown: DyeColor.BROWN,
      cyan: DyeColor.CYAN, 
      gray: DyeColor.GRAY, 
      green: DyeColor.GREEN,
      lightblue: DyeColor.LIGHT_BLUE, 
      lime: DyeColor.LIME, 
      magenta: DyeColor.MAGENTA,
      orange: DyeColor.ORANGE, 
      pink: DyeColor.PINK, 
      purple: DyeColor.PURPLE,
      red: DyeColor.RED, 
      silver: DyeColor.SILVER, 
      white: DyeColor.WHITE,
      yellow: DyeColor.YELLOW,
      0: DyeColor.WHITE,
      1: DyeColor.ORANGE, 
      2: DyeColor.MAGENTA,
      3: DyeColor.LIGHT_BLUE, 
      4: DyeColor.YELLOW,
      5: DyeColor.LIME, 
      6: DyeColor.PINK, 
      7: DyeColor.GRAY, 
      8: DyeColor.SILVER, 
      9: DyeColor.CYAN, 
      10: DyeColor.PURPLE,
      11: DyeColor.BLUE,
      12: DyeColor.BROWN,
      13: DyeColor.GREEN,
      14: DyeColor.RED, 
      15: DyeColor.BLACK
    }
  };
}

function property( block ){
  var result;
  result = {
    get: function(p){
      var bp = block.getPropertyForName(p);
      return block.getValue(bp);
    },
    set: function(name,value){
      var bp = block.getPropertyForName(name);
      if (bp === null){
	console.warn(block + ' has no property named ' + name);
	return result;
      }
      if (lookup[bp.name]){
	value = lookup[bp.name][value];
      }
      block.setPropertyValue(bp, value);
      return result;
    }
  };
  return result;
}
exports.property = property;
/*
 blocks which have facing
 */
function applyFacing( block, metadata ){
  function face(direction){
    property(block).set('facing', lookup.facing[direction]);
  }
  switch( block.typeId ){
  case blocks.stairs.oak:
  case blocks.stairs.cobblestone:
  case blocks.stairs.brick:
  case blocks.stairs.stone:
  case blocks.stairs.nether:
  case blocks.stairs.sandstone:
  case blocks.stairs.spruce:
  case blocks.stairs.jungle:
  case blocks.stairs.quartz:
    face( ['east','west','south','north'][metadata] );
    break;
  case blocks.sign:
  case blocks.ladder:
    // bug: furnace, chest, dispenser don't always use the right metadata
  case blocks.furnace:  
  case blocks.furnace_burning: 
  case blocks.chest:
  case blocks.enderchest:
  case blocks.dispenser:
    face( [null,null,'north','south','west','east'][metadata] );
    break;
  case blocks.torch:
    face( ['up'/* default */,'east','west','south','north','up'][metadata] );
    break;
  }
}
function applyColors( block, metadata ){
  switch( block.typeId){
  case blocks.wool.white:
  case blocks.stained_clay.white:
  case blocks.stained_glass.white:
  case blocks.carpet.white:
    property(block).set('color',metadata);
  }
}
function applyRotation( block, metadata ){
  switch (block.typeId){
  case blocks.sign_post:
    if (metadata !== 0){
      property(block).set('rotation', new Packages.java.lang.Integer(metadata));
    }
  }
}
function applyDoors( block, metadata ){
  switch (block.typeId){
  case blocks.door_wood:
  case blocks.door_iron:
    switch (metadata) {
    case 8:
      property(block).set('hinge','left');
      property(block).set('half','upper');  
      break;
    case 9:
      property(block).set('hinge','right');
      property(block).set('half','upper');  
      break;

    default:
      property(block).set('facing',metadata);
      property(block).set('half','lower');
    }
  }
}
function applyProperties( block, metadata ){
  if (!bountiful){
    block.data = metadata;
    return;
  }
  if (!lookup.facing){
    initLookup();
  }
  applyFacing( block, metadata );
  applyColors( block, metadata );
  applyRotation( block, metadata );
  applyDoors( block, metadata );
}
exports.applyProperties = applyProperties;
