class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
  	this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

// DRIVER CODE (yes, keep everything in one file for now... b/c cog load)
const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

const t1 = new Withdrawal(1.00, myAccount);
t1.commit();
console.log('Account Balance: ', myAccount.balance);

const t2 = new Deposit(33.50, myAccount);
t2.commit();
console.log('Account Balance: ', myAccount.balance);

const t3 = new Withdrawal(8.35, myAccount);
t3.commit();

console.log('Ending Account Balance: ', myAccount.balance);
