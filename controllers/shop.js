const Product = require('../models/product');
const Cart = require('../models/cart');

const db = require('../util/database');

exports.getProducts = (req, res, next) => {

    Product.findAll().then((pd) => {
        res.render('shop/product-list', {
            prods: pd,
            pageTitle: 'All Products',
            path: '/products'
        });
    }).catch((err) => {
        console.log(err);
    });

};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    // Product.findAll({ where: { id: prodId } }).then((pd) => {
    //         res.render('shop/product-detail', {
    //             product: pd[0],
    //             pageTitle: pd[0].title,
    //             path: '/products'
    //         });
    //     }).catch(err => {
    //         console.log(err);
    //     })

    // findById is deprecated in Sequelize, using findByPk instead
    Product.findByPk(prodId).then((pd) => {
        res.render('shop/product-detail', {
            product: pd,
            pageTitle: pd.title,
            path: '/products'
        });
    }).catch((err) => {
        console.log(err);
    })
};

exports.getIndex = (req, res, next) => {
    // findAll method in Sequelize will fetch all data inputed
    Product.findAll().then((pd) => {
        res.render('shop/index', {
            prods: pd,
            pageTitle: 'Shop',
            path: '/'
        });
    }).catch((err) => {
        console.log(err);
    })

};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};