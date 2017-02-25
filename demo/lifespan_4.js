(() => {
  "use strict";

  const demo = {
    title: "Lifespan 4 - Living Bullets",
    author: "Agecaf",
    text: `These demos showcase the "lifespan" of bullets and how changing
      it can make the patterns significantly different. In these examples, we're
      taking three simple archimedean spiral examples, using linear movement.
      <br><br>
      In this example, we use a combination of "before" and "after" to let the
      bullet live for a certain amount of time. In practical purposes, we'd
      most commonly use this pattern, but have the bullets "disappear" only
      when we're sure they're outside the screen. Otherwise we could have a
      bunch of bullets being rendered when they can't be seen.
      <br>
      This is useful when you want a bullet to "reach somewhere", where it
      could very well be "replaced" by another bullet. See "Combined Bullets".
      <br><br>
      This particular example uses 20000 bullets, to prove the point that this
      is useful with loads of bullets. Note all bullets are considered each
      frame, but only those that are "alive" are rendered (and have a hitbox).
      `
  };

  demo.constants = {
    NBULLETS: 20000,
    SPEED: 0.4,
    FREQ: 0.1,
    ROT: 1/40,
    LIFE: 1.0
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
        const p = center.rotate(i*TAU*C.ROT).delay(i*C.FREQ)

        return staticDart.withMovement(
          mv.linear(p, C.SPEED)
        ).lifespan(p, C.LIFE)
      }
    )
  }


  demos.add(demo);
})();
