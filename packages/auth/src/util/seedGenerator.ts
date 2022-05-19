const seedGenerator = (amount: number) => {
  let i = 0
  const seededUsers = []

  let randomGenerator =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)

  while (i <= amount) {
    seededUsers.push({
      firstName: 'John',
      lastName: 'Smith',
      handle: randomGenerator,
      email: `${randomGenerator.slice(0, 5) + i}@aol.com`,
      hash: randomGenerator,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    randomGenerator =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    i++
  }

  return seededUsers
}

export default seedGenerator
