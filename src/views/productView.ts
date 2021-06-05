import { Product } from "../models/Products";

export default {
  render(product: Product) {
    return {
      id: product.id_product,
      name: product.name,
      amount: product.amount,
      name_category: product.name_category,
      price: product.price
    }
  },
  renderMany(product: Product[]) {
    return product.map(product => this.render(product))
  }
}
