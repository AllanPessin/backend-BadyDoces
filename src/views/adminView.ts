import { Admin } from "../models/Administrator"

export default {
  render(admin: Admin) {
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      password: admin.password,
    }
  },
  renderMany(admin: Admin[]) {
    return admin.map(admin => this.render(admin))
  }
}