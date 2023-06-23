/////////////////////////////////
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  password: 1111,
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  password: 2222,
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  password: 3333,
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  password: 4444,
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

let CurrentAccount;
let totalBalance = 0;
let totalDeposit = 0;
let globalLogoutTimer;

// Data
/////////////////////////////////

////////////////////////////////////
// Get Dom Elements

//Get Intro Msg
const introMsg = document.querySelector("#intro-msg");

// Get Total Balance
const balanceValue = document.querySelector("#balance-value");

// Get Balance Date
const balancedateDom = document.querySelector("#balance-date");

// Get Summary
const totalInDom = document.querySelector(".Total-In");
const totalOutDom = document.querySelector(".Total-Out");
const totalInterestDom = document.querySelector(".Total-Interest");

// Get Main Section
const MainDom = document.querySelector(".main");
const LoginBtnDom = document.querySelector(".login-btn");
const LoginNameDom = document.querySelector("#fname");
const LoginPass = document.querySelector("#lname");

// Get Transaction
const transactionDom = document.querySelector(".transaction");

// Transfer Money
const TransferBtn = document.querySelector(".transfer-btn");
const TrasnferUserDom = document.querySelector("#tfname");
const TransferValueDom = document.querySelector("#tfvalue");

// Request Loan
const LoanBtn = document.querySelector(".loan-btn");
const LoanValueDom = document.querySelector("#loan-amaount");

// Close Account
const closeAccBtn = document.querySelector(".close-btn");
const closeUserDom = document.querySelector("#clname");
const closePassDom = document.querySelector("#clvalue");

// Log - Out Time
const LogOutTime = document.querySelector(".Log-out");

// Get Dom Elements
////////////////////////////////////

////////////////////////////////
// Login
// Create Login Information
accounts.map((item) => {
  item.userName = item.owner
    .toLocaleLowerCase()
    .split(" ")
    .map((val) => val[0])
    .join("");
});

// Login Screen Opening Interval

// Add EventListener
LoginBtnDom.addEventListener("click", function (e) {
  e.preventDefault();

  const userName = String(LoginNameDom.value);

  const acc = accounts.find((item) => item.userName === userName);

  if (acc && CurrentAccount?.userName != acc.userName) {
    const userPass = Number(LoginPass.value);
    if (userPass === acc.password) {
      if (globalLogoutTimer) clearInterval(globalLogoutTimer);
      globalLogoutTimer = StartLogoutTimer();
      CurrentAccount = acc;
      updateGui(acc);
      opacity = 0;
      const openLoginFunc = setInterval(() => {
        MainDom.style.opacity = opacity;
        opacity += 0.1;
        if (opacity > 1) {
          clearInterval(openLoginFunc);
        }
      }, 100);
    }
  }
});

// Login
///////////////////////////////

///////////////////////////////
// LogoutTimer

function StartLogoutTimer() {
  let time = 300;

  const tick = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);

    let sec = String(time % 60).padStart(2, 0);

    LogOutTime.innerHTML = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      opacity = 1;
      const closeLoginFunc = setInterval(() => {
        MainDom.style.opacity = opacity;
        opacity -= 0.1;
        if (opacity <= 0) {
          clearInterval(closeLoginFunc);
          CurrentAccount = "";
        }
      }, 100);
    }

    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
}

// LogoutTimer
///////////////////////////////

///////////////////////////////
// Update Guı
function updateGui(acc) {
  updateIntroMsg(acc.owner);
  updateTransaction(acc.movements);
  updateBalance(acc.movements, acc.interestRate);
  updateCurrentBalanceData();
}

function updateCurrentBalanceData() {
  balancedateDom.textContent = `${getDatewithFormat()}`;
}

// Update Intro msg
function updateIntroMsg(msg) {
  introMsg.innerHTML = `Hello, ${msg}`;
}

// Update transaction
function updateTransaction(movs) {
  transactionDom.innerHTML = "";
  movs.forEach((transaction) => {
    const type = transaction > 0 ? "deposit" : "withdraw";
    const date = getDatewithFormat((hours = false));

    const html = `
    <div class="transaction-move">
    <div class="transaction-type ${type}">${
      type == "deposit" ? type + "&nbsp" : type
    }</div>
    <div class="transaction-date">${date}</div>
    <div class="transaction-value ${type}">${currencyUpdate(transaction)}</div>
    </div>`;

    transactionDom.insertAdjacentHTML("afterbegin", html);
  });
}

// Update Balance
function updateBalance(movs, rate) {
  // Update balance
  totalBalance = movs.reduce((acc, item) => (acc += item), 0);
  const type = totalBalance > 0 ? "deposit" : "withdraw";
  balanceValue.innerHTML = `<p class = ${type} id="balance-value">${currencyUpdate(
    Math.abs(totalBalance)
  )}</p>`;

  // Update Summary
  totalDeposit = movs
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0);

  const totalWithdraw = movs
    .filter((item) => item < 0)
    .reduce((acc, item) => acc + item, 0);

  const interest = movs
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * rate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  totalInDom.textContent = `${currencyUpdate(totalDeposit)}`;

  totalOutDom.textContent = `${currencyUpdate(Math.abs(totalWithdraw))}`;

  totalInterestDom.textContent = `${currencyUpdate(Math.abs(interest))}`;
}

// Update Guı
///////////////////////////////

//////////////////////////////
// Transfer Money

TransferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const user = String(TrasnferUserDom.value);
  const value = Number(TransferValueDom.value);
  TrasnferUserDom.value = "";
  TransferValueDom.value = "";
  if (user && value && value < totalBalance && value > 0) {
    console.log(CurrentAccount);
    CurrentAccount.movements.push(-value);
    const targetAcc = accounts.find((item) => item.userName === user);
    targetAcc.movements.push(value);
    updateTransaction(CurrentAccount.movements);
    updateBalance(CurrentAccount.movements, CurrentAccount.interestRate);
    if (globalLogoutTimer) clearInterval(globalLogoutTimer);
    globalLogoutTimer = StartLogoutTimer();
  }
});

// Transfer Money
//////////////////////////////

//////////////////////////////
// Request Loan

LoanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const value = Math.trunc(Number(LoanValueDom.value));
  LoanValueDom.value = "";

  setTimeout(function () {
    if (value > 0 && totalDeposit * 0.1 >= value) {
      CurrentAccount.movements.push(value);
      updateTransaction(CurrentAccount.movements);
      updateBalance(CurrentAccount.movements, CurrentAccount.interestRate);
      if (globalLogoutTimer) clearInterval(globalLogoutTimer);
      globalLogoutTimer = StartLogoutTimer();
    }
  }, 2500);
});

// Request Loan
//////////////////////////////

//////////////////////////////
// Close Account

closeAccBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const userName = String(closeUserDom.value);
  const pass = Number(closePassDom.value);
  closeUserDom.value = "";
  closePassDom.value = "";

  const index = accounts.findIndex((item) => item.userName == userName);
  console.log(index);
  if (accounts[index].password == pass) {
    accounts.splice(index, 1);

    if (userName == CurrentAccount.userName) {
      opacity = 1;
      const closeLoginFunc = setInterval(() => {
        MainDom.style.opacity = opacity;
        opacity -= 0.1;
        if (opacity <= 0) {
          clearInterval(closeLoginFunc);
          CurrentAccount = "";
        }
      }, 100);
    }
  }
});

// Close Account
//////////////////////////////

/////////////////////////////
// Currency Update

function currencyUpdate(value) {
  const options = {
    style: "currency",
    currency: "USD",
  };

  return `${new Intl.NumberFormat("en-US", options).format(value)}`;
}

function getDatewithFormat(hours = true) {
  const currentDate = new Date();
  let options = new Object();
  if (hours) {
    options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  } else {
    options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
  }

  const datelabel = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  return datelabel;
}
// Currency Update
/////////////////////////////
