var BTCChina = require('./btcchina.js');

var key = 'your-api-key';
var secret = 'your-api-secret';

var btcchina = new BTCChina(key, secret);

//    commented out for your protection

// btcchina.buyOrder(9000, 1, console.log);
// btcchina.cancelOrder(1, console.log);
btcchina.getAccountInfo(console.log);
// btcchina.getDeposits('BTC', null, console.log);
// btcchina.getMarketDepth2(null, console.log);
// btcchina.getOrder(1, console.log);
// btcchina.getOrders(true, console.log);
// btcchina.getAccountInfo(true, console.log);
// btcchina.getTransactions('all', 10, console.log);
// btcchina.getWithdrawal(1, console.log);
// btcchina.getWithdrawals('BTC', true, console.log); // `pendingonly` only works at true as of Sun Nov 24 15:56:07 CET 2013.
// btcchina.requestWithdrawal('BTC', 1, console.log);
// btcchina.sellOrder(9000, 1, console.log);
