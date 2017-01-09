var express = require('express');
var app = express();

app.get('/api/test', (req, res) => {
	var obj = {"test" : "it has succeeded"}
	res.end(JSON.stringify(obj));
});

app.listen(3001);