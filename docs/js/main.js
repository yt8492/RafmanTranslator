(function() {
  'use strict';

  let textAreaList = document.getElementsByTagName("textarea");
  let textAreas = Array.prototype.slice.call(textAreaList, 0);
  textAreas.forEach((textArea, _) => {
    let lineHeight = parseInt(textArea.style.lineHeight());
    textArea.addEventListener("input", e => {
      let lines = (textArea.value + '\n').match(/\n/g).length;
      textArea.style.height = lineHeight * lines;
    });
  });
})();