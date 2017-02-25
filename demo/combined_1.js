(() => {
  "use strict";

  const demo = {
    title: "Combined - Simple Example",
    author: "Agecaf",
    text: `Remember lifespans? Well, here's a trick; we can make a bullet be
      born at exactly the same position where another has just died... effectively
      replacing a bullet with another with a different behaviour. <br><br>
      This is useful for "staging" bullets before launching them, or to create
      certain patterns.<br><br>
      In this example, we actually change the color and size of the bullet to
      emphasize that it's actually different bullets... but we could use exactly
      the same sprite to make it seem like it's "the same bullet, but with different
      behaviours". Whereas, what would actually be happening is... The bullet got
      replaced with his evil doppleganger!
      `
  };

  demo.constants = {
    L1: 0.5,
    L2: 1,
    L3: 20,
    S1: 0.1,
    S2: 0.3,
    S3: 0.02,
    DENSITY: 500
  }

  demo.mainBullet = (canvas, ctx) => {

    const C = demo.constants;

    const sb1 =  new StaticBullet(
      (pose) => {
        pose.setAsCanvasTransformOf(canvas);
        ctx.drawImage(cache["rhombus_1"], -8, -4, 16, 8);
      },
      (pose, point) => pose.dist(point) * canvas.width < 4
    )

    const sb2 =  new StaticBullet(
      (pose) => {
        pose.setAsCanvasTransformOf(canvas);
        ctx.drawImage(cache["rhombus_2"], -10, -5, 20, 10);
      },
      (pose, point) => pose.dist(point) * canvas.width < 5
    )

    const sb3 =  new StaticBullet(
      (pose) => {
        pose.setAsCanvasTransformOf(canvas);
        ctx.drawImage(cache["rhombus_3"], -14, -7, 28, 14);
      },
      (pose, point) => pose.dist(point) * canvas.width < 7
    )

    const center = new Pose(0.5,0.5,0,0);

    return Bullet.lifeRange(C.DENSITY, C.L1+ C.L2 + C.L3, 0,
      (i, t0) => {
        const p1 = center.rotate(i*2.4).delay(t0);
        const m1 = mv.linear(p1, C.S1);
        const p2 = m1(p1.t + C.L1);
        const m2 = mv.linear(p2, C.S2);
        const p3 = m2(p2.t + C.L2);
        const m3 = mv.linear(p3, C.S3);

        return Bullet.group([
          sb2.withMovement(m1).lifespan(p1, C.L1),
          sb1.withMovement(m2).lifespan(p2, C.L2),
          sb3.withMovement(m3).lifespan(p3, C.L3)
        ])
      }
    )

  }


  demos.add(demo);
})();
