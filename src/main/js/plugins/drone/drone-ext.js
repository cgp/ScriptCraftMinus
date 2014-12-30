var utils = require('utils'),
  blocks = require('blocks'),
  Drone = require('./drone').Drone;

Drone.extend('box_outline', function(x,y,z) { 
  echo(this.x);
  
  this.chkpt( 'start_point' );
  var orig = {"x":this.x,"y":this.y,"z":this.z};

   this.copy("vis_a_", x,1,1)
  .copy("vis_b_", 1,y,1)
  .copy("vis_c_", 1,1,z) 
  .move(orig.x+x, orig.y, orig.z+z, 2)  
  .copy("vis_d_", x,1,1)
  .copy("vis_e_", 1,y,1)
  .copy("vis_f_", 1,1,z) 
  .move(orig.x+x, orig.y, orig.z, 0)
  .copy("vis_g_", 1,y,1)
  .move(orig.x, orig.y, orig.z+z, 0)
  .copy("vis_h_", 1,y,1)
  .move(orig.x+x, orig.y+y, orig.z+z, 2)
  .copy("vis_i_", 1,1,z)
  .copy("vis_j_", x,1,1)
  .move(orig.x, orig.y+y, orig.z, 0)
  .copy("vis_k_", 1,1,z)
  .copy("vis_l_", x,1,1)
  .move( 'start_point' );

  this.box(blocks.glass, x,1,1)
  .box(blocks.glass, 1,y,1)
  .box(blocks.glass, 1,1,z) 
  .move(orig.x+x, orig.y, orig.z+z, 2)  
  .box(blocks.glass, x,1,1)
  .box(blocks.glass, 1,y,1)
  .box(blocks.glass, 1,1,z) 
  .move(orig.x+x, orig.y, orig.z, 0)
  .box(blocks.glass, 1,y,1)
  .move(orig.x, orig.y, orig.z+z, 0)
  .box(blocks.glass, 1,y,1)
  .move(orig.x+x, orig.y+y, orig.z+z, 2)
  .box(blocks.glass, 1,1,z)
  .box(blocks.glass, x,1,1)
  .move(orig.x, orig.y+y, orig.z, 0)
  .box(blocks.glass, 1,1,z)
  .box(blocks.glass, x,1,1)
  .move( 'start_point' );

   this.paste("vis_a_")
  .paste("vis_b_")
  .paste("vis_c_")
  .move(orig.x+x, orig.y, orig.z+z, 2)  
  .paste("vis_d_")
  .paste("vis_e_")
  .paste("vis_f_")
  .move(orig.x+x, orig.y, orig.z, 0)
  .paste("vis_g_")
  .move(orig.x, orig.y, orig.z+z, 0)
  .paste("vis_h_")
  .move(orig.x+x, orig.y+y, orig.z+z, 2)
  .paste("vis_i_")
  .paste("vis_j_")
  .move(orig.x, orig.y+y, orig.z, 0)
  .paste("vis_k_")
  .paste("vis_l_")
  .move( 'start_point' );  
});