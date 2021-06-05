import { Category } from "../models/Categories";

export default {
  render(category: Category) {
    return {
      id: category.id,
      category_name: category.category_name
    }
  },
  renderMany(category: Category[]) {
    return category.map(category => this.render(category))
  }
}