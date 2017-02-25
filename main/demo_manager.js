/* Manages demos
* Adding new demos, as well as handling and declaring change of demos.
*/

((global) => {
  "use strict";

  const demos = [];
  demos.currentIdx = 0;
  demos.hasChanged = false;

  demos.add = (demo) => {
    // Define default constants.
    demo.defaultConstants = demo.constants;

    // Add demo to our list.
    demos.push(demo);

    // Add it to the options the user can choose.
    const option = document.createElement("option");
    option.text = demo.title;
    document.getElementById('demo_select').add(option);
  };

  document.addEventListener('DOMContentLoaded',function() {
    document.getElementById('demo_select').onchange = changeDemoEvent;
  }, false);

  function changeDemoEvent(event) {
    const idx = document.getElementById('demo_select').selectedIndex;
    const script = JSON.stringify(demos[idx].defaultConstants);
    if(idx < 0) return;



    document.getElementById("demo_title").innerHTML = demos[idx].title;
    document.getElementById("demo_author").innerHTML = demos[idx].author;
    document.getElementById('demo_text').innerHTML = demos[idx].text;
    document.getElementById('demo_script').value = script;


    demos.currentIdx = idx;
    demos.hasChanged = true;
  }

  demos.checkChange = () => {
    if(demos.hasChanged == true){
      demos.hasChanged = false;
      return true;
    }
    return false;
  }

  global.demos = demos;

})(this);
