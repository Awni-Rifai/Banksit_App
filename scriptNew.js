'use strict';
class Account {
  constructor(owner, pin, currency) {
    this.currency = currency;
    this.owner = owner;
    this._pin = pin;
    this._movements = [];
    console.log(`Thank you for dealing with us`);
  }
  //____________________________________________________________________________
  //!USERNAME CREATION
  createUsernames(name) {
    const userName = name
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    return userName;
  }
  get userName() {
    return this.createUsernames(this.owner);
  }
  //__________________________________________________________________________
  get movements() {
    return this._movements;
  }
  deposite(val) {
    this._movements.push(val);
  }
  withdraw(val) {
    this._movements.push(-1 * val);
  }
  _deposites() {
    return this._movements.filter(x => x > 0);
  }
  _withdraws() {
    return this_.movements.filter(x => x < 0);
  }
  _maxDeposite() {
    const deposites = this._deposites();
    let max = 0;
    for (let i = 0; i < deposites.length; i++) {
      if (deposites[i] > max) max = deposites[i];
    }
    return max;
  }
  //___________________________________________________________________________________________
  //!Balance function
  euroToUSD(arr, euroToUSD) {
    return this.movements.map(mov => Math.trunc(mov * euroToUSD));
  }

  calcPrintBalance(movements, type) {
    type = type.toUpperCase();
    let totalBalance;
    if (type === 'EURO') {
      totalBalance = movements.reduce((acc, mov) => acc + mov, 0);
      //!The comment below must be removed when we added to the html
      //labelBalance.textContent = `${totalBalance}€`;
    }
    if (type === 'USD') {
      totalBalance = this.euroToUSD(movements, 1.1).reduce(
        (acc, mov) => acc + mov,
        0
      );
      //! The comment below must be removed
      // labelBalance.textContent = `${totalBalance}$`;
    }
    return totalBalance;
  }
  get totalBalance() {
    return this.calcPrintBalance(this.movements, this.currency);
  }

  //____________________________________________________________________________________________
  _approveLoan(val) {
    return val * 0.1 < this._maxDeposite();
  }
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposite(val);
      console.log(
        `The loan requested is approaved and an amount of ${val} is deposite to your account`
      );
    } else
      console.log(
        `The loan requested cannot be approved since it's higher than 10% of your largest deposite`
      );
  }
}
const acc1 = new Account('Awni', 1111, 'USD');
acc1.deposite(100);
acc1.deposite(500);
acc1.deposite(700);
console.log(acc1);

acc1.requestLoan(800);
