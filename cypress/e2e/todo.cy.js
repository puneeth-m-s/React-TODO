describe('Todo app', () => {
  it('adds, edits, marks done, and deletes a todo', () => {
    cy.visit('/')

    cy.get('input[type="text"]').first().type('Buy milk')
    cy.contains('button', 'Add todo').click()

    cy.get('table tbody tr').last().should('contain.text', 'Buy milk')
    cy.get('table tbody tr').last().within(() => {
      cy.contains('button', 'Edit').click()
    })

    cy.get('table tbody tr').last().find('input[type="text"]').clear().type('Buy bread')
    cy.get('table tbody tr').last().within(() => {
      cy.contains('button', 'Save').click()
    })

    cy.get('table tbody tr').last().should('contain.text', 'Buy bread')
    cy.get('table tbody tr').last().within(() => {
      cy.contains('button', 'Done').click()
    })

    cy.get('table tbody tr').last().should('contain.text', 'Yes')

    cy.get('table tbody tr').last().within(() => {
      cy.contains('button', 'Delete').click()
    })

    cy.get('table tbody tr').should('not.contain.text', 'Buy bread')
  })
})
