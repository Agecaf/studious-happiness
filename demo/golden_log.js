(() => {
  "use strict";

  const demo = {
    title: "Golden Angle - Logarithmic, Exponential",
    author: "Agecaf",
    text: `The golden angle is about 2.4 radians. If we rotate by it, and keep
      rotating by that angle, we get shapes that look like pinecones, and other
      things in nature. It is an angle found in pentagons, I think.<br><br>
      Again, having the bullets follow the exponential function gives the
      illusion that we're "zooming in".
      `
  };

  demo.constants = {
    LIFE: 5,
    DENSITY: 300,
    SPEED: 0.005
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

    return Bullet.lifeRange(C.DENSITY, C.LIFE, 0,
      (i, t0) => {
        const p = center.rotate(i*2.4).delay(t0)

        return staticDart.withMovement(
          (t) => p.forward(Math.exp(t-p.t)*C.SPEED)
        )
      }
    )

  }


  demos.add(demo);
})();
