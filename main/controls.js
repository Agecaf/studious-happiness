((global) => {
  "use strict";

  const controls = [];

  controls.up = () => controls.includes("w");
  controls.down = () => controls.includes("s");
  controls.left = () => controls.includes("a");
  controls.right = () => controls.includes("d");

  document.addEventListener('keydown', (event) => {
    const keyName = event.key.toLowerCase();
    if (controls.indexOf(keyName) == -1) {
      controls.push(keyName);
    }
  });

  document.addEventListener('keyup', (event) => {
    const keyName = event.key.toLowerCase();
    const idx = controls.indexOf(keyName);

    if (idx >= 0) {
      controls.splice(idx, 1);
    }
  });

  controls.checkOnce = (keyName) => {
    const idx = controls.indexOf(keyName);
    if (idx >= 0) {
      controls.splice(idx, 1);
      return true;
    }
    else {
      return false;
    }
  };

  global.controls = controls;

})(this);
