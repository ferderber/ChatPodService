const preNames = ['ConU', 'Octo', 'Bad', 'Sad', 'Rad'];
const sufNames = ['Dog', 'Hacker', 'Coder']

module.exports.nameRandomizer = function () {
  return getRandomString(preNames) + getRandomString(sufNames);
}

function getRandomString(arr) {
  return arr[Math.round((Math.random() * (arr.length - 1)))];
}