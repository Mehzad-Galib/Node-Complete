const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    // the following code will immediately saves the input to the DB
    Product.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
    }).then((result => {
        res.redirect('/admin/products');
    })).catch((err) => {
        console.log(err);
    })
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId).then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    }).catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findByPk(prodId).then(pd => {
        pd.title = updatedTitle;
        pd.price = updatedPrice;
        pd.description = updatedDesc;
        pd.imageUrl = updatedImageUrl;
        return pd.save();
    }).then(result => {
        console.log('Updated Product', result);
        res.redirect('/admin/products');
    }).catch((err) => {
        console.log(err);
    })
};

exports.getProducts = (req, res, next) => {
    Product.findAll().then((pd) => {
        res.render('admin/products', {
            prods: pd,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    }).catch((err) => {
        console.log(err)
    });

};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.destroy({ where: { id: prodId } }).then((result) => {
        res.redirect('/admin/products');
    }).catch((err) => {
        console.log(err);
    })

};