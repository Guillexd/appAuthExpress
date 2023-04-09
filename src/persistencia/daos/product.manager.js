import productModel from '../models/product.model.js';

export default class ProductManager {
  async getProducts(props) {
    try {
      //const products = await productModel.find();
      const {limit=10, page=1, category, status, sort} = props;
      let queryFilter = {};
      const options = {limit, page};

      if(!(category == undefined) && status == undefined){
        queryFilter.category=category;
      }
      if(!(status == undefined) && category == undefined){
        queryFilter.status=status;
      }
      if(sort == 1 || sort==-1){
        options.sort= {price: sort};
      }

      const products= await productModel.paginate(queryFilter, options);

      const objProducts = {
        status: products.totalDocs ? 'success' : 'error',
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null,
        nextLink: products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null,
      }

      return objProducts;
    } catch (err) {
      console.log('getProducts: ' + err);
    }
  }

  async getProductById(id){
    try {
      const product = await productModel.findById(id);
      return product;
    } catch (err) {
      console.log('getProductById: ' + err);
    }
  }

  //paginate and aggregation tasks
  // async getProductsWithAggregate() {
  //   try {
  //     const valor = -1;
  //     const products = await productModel.aggregate([
  //       {$group: {
  //         _id: '$category',
  //         cantidad: {$sum: '$stock' }
  //       }},
  //       {
  //       $sort: {cantidad: valor
  //      }
  //     }
  //     ])
  //     return products;
  //   } catch (err) {
  //     console.log('getProductsWithAgregate: ' + err);
  //   }
  // }

  // async getProductsWithPaginate(props) {
  //   try {
  //     const {limit, page} = props;
  //     const products = await productModel.paginate({}, {limit, page});
  //     return products;
  //   } catch (err) {
  //     console.log('getProductsWithAgregate: ' + err);
  //   } 
  // }

  async addProducts(objProducts) {
    try {
      const cliente = await productModel.create(objProducts);
      return cliente;
    } catch (err) {
      console.log('addProducts: ' + err);
    }
  }
}