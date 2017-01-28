var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	name: {type: String, required: true, unique: true},
	options: Array
});

var Poll  = mongoose.model('Poll', pollSchema);

module.exports = Poll;