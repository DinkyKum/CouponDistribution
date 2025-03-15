const mongoose = require('mongoose');
const { Schema } = mongoose;

const couponSchema = new Schema({
    couponCode: { 
        type: String, 
        required: true, 
        unique: true 
      }, 

      name:{
        type: String,
        required: true
      },
    
      index: { 
        type: Number, 
        required: true, 
        unique: true 
      }, 
    
      assignedTo: { 
        type: [String], 
        default: null 
      }, 
      
      lastAssignedAt: { 
        type: Date, 
        default: null 
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
