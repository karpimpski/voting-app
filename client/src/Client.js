/* eslint-disable no-undef */
var $ = require('jquery');
function get(query, cb) {
  $.get( query, function( data ) {
    cb(JSON.parse(data));
  })
}

function post(query, cb) {
  $.post( query, function (data) {
    cb(JSON.parse(data));
  })
}

function patch(query, cb){
  $.ajax({
    url: query,
    type: 'PATCH',
    success: function(data) {
      cb(JSON.parse(data));
    }
});
}
const Client = { get, post };
export default Client;
