var dataset = require('./dataset.json');
var bankBalances = dataset.bankBalances;


/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = bankBalances.filter( bankBalance => {
  return bankBalance.amount > 100000.00
})

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = bankBalances.map( bankBalance => {
  return {
    amount : bankBalance.amount,
    state: bankBalance.state,
    rounded: Math.round(bankBalance.amount)
  }
});

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = bankBalances.map( bankBalance => {
  return {
    amount : (Math.round(bankBalance.amount * 10) / 10),
    state: bankBalance.state,
  }
});

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = bankBalances.reduce((prev, current) => {
  return prev + Number(current.amount);
}, 0);
sumOfBankBalances = Math.round(sumOfBankBalances * 100)/ 100

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = bankBalances.filter( bankBalance => {
  switch(bankBalance.state) {
    case 'WI':
    case 'IL':
    case 'WY':
    case 'OH':
    case 'GA':
    case 'DE':
    return bankBalance;
  }
}).reduce( (prev, curr) => {
  return prev + (Number(curr.amount) * 0.189)
},0)
sumOfInterests = Math.round(sumOfInterests * 100)/ 100

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = bankBalances.filter( bankBalance => {
  let x = bankBalance.state;
  return x !== 'WI' && x !== 'IL' && x !== 'WY' && x !== 'OH' && x !== 'GA' && x !== 'DE'
}).filter( bankBalance => {
  return bankBalance.amount > 50000
}).reduce( (prev, curr) => {
  return prev + (Number(curr.amount) * 0.189)
}, 0)
sumOfHighInterests = Math.round(sumOfHighInterests * 100)/ 100


/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = bankBalances.reduce( (prev, curr) => {
  let amount = parseFloat(curr.amount)

  if(!prev.hasOwnProperty(curr.state)) {
    prev[curr.state] = 0
  }

  prev[curr.state] += amount
  prev[curr.state] = (Math.round(prev[curr.state]* 100))/100

  return prev;

}, {});


/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = Object.keys(stateSums).filter( state => {
  if(stateSums[state] < 1000000) {
    return state;
  }
})

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = Object.keys(stateSums).reduce( (prev, curr) => {
  if(stateSums[curr] > 1000000) {
    prev += stateSums[curr];
  }
  return prev
}, 0);

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = Object.keys(stateSums).filter( state => {
  return stateSums[state] > 2550000;
}).map( state => {
  switch(state) {
    case 'WI':
    case 'IL':
    case 'WY':
    case 'OH':
    case 'GA':
    case 'DE':
    return true;
    default:
    return false;
  }
}).every( bool => {
  return bool === true;
})


/*
  Stretch Goal && Final Boss

  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = Object.keys(stateSums).filter( state => {
  return stateSums[state] > 2550000;
}).map( state => {
  switch(state) {
    case 'WI':
    case 'IL':
    case 'WY':
    case 'OH':
    case 'GA':
    case 'DE':
    return true;
    default:
    return false;
  }
}).some( bool => {
  return bool === true;
})


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
