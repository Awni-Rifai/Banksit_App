'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnSignup = document.querySelector('.signup__window');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const btnBalanceUsd = document.querySelector('.btn-balance-usd');
const btnBalanceEURO = document.querySelector('.btn-balance-euro');
const closeSignup = document.querySelector('.close__signup__window');
const ownerNew = document.querySelector('.owner__form');
const depositeNew = document.querySelector('.deposite__form');
const pinNew = document.querySelector('.pin__form');
const signup = document.querySelector('.signup');
const todaysDate = document.querySelector('span.date');
const signupForm = document.querySelector('.signup__form_form');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//DOSNT MUTATE //**ANOTHER WAY */ //console.log([...arr, ...arr2]); //************************************************************** */ //************************************************************** */ //*********************LECTURE2***************************************** */
/*btnLogin.onclick = function () {
  document.querySelector('.welcome').innerHTML = 'heloo';
};*/

/*const displaymovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">2 deposit</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};*/
//________________________________________________________
//!UserName Function
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

//_____________________________________________________________
//______________________________________________________
//! Signing up
const signupWindow = () => {
  document.querySelector('.hide__background').classList.toggle('overlay');
  document.querySelector('.create__user').classList.toggle('hide__signup');
};
btnSignup.addEventListener('click', function () {
  signupWindow();
});
closeSignup.addEventListener('click', function () {
  signupWindow();
});
signupForm.addEventListener('submit', function (e) {
  if (
    ownerNew.value === '' ||
    depositeNew.value === '' ||
    pinNew.value === ''
  ) {
    alert('wrong input');
    e.preventDefault();
    return;
  }
  e.preventDefault();
  const dataArr = [...new FormData(this)];
  console.log(dataArr);
  this.reset();
  signupWindow();
  processingUserData(dataArr);
});
const processingUserData = function (data) {
  const acc = {
    owner: capitilizeFirstLetter(data[0][1]),
    movements: [Number(data[1][1])],
    pin: Number(data[2][1]),
    movementsDates: ['2019-11-01T13:15:33.035Z'],
    interestRate: 1,
  };
  accounts.push(acc);
  createUsernames(accounts);
};
const capitilizeFirstLetter = function (str) {
  return str
    .split(' ')
    .map(word => (word = word[0].toUpperCase() + word.slice(1)))
    .join(' ');
};

//________________________________________________________

//! signUp button
/*btnSignup.addEventListener('click', function () {
  document.querySelector('.create__user').classList.toggle('hide__signup');

  document.querySelector('.app').classList.toggle('hide__signup');
});
closeSignup.addEventListener('click', function () {
  document.querySelector('.create__user').classList.toggle('hide__signup');
  document.querySelector('.app').classList.toggle('hide__signup');
  document.querySelector('.signup__form_form').reset();
});

//______________________________________________________________
//___________________________________________________________________________
//! signup information
signup.addEventListener('click', function (e) {
  e.preventDefault();
  const newName = ownerNew.value;
  const newDeposit = Number(depositeNew.value);
  const newPin = Number(pinNew.value);
  if (newName !== '' && newPin !== '' && Number(newDeposit) > 0) {
    const signupInformation = {
      owner: newName,
      movements: [newDeposit],
      pin: newPin,
      interestRate: 1.5,
    };
    accounts.push(signupInformation);
    containerApp.classList.add('hide');
    document.querySelector('.signup__form_form').reset();

    document.querySelector('.create__user').classList.toggle('hide__signup');
    document.querySelector('.log__in').textContent =
      'Thank you for signing up log in to get started';
    document.querySelector('.log__in').classList.toggle('after__signup');
    console.log(accounts);
    createUsernames(accounts);
  }
});
*/
//_____________________________________________________________________________
//! BALANCE FUNCTION
const calcPrintBalance = function (movements, type) {
  type = type.toUpperCase();
  if (type === '€') {
    const totalBalance = movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${totalBalance}€`;
    currentAccount.balance = totalBalance;
  }
  if (type === '$') {
    const totalBalance = euroToUSD(movements, 1.1).reduce(
      (acc, mov) => acc + mov,
      0
    );
    currentAccount.balance = totalBalance;

    labelBalance.textContent = `${totalBalance}$`;
  }
};

//_____________________________________________________________
//calcPrintBalance(account1.movements, 'EURO');
//________________________________________________________________________________
//!CONVERSIONTOUSD FUNCTIOM
const euroToUSD = (arr, euroToUSD) =>
  currentAccount.movements.map(mov => Math.trunc(mov * euroToUSD));
//_________________________________________________________________________________
//! Button USD AND Button EURO

/*btnBalanceUsd.addEventListener('click', function () {
  btnBalanceUsd.addEventListener(
    'click',
    calcPrintBalance(currentAccount.movements, 'USD')
  );
  calcDisplaySummary(currentAccount.movements, '$');
  displayMovements(currentAccount.movements, '$');
  btnBalanceUsd.classList.toggle('hide');
  btnBalanceEURO.classList.toggle('hide');
});
btnBalanceEURO.addEventListener('click', function () {
  btnBalanceEURO.addEventListener(
    'click',
    calcPrintBalance(currentAccount.movements, 'EURO')
  );
  btnBalanceUsd.classList.toggle('hide');
  btnBalanceEURO.classList.toggle('hide');
  calcDisplaySummary(currentAccount.movements, '€');
  displayMovements(currentAccount.movements, '€');
});*/
//!_________________________________________________________________________________________
//_________________________________________________________________________
//!not added in OOP file
btnBalanceUsd.addEventListener('click', function () {
  updateUI(currentAccount, '$');
  btnBalanceUsd.classList.toggle('hidebtn');
  btnBalanceEURO.classList.toggle('hidebtn');
});
btnBalanceEURO.addEventListener('click', function () {
  updateUI(currentAccount);

  btnBalanceUsd.classList.toggle('hidebtn');
  btnBalanceEURO.classList.toggle('hidebtn');
});

//____________________________________________________________________________________
const displayMovements = function (currentAccount, curr = '€', sort = false) {
  if (curr === '$')
    currentAccount.movements = euroToUSD(currentAccount.movements, 1.1);
  containerMovements.innerHTML = '';
  const movs = sort
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : currentAccount.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(currentAccount.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const minutes = `${date.getMinutes()}`.padStart(2, 0);
    const currentDate = `${day}/${
      date.getMonth() + 1
    }/${date.getFullYear()},   ${date.getHours()}:${minutes}`;

    // Template literals are amazing since you can write mutiple lines of string
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${currentDate}</div>
    
      <div class="movements__value">${mov}${curr}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//______________________________________________________________________________
//!Summary function
const calcDisplaySummary = function (movements, type) {
  type = type.toUpperCase();

  if (type === '$') {
    movements = euroToUSD(movements, 1.1);
  }
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur);
  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, cur, i, arr) => acc + cur * -1, 0);
  //Here the bank dosn't give the interest if it's below 1
  const interest = Math.trunc(
    movements
      .filter(mov => mov > 0)
      .map(dep => (dep * currentAccount.interestRate) / 100)
      .filter(int => int > 1)
      .reduce((acc, int) => acc + int)
  );

  labelSumIn.textContent = `${incomes}${type}`;
  labelSumOut.textContent = `${outcomes}${type}`;
  labelSumInterest.textContent = `${interest}${type}`;
};
//________________________________________
//!Update UI function
const updateUI = function (currentAccount, type = '€') {
  displayMovements(currentAccount, type);
  calcDisplaySummary(currentAccount.movements, type);
  calcPrintBalance(currentAccount.movements, type);
  //? ADDED IN NUMBERS SECTION
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 == 0)
      row.style.backgroundImage =
        'linear-gradient(lightblue, rgba(30,30,255,0.2))';
  });
  //**Date */
  const now = new Date();
  const datenNow = new Date(Date.now());
  const day = `${now.getDate()}`.padStart(2, 0);
  const minutes = `${now.getMinutes()}`.padStart(2, 0);
  todaysDate.textContent = `${day}/${
    datenNow.getMonth() + 1
  }/${datenNow.getFullYear()},   ${now.getHours()}:${minutes}`;
};

//__________________________________________________________
//The button here is a form button so the page will be reloaded and we don't want that to happen
let currentAccount;
//!Login button

btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  //here we use optimal chaining to check wether the account excists or not
  //If correct display the UI
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.classList.toggle('hide');
    console.log(currentAccount);

    //Clear fields
    inputLoginUsername.value = inputLoginPin.value = '';
    updateUI(currentAccount);
    document.querySelector('.app').classList.remove('hide__signup');
    const firstName = currentAccount.owner.split(' ');

    document.querySelector(
      '.welcome'
    ).textContent = `Welcome back, ${firstName[0]}`;
    document.querySelector('.log__in').classList.remove('after__signup');
    document.querySelector('.log__in').textContent = '';
  }
});
//________________________________________________________________________________________________
//!Transfer function/
// Take money from the current account=>>>Make a withdrwal and add it as a movement to the current account object negative value
//we will make a deposite movement to the other account
//Tranfer to ===eqaul user name
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const accountTransferedTo = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  calcPrintBalance(currentAccount.movements, '€');

  if (
    accountTransferedTo &&
    currentAccount.balance > inputTransferAmount.value &&
    inputTransferAmount.value > 0 &&
    accountTransferedTo?.username !== currentAccount.username
  ) {
    currentAccount?.movements.push(Number(inputTransferAmount.value) * -1);
    accountTransferedTo?.movements?.push(Number(inputTransferAmount.value));
    currentAccount?.movementsDates.push(new Date());
    accountTransferedTo?.movementsDates.push(new Date());

    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
  }
});
//_______________________________________________________________
//___________________________________________________________________________
//!Loan feature
// The bank can give you a loan if there is one deposite with 10% of the requested loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanValue = Math.round(Number(inputLoanAmount.value));
  const eligible = currentAccount.movements.some(mov => mov >= 0.1 * loanValue);
  if (loanValue > 0 && eligible) {
    currentAccount.movements.push(loanValue);
    currentAccount.movementsDates.push(new Date());
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

//__________________________________________
//! close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);
    containerApp.classList.toggle('hide');
    inputCloseUsername.value = inputClosePin.value = '';
  }
});
//________________________________________________________________
//! Sorting btn
//***IMPORTANT   */
//Here in order to avoid mutating the original array we want to make a copy of the array using slice method
//here in order to make the button reseted we need to define a variable outside the btn function
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, '€', !sorted);
  sorted = !sorted;
});
//___________________________________________________________________
/////////////////////////////////////////////////

/*let arr = ['a', 'b', 'c', 'd', 'e'];
//? SLICE METHOD
console.log(arr.slice(1, -2));
//? SPLICE METHOD
//! CHANGES THE ORIGINAL ARRAY
console.log(arr.splice(2));
console.log(arr);
//REMOVE LAST ELEMNT OF AN ARRAY
arr.splice(-1);
console.log(arr);
arr = ['a', 'b', 'c', 'd', 'e', 'j'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
//? REVERSE METHOD
console.log(arr2.reverse());
//! THE REVERSE METHOD MUTATES THE ORIGINAL ARRAY
console.log(arr2);
//? CONCAT METHOD
const letters = arr.concat(arr2);
console.log(letters);
//!CONCAT*/
/*for (const movement of movements) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`);
  }
}
// FOR each loops over the array and on each loop it will cal the content of the array
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`);
  }
});
//*access counter variable//********************** */
/*for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`);
  }
  console.log(i);
}
//****FOR EACH */
/*movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`);
  }
  console.log(index, array);
});
//***************Continue and break statements don't work in forEach */
//**It will always loop over the whole array unlike for of */
//__________________________________________________________________________________
//*************************************************************************** */
//*************************************************************************** */
//*******************************Lecture 2******************************************** */
//? ForEach with maps and sets
//*currencies = new Map([
//* ['USD', 'United States dollar'],
//* ['EUR', 'Euro'],
//* ['GBP', 'Pound sterling'],
//*]);
/*currencies.forEach(function (value, key, map) {
  console.log(value);
  console.log(key);
});
const currenciesUniquie = new Set(['USD', 'GBP', 'USD', 'EURO']);
console.log(currenciesUniquie);
currenciesUniquie.forEach(function (value, key, map) {
  //! here the set dosn't have keys or indexes
  //! in order to make forEach consistant it was decided not to remove the key from the function arguments
  //! wE CAN PUT UNDESCORE INSTEAD OF KEY AS AN UNWANTED VARIABLE
  console.log(key, value);
});
//************************************************************************* */
//************************************************************************* */
//*****************LECTURE3******************************************************** */
//Flowchart
//****************************************************/
//****************************************************/
//****************LECTURE4************************************/
/*const dogAge = function (num, i, name) {
  const pr =
    num > 3
      ? `${name}'s dog number ${i + 1} is an adult`
      : `${name}'s dog number ${i + 1} is still a puppy`;
  console.log(pr);
};
const checkDogs = function (arr1, arr2) {
  const cat = [...arr1.slice(0, 1), ...arr1.slice(-2)];
  arr1.splice(0, 1);
  arr1.splice(-2);
  console.log(arr1, '\n', cat);
  arr1.forEach(function (num, i) {
    dogAge(num, i, 'Julia');
  });
  arr2.forEach(function (num, i) {
    dogAge(num, i, 'Kate');
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(function (age, i) {
    return age <= 2 ? 2 * age : 16 + 4 * age;
  });
  return humanAge;
};
const humanAge1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const humanAge2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
const AdultDogs1 = humanAge1.filter(age => age >= 18);
const AdultDogs2 = humanAge2.filter(age => age >= 18);
const adultDogs = [...AdultDogs1, ...AdultDogs2];
const adultDogsSum = adultDogs.reduce((acc, age) => acc + age, 0);
const dogsCount = adultDogs.reduce((acc, age, i) => acc + 1, 0);
const adultDogsAverage = Math.trunc(adultDogsSum / dogsCount);
console.log(AdultDogs1);
console.log(AdultDogs2);
console.log(adultDogs);
console.log(adultDogsAverage);*/
//****************Map method */
//MOre useful than forEach since it builds a new array
//reduce method it returns one value
//Convert the movements to us dollars
/*const euroToUSD = 1.1;
const movementsUSD = movements.map(mov => Math.trunc(mov * euroToUSD));
console.log(movementsUSD);
const movementsDescriptions = movements.map((mov, i, arr) => {
  const amount =
    mov > 0
      ? `Movement ${i + 1}:You deposited ${mov}`
      : `Movement ${i + 1}:You withdrawal ${Math.abs(mov)}
  `;
  return amount;
});*/
//console.log(movementsDescriptions.join('\n'));*/
/*const deposits = movements.filter(mov => mov > 0);

const withdrawals = movements.filter(mov => mov < 0);
console.log(deposits);
console.log(withdrawals);
const totalBalance = movements.reduce((acc, cur) => acc + cur, 0);
// here we specify 0 for the accumulator
console.log(totalBalance);*/
//****************************************************** */
//! Maximum value of the movements array

/*const r = movements.reduce(function (acc, mov) {
  if (mov > acc) acc = mov;
  return acc;
}, 200);
console.log(r);*/
//********************************************************* */
/*TotalDepositesinUS = movements
  .filter(mov => mov > 0)
  .map(mov => mov * 1.1)
  .reduce((acc, cur) => acc + cur);*/
//******************************************************** */
//******************************************************** */
//******************************************************** */
//? Find Method
// IT returns the first elemnt in the array in which the operation specified returns true
//find method returns only the first elemnt and dosn't return the array
/*const firstWithdrawal = movements.find(mov => mov < 0);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);*/
//***Some and every method */

/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
console.log(movements.includes(-130));
console.log(movements.some(mov => mov > 5000));
*/
//Every method
//Returns true if all the elemnts passes the test
//console.log(account4.movements.every(mov => mov > 0));
//**Flat map */
/*const array = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(array.flat());
//Remove nested arrays
const arrdeep = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arrdeep.flat());
//Flat method moves one level away
//We can fix this by increasing the depth
console.log(arrdeep.flat(2));
const accountMOvements = accounts.map(acc => acc.movements);
console.log(accountMOvements);
console.log(accountMOvements.flat());
//FLat map
const accountBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(accountBalance);
//Sorting arrays
const owners = ['Jonas', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);
//this sort method mutates our original array
//The sort method does the sorting to strings
//return <=0 A,B (keep order)
// return >=0 B,A(switch order)
account1.movements.sort((a, b) => a - b);
console.log(account1.movements);*/
//___________________________________________________________________________________
//!Generating array in diffrent ways */
//Special cases IMPORTANT
/*console.log(new Array(1, 2, 3, 4, 5, 6, 7));
// Output normal array[1....7]
//Speacial case
let x = new Array(8);
console.log(new Array(8));
//output [EMPTY ARRAY of 8 places]
//Fill Method mutate the array
console.log(x.fill(0));
let y = [4, 7, 8, 9];
console.log(y.fill(1, 1, 3));
//We can define the first index and the number and the last index
//! ARRAY>From
Array.from({ length: 7 }, () => 1);
// The second parameter of from is mapping function
//In the maping function we write underscroe instead of current element since we don't need to use the current elemnt

const z = Array.from({ length: 7 }, (_, i) => i + 1);
//Array.form is used to convert maps and objects into arrays
//We can create arrays from other things
// We have the querryselected all that returns a node of elements which are like arrays but they don't have methods
//so we can convert them into arrays

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(document.querySelectorAll('.movements__value'));
  console.log(movementUI);
  console.log(movementUI.map(el => Number(el.textContent.replace('€', ''))));
  //here we have the euro sign and we want to get rid of it so the map method will be perfect for that
});
//Another way to seperate the queryselectorall
const movementUI2 = [...document.querySelectorAll('.movements__value')];*/
/*const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
dogs.forEach(function (dog) {
  const recomendedFood = dog.weight ** 0.75 * 28;
  dog.recomendedFood = recomendedFood;
});
const owner = dogs.filter(function (dog) {
  return dog.owners.find(owner => owner === 'Sarah');
});
//Another solution
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(owner);

const ownersEatTooLittle = dogs
  .filter(dog => {
    if (dog.recomendedFood > dog.curFood) return dog.owners;
  })
  .map(dog => dog.owners)
  .flat();

const ownersEatTooMuch = dogs
  .filter(dog => {
    if (dog.recomendedFood < dog.curFood) return dog.owners;
  })
  .map(dog => dog.owners)
  .flat();
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);
console.log(dogs);
console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little`);

console.log(
  'Is there any dog which eats the recomended amount exactly?\n',
  dogs.some(dog => dog.curFood === dog.recomendedFood)
);
const eatingOkay = function (dog) {
  return (
    dog.curFood >= 0.9 * dog.recomendedFood ||
    dog.curFood <= 0.9 * dog.recomendedFood
  );
};
console.log(dogs.some(dog => eatingOkay(dog)));
console.log(dogs.filter(dog => eatingOkay(dog)));
const sortedDogs = dogs
  .slice()
  .sort((a, b) => b.recomendedFood - a.recomendedFood);
console.log(sortedDogs);*/
//! css of the blur added just we need to add the sign up window
