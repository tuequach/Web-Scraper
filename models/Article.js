var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//constructor for mongoose (similar to Sequelize model)
var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },

    link: {
        type: String, 
        required: true
    },
// note store object id.
// ref property links the objectId to the model (allows for article to go with associated Note)

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

