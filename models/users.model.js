const users = [
    { 
        businessName: '0',
        firstName: '0',
        lastName: '0',
        userName: '0',
        email: '0',
        password: '0',
        confirmPassword: '0',
        productList: [
            {userId: '01', entryDate: '2023-01-01', serialNo: '01', category: '1', itemDescription: '1', qty: '1', buyPrice: '1', sellPrice: '1', profit: '0'},
            {userId: '02', entryDate: '2023-01-01', serialNo: '02', category: '2', itemDescription: '2', qty: '2', buyPrice: '2', sellPrice: '3', profit: '0'}
        ]
    },
    { 
        businessName: '1',
        firstName: '1',
        lastName: '1',
        userName: '1',
        email: '1',
        password: '1',
        confirmPassword: '1',
        productList: [
            { userId: '01', entryDate: '2023-01-01', serialNo: '123456', category: 'Electronics', itemDescription: 'Smartphone', qty: '1', buyPrice: 500, sellPrice: 700, profit: 200 },
            { userId: '02', entryDate: '2023-01-02', serialNo: '789012', category: 'Appliances', itemDescription: 'Refrigerator', qty: '1',buyPrice: 1000, sellPrice: 1500, profit: 500 },
            { userId: '03', entryDate: '2023-01-03', serialNo: '345678', category: 'Furniture', itemDescription: 'Sofa', qty: '1', buyPrice: 800, sellPrice: 1200, profit: 400 },
        ]
    }
];

module.exports = users;
