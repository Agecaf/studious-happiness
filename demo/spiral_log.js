(() => {
  "use strict";

  const demo = {
    title: "Spiral - Logarithmic, Exponential",
    author: "Agecaf",
    text: `This one occurs a lot in nature, and is related to the complex
    logarithmic and exponential functions. It also gives the feeling of "zooming"
    in. Fairly basic, to make it simply have the position follow an exponential
    correspondence with time.
    `
  };

  demo.constants = {
    NBRANCHES: 5,
    LIFE: 3,
    DENSITY: 50,
    SPEED: 0.3,
    ROT: 0.21
  }

  demo.mainBullet = (canvas, ctx) => {

    const C = demo.constants;

    const staticDart =  new StaticBullet(
      (pose) => {
        pose.setAsCanvasTransformOf(canvas);
        ctx.drawImage(cache["circle_fill"], -8, -8, 16, 16);
      },
      (pose, point) => pose.dist(point) * canvas.width < 8
    )

    const center = new Pose(0.5,0.5,0,0);

    return Bullet.range(C.NBRANCHES,
      (j) =>
        Bullet.lifeRange(C.DENSITY, C.LIFE, 0,
          (i, t0) => {
            const p = center.rotate((j/C.NBRANCHES+t0*C.ROT)*TAU).delay(t0)

            return staticDart.withMovement(
              (t) => p.forward(Math.exp(t-p.t)*C.SPEED)
            ).after(p)
          }
        )

    )
  }


  demos.add(demo);
})();
