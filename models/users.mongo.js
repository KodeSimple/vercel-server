const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  businessName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  productList: [
    {
      userId: {
        type: String,
      },
      entryDate: {
        type: Date,
        default: Date.now, //////// Set default value to the current date and time
      },
      serialNo: {
        type: String,
      },
      category: {
        type: String,
      },
      itemDescription: {
        type: String,
      },
      qty: {
        type: Number,
      },
      buyPrice: {
        type: Number,
      },
      sellPrice: {
        type: Number,
      },
      profit: {
        type: Number,
      },
    },
  ],
  salesList: [
    {
      salesId: {
        type: String,
      },
      referenceNo: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now, ////////Set default value to the current date and time
      },
      allTotalPrice: {
        type: Number,
      },
      items: [
        {
          serialNo: {
            type: String,
          },
          category: {
            type: String,
          },
          itemDescription: {
            type: String,
          },
          qty: {
            type: Number,
          },
          sellPrice: {
            type: Number,
          },
          totalPrice: {
            type: Number,
          },
        },
      ],
    },
  ],
  remainingProduct: [
    {
      serialNo: {
        type: String,
      },
      category: {
        type: String,
      },
      itemDescription: {
        type: String,
      },
      qty: {
        type: Number,
      },
      sellPrice: {
        type: Number,
      },
    },
  ],
  temporaryProduct: [
    {
      userName: {
        type: String,
      },
      serialNo: {
        type: String,
      },
      category: {
        type: String,
      },
      itemDescription: {
        type: String,
      },
      qty: {
        type: Number,
      },
      sellPrice: {
        type: Number,
      },
      totalPrice: {
        type: Number,
      },
    },
  ],
  soldItems: [
    {
      serialNo: {
        type: String,
      },
      category: {
        type: String,
      },
      itemDescription: {
        type: String,
      },
      qty: {
        type: Number,
      },
      sellPrice: {
        type: Number,
      },
      totalPrice: {
        type: Number,
      },
    },
  ],
  sortedProducts: [
    {
      serialNo: {
        type: String,
      },
      category: {
        type: String,
      },
      itemDescription: {
        type: String,
      },
      qty: {
        type: Number,
      },
      sellPrice: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model('User', usersSchema);






  