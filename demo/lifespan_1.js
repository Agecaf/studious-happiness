(() => {
  "use strict";

  const demo = {
    title: "Lifespan 1 - Eternal Bullets",
    author: "Agecaf",
    text: `These demos showcase the "lifespan" of bullets and how changing
      it can make the patterns significantly different. In these examples, we're
      taking three simple archimedean spiral examples, using linear movement.
      <br><br>
      In this example, we chose to not restrict the lifespan at all. Bullets
      exist (and are rendered) even after they leave the screen, and even before
      they enter it.
      <br><br>
      This particular example uses 200 bullets (so they'll stop eventually!)
      `
  };

  demo.constants = {
    NBULLETS: 200,
    SPEED: 0.4,
    FREQ: 0.1,
    ROT: 1/40
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

    const center = new Pose(0.5,0.5,0,0);

    return Bullet.range(C.NBULLETS,
      (i) => {
        return staticDart.withMovement(
          mv.linear(center.rotate(i*TAU*C.ROT).delay(i*C.FREQ), C.SPEED)
        )
      }
    )
  }


  demos.add(demo);
})();
