Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data) => {
    cy.get('#firstName').type(data.firstname)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.openTextArea)
    cy.get('.button[type=submit]').click()
})