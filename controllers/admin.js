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

  // Product.create({ 
  //   title:title,
  //   price:price, 
  //   description:description, 
  //   imageUrl:imageUrl,
  //   userId:req.user.id,
  // })
  req.user.createProduct({ 
      title:title,
      price:price, 
      description:description, 
      imageUrl:imageUrl,
    
    })
  .then(data => {
    console.log(data);
    return res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // Product.findAll({where: {id:prodId}})
  req.user.user
  .getProducts()
  .then( product => {
    if (!product[0]) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0]
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findAll({where:{id:prodId}})
  .then((product) => {
    product[0].title = updatedTitle;
    product[0].description = updatedDesc;
    product[0].price = updatedPrice;
    product[0].imageUrl = updatedImageUrl;
    return product[0].save();
  }).then((product) => {
    console.log('updated product');
    res.redirect('/admin/products');
  }).catch((err) => {
    console.error(err);
  })
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products =>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });

  }).catch(err =>{
    console.error(err);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.destroy({where: {id: prodId}}).then(() => {
    res.redirect('/admin/products');
  }).catch(err =>{
    console.error(err);
  })
};
