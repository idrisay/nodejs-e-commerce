const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  body: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  },
  tags: [{ 
    type: String 
  }],
  comments: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Comment' 
  }]
});

module.exports = mongoose.model('Blog', BlogSchema);