window.addEventListener("load", function() {
  'use strict';

  let textAreas = Array.from(document.getElementsByTagName("textarea"));
  textAreas.forEach(textArea => {
    textArea.addEventListener("input", e => {
      if (textArea.className == "input") {
        let lines = (textArea.value + '\n').match(/\n/g).length;
        textArea.rows = Math.max(2,lines); //textareaの高さを動的に変える
        let translatedText = translate(textArea);
        let outputTextArea = textArea.parentNode.getElementsByClassName("output")[0];
        outputTextArea.value = translatedText;
        outputTextArea.rows = Math.max(2,lines);
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
  let inputText = Array.from(textArea.value);
  let outputText = "";
  let mode;
  if (textArea.id == "RtJ_in") {
    mode = 0;
  } else if (textArea.id == "JtR_in") {
    mode = 1;
  }

  inputText.forEach(s => {
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
                    "f@", "v@", "2@", "^@", "-@", "f[", "v[", "2[", "^[", "-[",
                    "3", "e", "4", "5", "6", "z", "7", "8", "9",
                    "3", "e", "4", "5", "6", "t", "g", "h", ":", "b", "x", "d", "r", "p", "c", 
                    "q", "a", "z", "w", "s", "u", "i", "1", "<", "k", "f", "v", "2", "^", "-",
                    "j", "n", "]", "/", "m", "7", "8", "9", "o", "l", ".", ";", "\\", "0", "=", "y",
                    "t@", "g@", "h@", ":@", "b@", "x@", "d@", "r@", "p@", "c@", "q@", "a@", "z@", "w@", "s@",
                    "f@", "v@", "2@", "^@", "-@", "f[", "v[", "2[", "^[", "-[",
                    "3", "e", "4", "5", "6", "z", "7", "8", "9",
                    "@", "["];

  const japanese = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ",
                    "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ",
                    "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん",
                    "が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ", "だ", "ぢ", "づ", "で", "ど",
                    "ば", "び", "ぶ", "べ", "ぼ","ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
                    "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "っ", "ゃ", "ゅ", "ょ",
                    "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ",
                    "タ", "チ", "ツ", "テ", "ト", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ",
                    "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ン",
                    "ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ダ", "ヂ", "ヅ", "デ", "ド",
                    "バ", "ビ", "ブ", "ベ", "ボ","パ", "ピ", "プ", "ペ", "ポ",
                    "ァ", "ィ", "ゥ", "ェ", "ォ", "ッ", "ャ", "ュ", "ョ",
                    "゛", "゜"];

  const array = [rafman, japanese];
  let index = array[mode % 2].findIndex(e => e == char);
  if (index >= 0) {
    return array[(mode + 1) % 2][index];
  } else {
    return char;
  }
}