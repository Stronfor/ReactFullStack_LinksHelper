const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
      from: {type: String, required: true}, // откуда пришла ссылка
      to: {type: String, required: true, unique: true}, // куда ведет ссылка
      code: {type: String, required: true, unique: true},
      date: {type: Date, default: Date.now}, //когда была создана ссылка
      clicks: {type: Number, default: 0},
      owner: {type: Types.ObjectId, ref: 'User'}, // Связка с моделью User
      /* name: {type: String, required: true} */
});

module.exports = model('Link', schema);