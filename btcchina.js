var querystring = require("querystring");
var https = require('https');
var _ = require('underscore');
var crypto = require('crypto');

var BTCChina = function(key, secret) {
  if(!key || !secret)
    throw 'Must provide key and secret to make API requests';

  this.key = key;
  this.secret = secret;

  _.bindAll(this);
}

BTCChina.prototype._request = function(method, params, callback) {
  if(!_.isArray(params))
    throw 'Params need to be an array with parameters in the order they are listed in the API docs.'
  if(!_.isFunction(callback))
    callback = function() {};

  var tonce = new Date() * 1000; // spoof microsecond
  var args = {
    tonce: tonce,
    accesskey: this.key,
    requestmethod: 'post',
    id: 1,
    method: method,
    params: params.join('~'), // we need commas here in the querystring
                              // hacky workaround to perserve them
  };
  var qs = querystring.stringify(args).replace('~', ',');

  var signer = crypto.createHmac('sha1', this.secret);
  var hmac = signer.update(qs).digest('hex');
  var signature = new Buffer(this.key + ':' + hmac).toString('base64');

  var body = JSON.stringify({
    method: args.method,
    params: params,
    id: args.id
  }, null, 4);

  var options = {
    host: 'api.btcchina.com',
    path: '/api_trade_v1.php',
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/4.0 (compatible; BTCchina node.js client)',
      'Content-Length': body.length,
      'Authorization': 'Basic ' + signature,
      'Json-Rpc-Tonce': tonce
    }
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    var buffer = '';
    res.on('data', function(data) {
      buffer += data;
    });
    res.on('end', function() {
      if(buffer === '401 Unauthorized\n')
        return callback('General API error: 401 Unauthorized');

      try {
        var json = JSON.parse(buffer);
      } catch (err) {
        return callback(err);
      }

      if('error' in json)
        return callback(json.error.message + ' (code ' + json.error.code + ')');

      callback(null, json);
    });
  });
  req.on('error', function(err) {
    callback(err);
  });
  req.end(body);
}

// 
// API calls
// 

BTCChina.prototype.buyOrder = function(price, amount, callback) {
  this._request('buyOrder', [price, amount], callback);
}

BTCChina.prototype.cancelOrder = function(id, callback) {
  this._request('cancelOrder', [id], callback);
}

BTCChina.prototype.getAccountInfo = function(callback) {
  this._request('getAccountInfo', [], callback);
}

BTCChina.prototype.getDeposits = function(currency, pendingonly, callback) {
  if(pendingonly === null || pendingonly === undefined)
    // default is true
    this._request('getDeposits', [currency], callback);
  else
    this._request('getDeposits', [currency, pendingonly], callback);
}

BTCChina.prototype.getMarketDepth = function() {
  throw 'This method is deprecated. Please use getMarketDepth2.';
}

BTCChina.prototype.getMarketDepth2 = function(limit, callback) {
  if(!limit)
    limit = 10;

  this._request('getMarketDepth2', [limit], callback);
}

BTCChina.prototype.getOrder = function(id, callback) {
  this._request('getOrder', [id], callback);
}

BTCChina.prototype.getOrders = function(openonly, callback) {
  // if(openonly === null || openonly === undefined)
  //   // default is true
  //   openonly = true;
  if(openonly === false)
    this._request('getOrders', [openonly], callback);
  else
    this._request('getOrders', [], callback);
}

BTCChina.prototype.getTransactions = function(type, limit, callback) {
  if(!type)
    type = 'all';
  if(!limit)
    limit = 10;

  this._request('getTransactions', [type, limit], callback);
}

BTCChina.prototype.getWithdrawal = function(id, callback) {
  this._request('getWithdrawal', [id], callback);
}

BTCChina.prototype.getWithdrawals = function(currency, pendingonly, callback) {
  if(pendingonly === false)
    this._request('getWithdrawals', [currency, pendingonly], callback);
  else
    this._request('getWithdrawals', [currency], callback);
}

BTCChina.prototype.requestWithdrawal = function(currency, amount, callback) {
  this._request('requestWithdrawal', [currency, amount], callback);
}

BTCChina.prototype.sellOrder = function(currency, amount, callback) {
  this._request('sellOrder', [currency, amount], callback);
}

module.exports = BTCChina;
