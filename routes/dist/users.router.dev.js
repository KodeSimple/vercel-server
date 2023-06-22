"use strict";

var express = require('express');

var getAllUsersController = require('../controllers/getAllUsers.controller');

var productListController = require('../controllers/productList.controller');

var addProductController = require('../controllers/addProduct.controller');

var changePasswordController = require('../controllers/changePassword.controller');

var addUserController = require('../controllers/addUser.controller');

var loginController = require('../controllers/login.controller');

var currentProductController = require('../controllers/getAvailableBalance.controller');

var searchProductController = require('../controllers/eposOnline.controller');

var removeCartController = require('../controllers/removeCart.controller');

var requestSalesController = require('../controllers/requestSales.controller');

var submitSalesController = require('../controllers/submitSales.controller');

var requestSalesListController = require('../controllers/salesList.controller');

var requestSalesReceiptController = require('../controllers/salesReceipt.controller');

var requestUserInfoController = require('../controllers/userInfo.controller');

var userRouter = express.Router();
userRouter.post('/signup', addUserController.addUser); //http://localhost:8080/users/signup

userRouter.post('/login', loginController.login); //http://localhost:8080/users/login

userRouter.get('/getUsers', getAllUsersController.getAllUsers); //http://localhost:8080/users/getUsers

userRouter.put('/change-password', changePasswordController.changePassword); //http://localhost:8080/users/change-password

userRouter.post('/productList', productListController.productList); //http://localhost:8080/users/pruductList

userRouter.post('/addproduct', addProductController.addProduct); //http://localhost:8080/users/add-product

userRouter.post('/current-product', currentProductController.availableBalance); //http://localhost:8080/users/add-product

userRouter.post('/search-product', searchProductController.getProductListBySerial); //http://localhost:8080/users/pruductList 

userRouter.post('/remove-cart', removeCartController.removeCart); //http://localhost:8080/users/pruductList 

userRouter.post('/request-sales', requestSalesController.requestSales); //http://localhost:8080/users/request-sales

userRouter.post('/submit-sales', submitSalesController.submitSales); //http://localhost:8080/users/submit-sales

userRouter.post('/sales-list', requestSalesListController.salesList); //http://localhost:8080/users//sales-list

userRouter.post('/sales-receipt', requestSalesReceiptController.salesReceipt); //http://localhost:8080/users//sales-receipt

userRouter.post('/user-info', requestUserInfoController.GetUserInfo); //http://localhost:8080/users//user-info

module.exports = userRouter;