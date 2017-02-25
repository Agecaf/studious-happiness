((global) => {
  "use strict";

  /*
  This contains some useful movement generating functions.
  A movement function is a function taking time and returning a pose.
  They are used mostly to transform a static bullet (dependent on pose) into
  a bullet (dependent on time).

  Movement generating functions take various inputs and return a movement
  function. For example we can have linear movements which pass through a pose
  (point + direction + time) at a certain speed. In that case, the pose and
  the speed would be the input arguments.

  Movement functions can (and sometimes should) be written "on the spot" in
  scripts. This contains some of the either very common, very useful, or
  relatively hard to write but useful movement generating functions.

  Remark; throughout this document, speed is measured in 1 = 1 second to
  cross the screen. You generally want speeds such as 0.3 . These units where
  chosed since they are more intuitive than, say, pixels or cm.
  */

  const mv = {};


  // Linear movement passing through "pose" at "speed".
  mv.linear = (pose, speed) => { return (t) =>
    pose.forward(speed * (t - pose.t))
  };

  // Linear interpolation from "pose" to "target" (pose).
  mv.linearIplt = (pose, target) => { return (t) =>
    pose.towards(target).forward((t-pose.t)/(target.t-pose.t)*pose.dist(target))
  }






  global.mv = mv
})(this);
