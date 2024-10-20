import { defineStore } from 'pinia'

export const useUsersStore = defineStore('user', {
  state: () => ({
    users: []
  }),
  actions: {
    addUser(usersArray) {
      const existingIds = this.users.map((user) => user.id)
      const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0

      const formattedUsers = usersArray.map((user) => ({
        name: user[0],
        username: user[1],
        financial: user[2],
        email: user[3],
        password: user[4],
        type: user[5],
        roles: user[6],
        id: maxId + 1,
        createdDate: new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        })
      }))

      this.users.push(...formattedUsers)
      localStorage.setItem('users', JSON.stringify(this.users))
    },
    deleteUser(id) {
      this.users = this.users.filter((user) => user.id !== id)
      localStorage.setItem('users', JSON.stringify(this.users))
    },

    editUser(updatedUser, id) {
      const index = this.users.findIndex((u) => u.id === id)
      this.users[index] = { ...this.users[index], ...updatedUser }
      localStorage.setItem('users', JSON.stringify(this.users))
    },
    loadUsers() {
      const storedUsers = localStorage.getItem('users')
      if (storedUsers) {
        this.users = JSON.parse(storedUsers)
      }
    }
  }
})
