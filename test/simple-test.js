// division-by-zero-test.js

var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys'),
    http = require('http'),
    node_server = require('../app').node_server;

app_server = new node_server(8888);

// Create a Test Suite
vows.describe('Request to the server').addBatch({
    'Should get http 200': {
        topic: function () {
            app_server.mainpage(this.callback)
        },

        'we get 200': function (statusCode) {
            app_server.close_server();
            assert.equal(statusCode, 200);
        }
    },
}).run(); // Run it