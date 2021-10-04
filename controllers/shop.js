const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  console.log('isaac is \n'+req.user.name)
  Product.findAll()
  .then((products) => { 
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch((err) => {console.error(err) })
  .catch((err) => {console.error(err); });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where: {id: prodId}})
  .then(products => {   
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products[0].title,
      path: '/products'
    });
  })
  .catch((err) => {console.error(err);});
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
   
  })
  .catch((err) => {console.log(err);});
};

exports.getCart = (req, res, next) => {
 
  req.user
  .getCart()
  .then(cart =>{
    return cart
    .getProduct()
    .then(products =>{
      res.render('shop/cart',{
        path:'/cart',
        products:products,
      })
    })
    .catch(err => console.log(err));
  })
  .catch(function (err) {
    console.log(err);
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
 .then((cart) => {
   fetchedCart = cart;
   return cart.getProduct({where: {id: prodId}})
  })
  .then((products) => {
    let product;
    if(products.length > 0) {
      product = products[0];
    }
    let newQuantity = 1;
    if (product){

    }
    return Product.findByPk(prodId)
    .then(product => {
      return fetchedCart.addProduct(product, { through: {quantity: newQuantity} });
    })
    .catch((err) => {console.log(err)});
     
  })

  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId, product => {
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
