(() => {
  "use strict";

  const demo = {
    title: "Relative Positions",
    author: "Agecaf",
    text: `The second main idea is to know of a bullet's relative, rather than
    absolute, position. This allows us to repeat bullet patterns with ease,
    both at different places and at different times.
    <br><br>
    Challenges (Don't get hit!):<br>
    1) Reach the middle from outside.<br>
    2) Reach the outside from the middle.<br>
    3) Find a "blind spot" of the bullets inside their path.

    `
  };

  demo.constants = {
    R1: 0.2,
    R2: 0.1,
    N1: 5,
    N2: 7,
    S1: 1.0,
    S2: -2.0
  }

  demo.mainBullet = (canvas, ctx) => {

    const C = demo.constants;

    const staticDart =  new StaticBullet(
      (pose) => {
        pose.setAsCanvasTransformOf(canvas);
        ctx.drawImage(cache["dart_fill"], -5, -5, 10, 10);
      },
      (pose, point) => pose.dist(point) * canvas.width < 6
    )

    const staticCircle =  new StaticBullet(
      (pose) => {
        pose.setAsCanvasTransformOf(canvas);
        ctx.drawImage(cache["circle_fill"], -5, -5, 10, 10);
      },
      (pose, point) => pose.dist(point) * canvas.width < 6
    )

    const center = new Pose(0.5,0.5,0,0)

    const mainBullet = Bullet.range(C.N1,
      (i) => {
        const main_move = (t) => (
          center
            .rotate(t*C.S1 + i*TAU/C.N1)
            .forward(C.R1)
        )

        return Bullet.group([
          staticCircle.withMovement(main_move),
          Bullet.range(C.N2,
            (j) => staticDart.withMovement(
              (t) => (
                main_move(t)
                  .rotate(t*C.S2+ j*TAU/C.N2)
                  .forward(C.R2)
                  .rotate(-TAU/4)
              )
            )
          )
        ])
      }
    )

    return mainBullet
  }


  demos.add(demo);
})();
