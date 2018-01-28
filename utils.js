const preNames = ['ConU', 'Octo', 'Bad', 'Sad', 'Rad', 'Sleepy', 'Big', 'Fast', 'Furious', 'Tall', 'Venti', 'Woke', 'Lil', 'Swole', 'OVO'];
const sufNames = ['Dog', 'Hacker', 'Coder', 'Cat', 'Wasp', 'Nerd', 'Mom', 'Ting', 'Mans', 'Goblin', 'Hobbit', 'Browski', 'Poet']

module.exports.nameRandomizer = function () {
  return getRandomString(preNames) + getRandomString(sufNames);
}

function getRandomString(arr) {
  return arr[Math.round((Math.random() * (arr.length - 1)))];
}