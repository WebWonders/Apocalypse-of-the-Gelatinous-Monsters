//gameScript


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;


//constants
var FPS = 30;
var LIVES = 4;
var NUM_BLOBS = 4;
var NUM_BULLETS = 5;
var DELAY_BULLET = 3;
var BULLET_LIFE = 20;
var SPREAD = 1;


var bullets;
var bulletTimer;


//key variables
var RArrow = 39;
var LArrow = 37;

// Array of key flags
var KeyDownA = [];
onkeydown = function(e) {
  e = e || event;
  KeyDownA [e.keyCode] = true;
};
onkeyup = function(e) {
  e = e || event;
  KeyDownA [e.keyCode] = undefined;
};
//shooting key flags
var KeyDownX = [];
onkeydown2 = function(e) {
  e = e || event;
  KeyDownX [e.keyCode] = true;
};
onkeyup2 = function(e) {
  e = e || event;
  KeyDownX [e.keyCode] = undefined;
};

function Blob(){
        var tBlob = new Sprite(canvas, '#', 20, 20, 0, 0, 'tBlob');

        tBlob.die = function(){
            tBlob.hide();
        } // end die()

        return tIsland;
    } // end island

function makeBlobs(){
  blobs = new Array(NUM_BLOBS);
  for (i = 0; i < NUM_BLOBS; i++){
    blobs[i] = new Blob();
  } // end for
} // end makeBlobs()

function Bullet() {
    var th = Sprite(canvas, '#', 10, 10, 0, 0, 'bullet');
    th.hide();
    return th;

} //end Bullet()


/*--------------------------------
   Create and log all bullet sprites.
*/

function makeBullets(){
    bullets = [];
    for (i = 0; i < NUM_BULLETS; i++)
        bullets.push(Bullet());
} // end makeBullets


/*--------------------------------
   Animation code for bullet sprites.
*/

function updateBullets(){
    var th;
    for (i = 0; i < bullets.length; i++){
        if ((th = bullets[i]).visible) {
            if (th.bulletLife > 0)
                th.bulletLife--;
            else
                th.hide();
            th.update();
        } //endif
    } // end for
    // This regulates the number of simultaneous
    // bullets that can be fired.
    if (bulletTimer > 0)
        bulletTimer--;
} // end updateBullets


function fireBullet () {
    var i, th;
    // If too soon to fire a bullet,
    if (bulletTimer > 0)
        // Do nothing...
        return;
    // Loop through available bullets
    // looking for an available sprite...
    for (i = 0; i < bullets.length; i++) {
        if (!(th = bullets[i]).visible) {
           // Delay next bullet firing...
           bulletTimer = DELAY_BULLET;
           // Bullet flight time...
           th.bulletLife = BULLET_LIFE;
           // Set angle of bullet motion...
           th.setMoveAngle(-90 + spaceShip.getImgAngle() + (Math.random() * SPREAD) - (SPREAD / 2));
           // Now the speed, based on how fast ship is moving.
           th.setSpeed(spaceShip.getSpeed() + 20);
           // Start bullet at location of ship...
           th.setPosition(spaceShip.x, spaceShip.y);
           // Make bullet visible.
           th.show();
           return;
        }
    }
}
