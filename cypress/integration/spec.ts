describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('showcase-site')
    cy.contains('showcase-site app is running!')
  })
})
