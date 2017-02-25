(() => {
  "use strict";

  const demo = {
    title: "Combined - Bezier Curves",
    author: "Agecaf",
    text: `In this example we combine Bezier interpolation with linear motion.
      Note how the movement of the
      bullets far from the center is basically linear... However, if you focus
      on the center you'll realise things start rotating in a smooth way.<br>
      <br>
      That's Bezier curves. Their job is to interpolate between positions in
      space-time in a way that allows us to choose the position, direction and
      speed of the bullets at each point. Try changing S0 and S1 to see how it
      does use the appropriate speeds. Also, what happens when you change L0?
      and what about R0, R1?
      `
  };

  demo.constants = {
    L0: 1.5,
    L1: 3,
    R0: 0.1,
    R1: 0.2,
    RADIUS: 0.2,
    S0: 0.1,
    S1: 0.3,
    NCIRCLE: 24,
    DENSITY: 10

  }

  demo.mainBullet = (canvas, ctx) => {

    const C = demo.constants;

    const sb1 =  new StaticBullet(
      (pose) => {
        pose.setAsCanvasTransformOf(canvas);
        ctx.drawImage(cache["rhombus_1"], -12, -6, 24, 12);
      },
      (pose, point) => pose.dist(point) * canvas.width < 6
    )

    const center = new Pose(0.5,0.5,0,0);

    return Bullet.lifeRange(C.DENSITY, C.L0 + C.L1, 0,
      (i, t0) => {
        const p = center.rotate(i*2.4).delay(t0);

        return Bullet.range(C.NCIRCLE,
          (j) => {
            const p0 = p.rotate(j*TAU/C.NCIRCLE)
            const p1 = (
              p0
                .rotate(C.R0*TAU*(i%2==0?1:-1))
                .forward(C.RADIUS)
                .rotate(C.R1*TAU*(i%2==0?1:-1))
                .delay(C.L0)
            )
            const m0 = mv.bezier(p0, C.S0, p1, C.S1);
            const m1 = mv.linear(p1, C.S1);

            return Bullet.group([
              sb1.withMovement(m0).lifespan(p0, C.L0),
              sb1.withMovement(m1).lifespan(p1, C.L1)
            ])
          }
        )
      }
    )
  }


  demos.add(demo);
})();
