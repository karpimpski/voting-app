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

function patch(query, d, cb){
  $.ajax({
    url: query,
    type: 'PATCH',
    data: d,
    success: function(data) {
      cb(JSON.parse(data));
    }
  });
} 

function del(query, d, cb){
  $.ajax({
    url: query,
    type: 'DELETE',
    data: d,
    success: function(data){
      cb(JSON.parse(data));
    }
  })
}
const Client = { get, post, patch, del };
export default Client;
