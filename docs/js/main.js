window.addEventListener("load", function() {
  'use strict';

  let textAreaList = document.getElementsByTagName("textarea");
  let textAreas = Object.values(textAreaList);
  textAreas.forEach((textArea, index) => {
    textArea.addEventListener("input", e => {
      let lines = (textArea.value + '\n').match(/\n/g).length;
      textArea.rows = Math.max(2,lines); //textareaの高さを動的に変える
      if (textArea.className == "input") {
        let translatedText = translate(textArea);
        let outputTextArea = textArea.parentNode.getElementsByClassName("output")[0];
        outputTextArea.value = translatedText;
      }
    });
  });
});

/**
 * textareaを渡し翻訳後の文章を返す
 * @param {textarea} textArea 翻訳前の文字列が入力されたtextarea
 * @returns {String} 翻訳後の文字列
 */
function translate(textArea) {
  console.log("translate");
  let inputText = textArea.value;
  let outputText = "";
  let mode;
  if (textArea.id == "RtJ_in") {
    mode = 0;
  } else if (textArea.id == "JtR_in") {
    mode = 1;
  }
  [].forEach.call(inputText, s => {
    outputText += convert(mode, s);
  });
  return outputText;
}

/**
 * 日本語->ラフム語、ラフム語->日本語の変換を1文字ずつする
 * @param {Number} mode ラフム語->日本語の場合0, 日本語->ラフム語の場合1
 * @param {String} char 変換する文字
 * @returns {String} 変換後の文字
 */
function convert(mode, char) {
  const rafman = [  "3", "e", "4", "5", "6", "t", "g", "h", ":", "b", "x", "d", "r", "p", "c", 
                    "q", "a", "z", "w", "s", "u", "i", "1", "<", "k", "f", "v", "2", "^", "-",
                    "j", "n", "]", "/", "m", "7", "8", "9", "o", "l", ".", ";", "\\", "0", "=", "y",
                    "t@", "g@", "h@", ":@", "b@", "x@", "d@", "r@", "p@", "c@", "q@", "a@", "z@", "w@", "s@",
                    "f@", "v@", "2@", "^@", "-@", "f[", "v[", "2[", "^[", "-[", "@", "["];
  const japanese = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ",
                    "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ",
                    "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん",
                    "が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ", "だ", "ぢ", "づ", "で", "ど",
                    "ば", "び", "ぶ", "べ", "ぼ","ぱ", "ぴ", "ぷ", "ぺ", "ぽ", "゛", "゜"];
  const array = [rafman, japanese];
  let index = array[mode % 2].findIndex(e => e == char);
  if (index >= 0) {
    return array[(mode + 1) % 2][index];
  } else {
    return char;
  }
}