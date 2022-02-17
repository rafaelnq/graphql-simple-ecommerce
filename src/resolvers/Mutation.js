import { v4 as uuid } from 'uuid';

export const Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name,
    };
    db.categories.push(newCategory);
    return newCategory;
  },

  addProduct: (parent, { input }, { db }) => {
    const { name, description, quantity, price, image, onSale, categoryId } =
      input;
    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    };
    db.products.push(newProduct);
    return newProduct;
  },

  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productId } = review;
    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };
    db.reviews.push(newReview);
    return newReview;
  },

  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter(category => category.id !== id);
    db.products = db.products.map(product => {
      if (product.categoryId === id) {
        return {
          ...product,
          categoryId: null,
        };
      } else {
        return product;
      }
    });
    return true;
  },

  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter(product => product.id !== id);
    db.reviews = db.reviews.filter(review => review.productId !== id);
    return true;
  },

  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter(review => review.id !== id);
    return true;
  },

  updateCategory: (parent, { id, input }, { db }) => {
    const categoryIndex = db.categories.findIndex(
      category => category.id === id,
    );
    if (!categoryIndex === -1) {
      return null;
    }
    db.categories[categoryIndex] = {
      ...db.categories[categoryIndex],
      ...input,
    };
    return db.categories[categoryIndex];
  },

  updateProduct: (parent, { id, input }, { db }) => {
    const productIndex = db.products.findIndex(product => product.id === id);
    if (!productIndex === -1) {
      return null;
    }
    db.products[productIndex] = {
      ...db.products[productIndex],
      ...input,
    };
    return db.products[productIndex];
  },

  updateReview: (parent, { id, input }, { db }) => {
    const reviewIndex = db.reviews.findIndex(review => review.id === id);
    if (!reviewIndex === -1) {
      return null;
    }
    db.reviews[reviewIndex] = {
      ...db.reviews[reviewIndex],
      ...input,
    };
    return db.reviews[reviewIndex];
  },
};
