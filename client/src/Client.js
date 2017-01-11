/* eslint-disable no-undef */
var $ = require('jquery');
function get(query, cb) {
  $.get( query, function( data ) {
    cb(JSON.parse(data));
  })
}

const Client = { get };
export default Client;
