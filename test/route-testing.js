/*
 * INSTRUCTIONS
 *
 * run the site at localhost, port 8010
 *
 * run vows --spec test/api-test-authed.js
 *
 */


var request = require('request'),
    vows = require('vows'),
    assert = require('assert'),
    apiUrl = "http://localhost:3000/",
    cookie = null


var apiTest = {
  general: function( method, url, data, cb ){
    //console.log( 'cb?', cb )
    request(
      {
        method: method,
        url: apiUrl+(url||''),
        json: data || {},
        headers: {Cookie: cookie}
      },
      function(req, res){
        cb( res )
      }
    )
  },
  get: function( url, data, cb  ){ apiTest.general( 'GET', url, data, cb    )  },
  post: function( url, data, cb ){ apiTest.general( 'POST', url, data, cb   )  },
  put: function( url, data, cb  ){ apiTest.general( 'PUT', url, data, cb    )  },
  del: function( url, data, cb  ){ apiTest.general( 'DELETE', url, data, cb )  }
}

function assertStatus(code) {
  return function (res, b, c) {
    assert.equal(res.statusCode, code);
  };
}


function assertJSONHead(){
  return function(res, b, c ){
    assert.equal( res.headers['content-type'], 'application/json; charset=utf-8' )
  }
}

function assertValidJSON(){
  return function(res, b ){
    // this can either be a Object or Array
    assert.ok( typeof( res.body ) == 'object' )
    //assert.isObject( res.body)
  }
}

// TODO include unauthed tests
var suite = vows.describe('API Localhost HTTP Authenticated Tests')

// Very first test!
.addBatch({
  "Server should be UP as in: var apiUrl": {
    topic: function(){
      apiTest.get('', {} ,this.callback )
    },

    '/ should repond something' : function(res, b){
      assert.ok(res.body)
    }
  }
})

.addBatch({
  'Authenticate to /login': {
    topic: function(){
      request.post(
        {
          url: "http://localhost:8010/login",
          json: { user:{ username: 'flockin_lab', password: '123456' }}
        },
        this.callback
      );
    },



    'get a valid Cookie': function(req, res, body, err){
      try{
        cookie = res.headers['set-cookie'].pop().split(';')[0]
        console.log("GOT COOKIE!", cookie)
      } catch(e){ }

      assert.ok( typeof(cookie) == 'string' && cookie.length > 10 )
    }
  }
})
.addBatch({
  'Users#index': {
    topic: function(){
      apiTest.get('admin/employees', {}, this.callback)
    },
    'should be 200': assertStatus(200),
    'should have JSON header' : assertJSONHead(),
    'body is valid JSON' : assertValidJSON(),

  },
})
.addBatch({
  'Qrcodes#index': {
    topic: function(){
      apiTest.get('admin/qrcodes', {}, this.callback)
    },
    'should be 200': assertStatus(200),
    'should have JSON header' : assertJSONHead(),
    'body is valid JSON' : assertValidJSON(),

  },
})

suite.run( )
//suite.export( module )
