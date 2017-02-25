(() => {
  "use strict";

  /*
  This handles the canvas.
  */

  var mainloop;
  var last = null;
  var t = 0;
  var hitstun = 0.0;

  // Get Context.
  const canvas = document.getElementById('demo_canvas');
  const ctx = canvas.getContext("2d");

  // Player Properties.
  const player = new Pose(0.5, 0.9, 0, 0);
  const CHARACTER_SPEED = 0.5;
  const CHARACTER_ALT_SPEED = 0.2;
  const HITSTUN = 2.0;

  // Demo Main Bullet.
  var mainBullet = Bullet.nullBullet();

  // Define the main loop.
  mainloop = (timestamp) => {

    // Define start.
    last = last || timestamp;

    // Calculate change of time (milliseconds).
    const dt = (timestamp - last) / 1000;
    if (dt > 1.0) return;

    t += dt;

    // Check for restart.
    if(controls.checkOnce("r")) {
      t = 0;
      let demo = demos[demos.currentIdx];
      let script = document.getElementById("demo_script").value;
      demo.constants = JSON.parse(script);
      mainBullet = demo.mainBullet(canvas, ctx);
    }

    // Check for change of demo.
    if(demos.checkChange()) {
      t = 0;
      let demo = demos[demos.currentIdx];
      demo.constants = demo.defaultConstants;
      mainBullet = demo.mainBullet(canvas, ctx);
    }

    // Clear screen.
    (new Pose(0,0,0,0)).setAsCanvasTransformOf(canvas);
    ctx.fillStyle = "#261C21";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move player.
    {
      let dx = 0;
      let dy = 0;
      let speed = (controls.includes("shift")) ?
        CHARACTER_ALT_SPEED : CHARACTER_SPEED;
      if (controls.up()) dy -= 1;
      if (controls.down()) dy += 1;
      if (controls.left()) dx -= 1;
      if (controls.right()) dx += 1;
      if (dx != 0 && dy != 0) {dx *= 0.7; dy *= 0.7}
      dx *= speed * dt;
      dy *= speed * dt;
      player.x += dx;
      player.y += dy;
    }

    // Check collision.
    if (mainBullet.isHitting(t, player) && hitstun <= 0) {
      hitstun = HITSTUN;
    }

    // Draw player.
    player.setAsCanvasTransformOf(canvas);

    if (hitstun > 0) {
      if (hitstun * 40 % 2 > 1) {
        ctx.drawImage(cache["player_stroke"], -10, -12, 20, 24);
      }
      hitstun -= dt;
    } else {
      ctx.drawImage(cache["player_stroke"], -10, -12, 20, 24);
    }

    // Draw Bullets
    mainBullet.render(t)

    // Prepare for next frame.
    last = timestamp;
    window.requestAnimationFrame(mainloop);
  };

  // Start animation.
  window.requestAnimationFrame(mainloop);

})();
