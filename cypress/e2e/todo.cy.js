describe('Todo app', () => {
  const addTodo = (title) => {
    cy.get('input[type="text"]').first().clear().type(title)
    cy.contains('button', 'Add todo').click()
  }

  beforeEach(() => {
    cy.visit('/')
  })

  it('shows validation when trying to add an empty todo', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub')
    })

    cy.contains('button', 'Add todo').click()
    cy.get('@alertStub').should('have.been.calledWith', 'Enter todo title!')
  })

  it('adds a todo item to the table', () => {
    addTodo('Buy milk')

    cy.get('table tbody tr').last().should('contain.text', 'Buy milk')
    cy.get('table tbody tr').last().should('contain.text', 'No')
  })

  it('edits a todo and saves the updated title', () => {
    addTodo('Buy milk')

    cy.get('table tbody tr').last().within(() => {
      cy.contains('button', 'Edit').click()
    })

    cy.get('table tbody tr').last().find('input[type="text"]').clear().type('Buy bread')
    cy.get('table tbody tr').last().within(() => {
      cy.contains('button', 'Save').click()
    })

    cy.get('table tbody tr').last().should('contain.text', 'Buy bread')
    cy.get('table tbody tr').last().should('not.contain.text', 'Buy milk')
  })

  it('cancels an edit without changing the todo title', () => {
    addTodo('Read book')

    cy.get('table tbody tr').last().within(() => {
      cy.contains('button', 'Edit').click()
    })

    cy.get('table tbody tr').last().find('input[type="text"]').clear().type('Read novel')
    cy.get('table tbody tr').last().within(() => {
      cy.contains('button', 'Cancel').click()
    })

    cy.get('table tbody tr').last().should('contain.text', 'Read book')
    cy.get('table tbody tr').last().should('not.contain.text', 'Read novel')
  })

  it('marks a todo as done and deletes it', () => {
    addTodo('Write blog')

    cy.get('table tbody tr').last().within(() => {
      cy.contains('button', 'Done').click()
    })

    cy.get('table tbody tr').last().should('contain.text', 'Yes')

    cy.get('table tbody tr').last().within(() => {
      cy.contains('button', 'Delete').click()
    })

    cy.get('table tbody tr').should('not.contain.text', 'Write blog')
  })
})
