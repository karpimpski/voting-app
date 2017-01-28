var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var optionSchema = new Schema({
	_poll: {type: ObjectId, ref: 'Poll'},
	name: {type: String, required: true},
	votes: {type: Number, required: true}
});

var Option = mongoose.model('Option', optionSchema);

module.exports = Poll;