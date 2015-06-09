var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/

function filter(element) {

  if(element.amount > 100000) {

    return true;
  }
}
var hundredThousandairs = dataset.bankBalances.filter(filter);

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

function mapper(element) {

  return {
            amount: element.amount,
            state: element.state,
            rounded: Math.round(element.amount)
          };
}

var roundedDollar = dataset.bankBalances.map(mapper);

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

function anotherMapper(element) {

  return {

      amount: Math.round(element.amount *10) / 10,
      state: element.state
  }
}

var roundedDime = dataset.bankBalances.map(anotherMapper);

// set sumOfBankBalances to the sum of all amounts in bankBalances

function reducer(prev, curr) {

  return prev + parseFloat(curr.amount);
}
var sumOfBankBalances = Math.round(dataset.bankBalances.reduce(reducer,0) * 100)/100;

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
function anotherReducer(prev,curr) {

  return Math.round((prev + (curr.amount * 0.189)) * 100) /100;
}

function stateFilter(element) {

  if( element.state === 'WI' ||
      element.state === 'IL' ||
      element.state === 'WY' ||
      element.state === 'OH' ||
      element.state === 'GA' ||
      element.state === 'DE') {

    return true;
  }

  return false;
}

var sumOfInterests = dataset.bankBalances.filter(stateFilter).reduce(anotherReducer,0);

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state EXCEPT the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
function anotherStateFilter(element) {

  if( element.state !== 'WI' &&
      element.state !== 'IL' &&
      element.state !== 'WY' &&
      element.state !== 'OH' &&
      element.state !== 'GA' &&
      element.state !== 'DE') {

    return true;
  }

  return false;
}

function stateSummary(prev,curr) {



  if(prev.hasOwnProperty(curr.state)) {

    var out = prev[curr.state] + Math.round((curr.amount * 0.189)*100)/100;

    prev[curr.state] = Math.round(out *100)/100;

  } else {

    prev[curr.state] = Math.round((curr.amount * 0.189)*100)/100;
  }

  return prev;
}

function stateSumFilter(element) {

  if (summedStates[element] > 50000) {

    return true;
  }

  return false;
}

var validStates = dataset.bankBalances.filter(anotherStateFilter);
var summedStates = validStates.reduce(stateSummary,{});
var filteredStates = Object.keys(summedStates).filter(stateSumFilter);

console.log(filteredStates);

var sumOfHighInterests = validStates.reduce(stateSummary,{});

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = null;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

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
var areStatesInHigherStateSum = null;

/*
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
var anyStatesInHigherStateSum = null;


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