export const Query = {
  products: (parent, { filter = {} }, { db }) => {
    console.log(db.reviews);
    let filteredProducts = db.products;
    const { onSale, avgRating } = filter;
    if (onSale) {
      filteredProducts = filteredProducts.filter(
        product => product.onSale === filter.onSale,
      );
    }
    if ([1, 2, 3, 4, 5].includes(avgRating)) {
      filteredProducts = filteredProducts.filter(product => {
        const productReviews = db.reviews.filter(
          review => review.productId === product.id,
        );
        const sumRating = productReviews.reduce(
          (sum, review) => (sum += review.rating),
          0,
        );
        const numberOfReviews = productReviews.length;
        const avgProductRating = sumRating / numberOfReviews;
        return avgProductRating >= avgRating;
      });
    }
    return filteredProducts;
  },

  product: (parent, args, { db }) => {
    const productId = args.id;
    return db.products.find(product => product.id === productId);
  },

  categories: (parent, args, { db }) => {
    return db.categories;
  },

  category: (parent, args, { db }) => {
    const categoryId = args.id;
    return db.categories.find(category => category.id === categoryId);
  },
};
