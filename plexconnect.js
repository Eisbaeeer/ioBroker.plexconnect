/**
 *
 *      ioBroker Plex Media Server Webhook Adapter
 *
 *      Copyright (c) 2016 Eisbaeeer@gmail.com
 *
 *      MIT License
 *
 */

var utils =   require(__dirname + '/lib/utils'); // Get common adapter utils
var adapter = utils.adapter('plexconnect');

var express = require('express'),
    request = require('request'),
    multer  = require('multer');
var app = express();
var upload = multer({ dest: '/tmp/' });

app.post('/', upload.single('thumb'), function (req, res, next) {
    var payload = JSON.parse(req.body.payload);
    adapter.log.info('getting payload');
    adapter.log.info(payload.Server.title);

// Account
    adapter.setState (adapter.namespace + '.' + 'account.id', {val: payload.Account.id, ack: true});
    adapter.setState (adapter.namespace + '.' + 'account.thumb', {val: payload.Account.thumb, ack: true});
    adapter.setState (adapter.namespace + '.' + 'account.title', {val: payload.Account.title, ack: true});
    
// Event
    adapter.setState (adapter.namespace + '.' + 'event.Name', {val: payload.event, ack: true});

// MUSIK 
    adapter.setState (adapter.namespace + '.' + 'metadata.grandparentTitle', {val: payload.Metadata.grandparentTitle, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.parentTitle', {val: payload.Metadata.parentTitle, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.thumb', {val: payload.Metadata.thumb, ack: true});

});

adapter.on('ready', function () {
    adapter.log.info('function ready');
  
    // starting express server
    var server = app.listen(adapter.config.port, function () {
    var port = server.address().port;
    adapter.log.info('Server listening on port:' + port);
});
    main();
});

adapter.on('objectChange', function (id, obj) {
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});

adapter.on('stateChange', function (id, state) {
    adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));
    adapter.log.info('stateVal ' + state.val);

    // you can use the ack flag to detect if state is command(false) or status(true)
    if (!state.ack) {
     //   adapter.log.info('ack is not set!');
                
    // here we go and set the outputs if state of object is changed with no ack
   }
});
 

function main() {
    adapter.log.info('function main');
    adapter.subscribeStates('*');
    adapter.log.info('IP-Address: ' + adapter.config.ipaddress);
    adapter.log.info('Port: ' + adapter.config.port);
}
