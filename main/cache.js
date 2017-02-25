((global) => {
  "use strict";

  var assetSources;
  var cache;

  // Asset Sources.
  // Add here any extra assets.
  assetSources = {
    "circle_stroke" : {
      src : "./assets/circle_stroke.svg",
      width: 40,
      height: 40
    },
    "circle_fill" : {
      src : "./assets/circle_fill.svg",
      width: 40,
      height: 40
    },
    "dart_stroke" : {
      src : "./assets/dart_stroke.svg",
      width: 40,
      height: 40
    },
    "dart_fill" : {
      src : "./assets/dart_fill.svg",
      width: 40,
      height: 40
    },
    "player_stroke" : {
      src : "./assets/player_stroke.svg",
      width: 40,
      height: 40
    },
    "player_fill" : {
      src : "./assets/player_fill.svg",
      width: 40,
      height: 40
    }
  };

  // Initialize Cache, a dictionary of canvases.
  cache = {}

  // Create images for each source.
  Object
    .keys(assetSources)
    .forEach((key, index) => {
      var img;

      // Creates a canvas to cache the image.
      cache[key] = document.createElement('canvas');
      cache[key].width = assetSources[key].width;
      cache[key].height = assetSources[key].height;

      // Load image.
      img = new Image();
      img.src = assetSources[key].src;

      img.onload = () => {
        // Caches image by drawing it into its cache canvas.
        cache[key]
          .getContext("2d")
          .drawImage(
            img, 0, 0,
            assetSources[key].width,
            assetSources[key].height
          );
      };
    })

  global.cache = cache;

})(this);
