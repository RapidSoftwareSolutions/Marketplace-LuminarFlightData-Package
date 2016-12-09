"use strict";

global.PACKAGE_NAME = 'LuminarFlightData';
global.API_ENDPOINT = 'https://api.laminardata.aero/v1';

const express       = require('express'),
    Promise         = require('bluebird'),
    bodyParser      = require('body-parser'),
    xmlParser       = require('xml2js').parseString,
    API             = require('rapi-js-package'),
    fs              = require('fs'),
    lib             = require('./lib'),
    _               = lib.callback;

const PORT          = process.env.PORT || 8080;
const app           = express();

app.use(bodyParser.json(({limit: '50mb'})));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.all(`/api/${PACKAGE_NAME}`, (req, res) => { res.send(metadata); });

let parseResponse = (res) => new Promise((resolve, reject) => {
    xmlParser(res, /*{ignoreAttrs: true},*/ (err, result) => {
        if(err) reject();
        resolve(result);
    })
})

let mfile = fs.readFileSync('./metadata.json', 'utf-8'),
    cfile = fs.readFileSync('./control.json',  'utf-8');

let metadata = JSON.parse(mfile),
    control  = JSON.parse(cfile);

for(let func in control) {
    let options = {
        parseUri: true,
        hasSkip:  true,
        query:    {},
        //debug:    true
    };

    let {
        method, 
        args,
        tree,
        url
    } = control[func];

    app.post(`/api/${PACKAGE_NAME}/${func}`, _(function* (req, res) {
        let response;
        let opts = {};
        let r    = {
            callback     : "",
            contextWrites: {}
        };

        req.body.args = lib.clearArgs(req.body.args);

        try {
            let api = new API(API_ENDPOINT + url, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            for(let arg in args) {
                let argarr      = arg.split('|');
                opts[args[arg] + '|' + argarr[0]] = req.body.args[argarr[1]];
            }

            method == 'GET' ? options.query = opts : options.body = opts;
            options.method = method;

            response              = yield api.request(options);
            r.callback            = 'success';
            r.contextWrites['to'] = func == 'getFlightsByTile' ? response : yield parseResponse(response);
        } catch(e) {
            r.callback            = 'error';
            r.contextWrites['to'] = e.status_code ? e : { status_code: "API_ERROR", status_msg: '404 Not Found. Please, check api params and try again.' };
        }

        res.status(200).send(r);
    }))
}

app.listen(PORT);
module.exports = app;