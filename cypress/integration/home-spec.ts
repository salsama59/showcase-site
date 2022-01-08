describe('The Home page end to end test', () => {
  it('Visits the home page', () => {
    cy.visit('/')
    cy.contains('showcase-site app is running!')
  });
});
