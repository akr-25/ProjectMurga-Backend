exports.getMonth = function (mon) {
  let ind = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf("Jun") / 3 + 1;
  let ans = "0";
  ans += ind.toString();
  var l = ans.length;

  return ans.substring(l - 2, 2);
};
