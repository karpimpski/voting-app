var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	name: {type: String, required: true, unique: true},
	options: Array,
	voters: Array,
	user: Schema.Types.ObjectId
});

var Poll  = mongoose.model('Poll', pollSchema);

module.exports = Poll;