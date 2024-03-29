import fs from "fs"

export default class FileContainer {
  constructor(path) {
    this.path = path
  }

  async getAll() {
    const users = await this.#readFile()
    return users
  }

  async save(user) {
    const users = await this.#readFile()
    const id = await this.#getId()
    const newUser = { id, ...user }
    users.push(newUser)
    await fs.promises.writeFile(this.path, JSON.stringify(users))
    return newUser
  }

  async getByID(userId) {
    const users = await this.#readFile()
    const user = users.find((u) => u.id === userId)
    return user
  }

  async deleteByID(userId) {
    const users = await this.#readFile()
    const index = await this.#getIndex(userId)
    users.splice(index, 1)
    await fs.promises.writeFile(this.path, JSON.stringify(users))
    return userId
  }

  async deleteAll() {
    await fs.promises.unlink(this.path)
  }

  async updateByID(userId, obj) {
    const users = await this.#readFile()
    const index = await this.#getIndex(userId)
    const newUser = { ...users[index], ...obj }
    users.splice(index, 1, newUser)
    await fs.promises.writeFile(this.path, JSON.stringify(users))
    return newUser
  }

  // Métodos privados
  #readFile = async () => {
    if (fs.existsSync(this.path)) {
      const usersFile = await fs.promises.readFile(this.path, "utf-8")
      return JSON.parse(usersFile)
    } else {
      return []
    }
  }

  #getIndex = async (id) => {
    const users = await this.#readFile()
    return users.findIndex((user) => user.id === id)
  }

  #getId = async () => {
    let id
    const users = await this.#readFile()
    if (users.length === 0) {
      id = 1
    } else {
      id = users[users.length - 1].id + 1
    }

    return id
  }
}
