import { Sales } from "../models/Sales"

export default {
  render(sales: Sales) {
    return {
      id: sales.id_sale,
      value: sales.value,
      costumer: sales.costumer,
      created_at: sales.created_at,
      admin_id: sales.admin_id
    }
  },
  renderMany(sales: Sales[]) {
    return sales.map(sales => this.render(sales))
  }
}