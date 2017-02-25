(() => {
  "use strict";

  const demo = {
    title: "Eternal Bullets",
    author: "Agecaf",
    text: `These demos showcase bullets which rather than being thought of
      as points whose position changes each frame, we think of them as points
      whose position in space at each moment in time is already determined,
      similar to how the position of a clock's hands is determined by the
      time of the day.
      <br><br>
      Challenges:<br>
      1) Hit the bullet!<br>
      2) Orbit the bullet!`
  };

  demo.constants = {
    SPEED: 1.0,
    RADIUS: 0.3
  }

  demo.mainBullet = (canvas, ctx) => {

    const C = demo.constants;

    const staticDart =  new StaticBullet(
      (pose) => {
        pose.setAsCanvasTransformOf(canvas);
        ctx.drawImage(cache["dart_fill"], -10, -10, 20, 20);
      },
      (pose, point) => pose.dist(point) * canvas.width < 12
    )

    return staticDart.withMovement(
      (t) => (
        (new Pose(0.5,0.5,0,0))
          .rotate(t*C.SPEED)
          .forward(C.RADIUS)
          .rotate(TAU/4)
      )
    )
  }


  demos.add(demo);
})();
