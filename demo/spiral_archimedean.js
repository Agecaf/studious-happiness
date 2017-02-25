(() => {
  "use strict";

  const demo = {
    title: "Spiral - Archimedean",
    author: "Agecaf",
    text: `Archimedean spirals are perhaps the most basic and easy to write
      spirals, though they are not the most "natural" ones. Simply put... you
      "throw" out bullets at constant speed and get sort of multiple "walls" at
      equal distance from each other. <br><br> I added more spirals to make the
      pattern clearer without having to make the bullets painfully slow. A single
      Archimedean spiral would look like when you have<br>
      {"NBRANCHES":1,"LIFE":25,"DENSITY":500,"SPEED":0.03,"ROT":0.2}
      `
  };

  demo.constants = {
    NBRANCHES: 5,
    LIFE: 3,
    DENSITY: 30,
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
              mv.linear(p, C.SPEED)
            )
          }
        )

    )
  }


  demos.add(demo);
})();
