const express = require('express');

const getAllUsersController = require('../controllers/getAllUsers.controller');
const productListController = require('../controllers/productList.controller');
const addProductController = require('../controllers/addProduct.controller');
const changePasswordController = require('../controllers/changePassword.controller');
const addUserController = require('../controllers/addUser.controller');
const loginController = require('../controllers/login.controller');
const currentProductController = require('../controllers/getAvailableBalance.controller');
const searchProductController = require('../controllers/eposOnline.controller');
const removeCartController = require('../controllers/removeCart.controller');
const requestSalesController = require('../controllers/requestSales.controller');
const submitSalesController = require('../controllers/submitSales.controller');
const requestSalesListController = require('../controllers/salesList.controller');
const requestSalesReceiptController = require('../controllers/salesReceipt.controller');
const requestUserInfoController = require('../controllers/userInfo.controller');

const userRouter = express.Router();

userRouter.post('/signup', addUserController.addUser); //http://localhost:8080/users/signup
userRouter.post('/login', loginController.login); //http://localhost:8080/users/login
userRouter.get('/getUsers', getAllUsersController.getAllUsers); //http://localhost:8080/users/getUsers
userRouter.put('/change-password', changePasswordController.changePassword); //http://localhost:8080/users/change-password
userRouter.post('/productList', productListController.productList); //http://localhost:8080/users/pruductList
userRouter.post('/addproduct', addProductController.addProduct);  //http://localhost:8080/users/add-product
userRouter.post('/current-product', currentProductController.availableBalance);  //http://localhost:8080/users/add-product
userRouter.post('/search-product', searchProductController.getProductListBySerial); //http://localhost:8080/users/pruductList 
userRouter.post('/remove-cart', removeCartController.removeCart); //http://localhost:8080/users/pruductList 
userRouter.post('/request-sales',  requestSalesController.requestSales); //http://localhost:8080/users/request-sales
userRouter.post('/submit-sales', submitSalesController.submitSales ); //http://localhost:8080/users/submit-sales
userRouter.post('/sales-list', requestSalesListController.salesList ); //http://localhost:8080/users//sales-list
userRouter.post('/sales-receipt', requestSalesReceiptController.salesReceipt ); //http://localhost:8080/users//sales-receipt
userRouter.post('/user-info', requestUserInfoController.GetUserInfo ); //http://localhost:8080/users//user-info





module.exports = userRouter;
