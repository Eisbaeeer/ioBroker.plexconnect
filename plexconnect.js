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
//var isPlaying = true;
var upload = multer({ dest: '/tmp/' });

//app.post('/', upload.single('thumb'), function (req, res, next) {
//var payload = JSON.parse(req.body.payload);
//console.log('Got webhook for', payload.event);


app.post('/', upload.single('thumb'), function (req, res, next) {
    var payload = JSON.parse(req.body.payload);
    adapter.log.info('getting payload');
    adapter.log.info(payload);
    
// MUSIK 
//  if ( payload.event == "media.play" && payload.Metadata.type == "track") {
     adapter.setState (adapter.namespace + '.' + 'who', {val: payload.Metadata.grandparentTitle, ack: true});
//  setState("javascript.0.Plex.wer",payload.Metadata.grandparentTitle); 
     adapter.setState (adapter.namespace + '.' + 'Title', {val: payload.Metadata.parentTitle, ack: true});
 //   setState("javascript.0.Plex.Titel"/*Plex.Titel*/,payload.Metadata.parentTitle); 
//    setState("javascript.0.Plex.parentTitel"/*Plex.parentTitel*/,payload.Metadata.title);
//    setState("javascript.0.Plex.Rating"/*Plex.Rating*/,payload.Metadata.ratingCount.toString()); 
//    setState("javascript.0.Plex.media"/*Plex.media*/,payload.Metadata.librarySectionType); 
      adapter.setState (adapter.namespace + '.' + 'logo', {val: payload.Metadata.thumb, ack: true});
//    var logo=url+':32400'+payload.Metadata.thumb;
//    setState("javascript.0.Plex.logo"/*Plex.logo*/,logo); 
//    setState("javascript.0.Plex.media"/*Plex.media*/,"Musik");
//}
           
 //*****************************
 // VIDEOS & HomeVIDEOS
//   if ( payload.event == "media.play" && payload.Metadata.type == "movie") {
//   setState("javascript.0.Plex.wer",payload.Metadata.studio); 
//   setState("javascript.0.Plex.Titel"/*Plex.Titel*/,payload.Metadata.title); 
//    setState("javascript.0.Plex.Rating"/*Plex.Rating*/,payload.Metadata.rating.toString()); 
//    var logo2=url+':32400'+payload.Metadata.thumb;  
//    setState("javascript.0.Plex.logo"/*Plex.logo*/,logo2); 
//    var logo3=url+':32400'+payload.Metadata.art;
//    setState("javascript.0.Plex.parentlogo"/*Plex.parentlogo*/,logo3); 
//    setState("javascript.0.Plex.media"/*Plex.media*/,"Video");
//    } 
        

//*****************************
  // Bilder wieder auf null
//   if ( payload.event == "media.stop") {

//   setState("javascript.0.Plex.wer",""); 
//   setState("javascript.0.Plex.Titel"/*Plex.Titel*/,""); 
//   setState("javascript.0.Plex.logo"/*Plex.logo*/,'http://192.168.1.184:8082/vis.0/main/img/firework-music.jpg'); 
//   setState("javascript.0.Plex.parentTitel"/*Plex.parentTitel*/,"");
//   setState("javascript.0.Plex.Rating"/*Plex.Rating*/,""); 
//   setState("javascript.0.Plex.media"/*Plex.media*/,"");
//   setState("javascript.0.Plex.parentlogo"/*Plex.parentlogo*/,""); 
//   }
//  if (payload.event == "media.play" || payload.event == "media.resume") {
//    isPlaying = true;
//  } else if (payload.event == "media.pause" || payload.event == "media.stop") {
//    isPlaying = false;
//  }

//  res.sendStatus(200);

//var options = {
//  headers: {
//  }
//}
//}
});

adapter.on('ready', function () {
    adapter.log.info('function ready');
  
    // starting express server
    var server = app.listen(adapter.config.port, function () {
//    var server = app.listen(12000, function () {
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
