describe('testing Alex mega duper puper app', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('adding an item without a name - should fail', () => {
    cy.get('.w-full').should('have.value', '')
    cy.get('.text-white').click()
  })

  it('adding an item with negative quantity - should fail', () => {
    cy.get('.w-20').focus().type('{leftarrow}-')
    cy.get('.text-white').click()
  })

  it('edit option contains all units - should NOT fail', () => {
    cy.get('.text-white').click()
    cy.get('g#edit').click({ force: true })
    cy.get('.bg-white > select.shadow').focus().then(select => {
      const optionValues = [...select[0].options].map(option => option.value)
      expect(optionValues).to.include.members(['pounds', 'units', 'cups'])
    })
  })

  it('edit option allows negative quantity - should fail', () => {
    cy.get('.w-full').type('sample product')
    cy.get('.text-white').click()
    cy.get('g#edit').click({ force: true })
    cy.get('.bg-white > .w-20').focus().type('{leftarrow}-')
    cy.contains('Save').click()
  })

  it('item name + quantity + measurement type are striked-through - should NOT fail', () => {
    cy.get('.w-full').type('sample product')
    cy.get('.text-white').click()
    cy.get('.cursor-pointer > .flex > .text-gray-700').click()
    cy.get('.cursor-pointer > .flex > .text-gray-500').should('have.class', 'line-through')
  })

  it('clicking outside of modal marks item as completed - should NOT fail', () => {
    cy.get('.w-full').type('sample product')
    cy.get('.text-white').click()
    cy.get('g#edit').click({ force: true })
    cy.get('.fixed').click()
    cy.get('body').click(0,0)
    cy.get('g#edit').click({ force: true })
  })

  it('edit allows changing name to non capital first - shoud Fail', () => {
    cy.get('.w-full').type('sample product')
    cy.get('.text-white').click()
    cy.get('g#edit').click({ force: true })
    cy.get('.bg-white > .w-full').focus().type('{moveToStart}a')
    cy.contains('Save').click()
  })

  it('adding new item and saving it by clicking Enter on Keyboard - should NOT fail', () => {
    cy.get('.w-full').type('sample product')
    cy.get('body').type('{enter}')
  })

  it.only('editing item and saving it by clicking Enter on Keyboard - should NOT fail', () => {
    cy.get('.w-full').type('sample product')
    cy.get('body').type('{enter}')
    cy.get('g#edit').click({ force: true })
    cy.get('.bg-white > .w-full').focus().type('{moveToStart}a')
    cy.get('body').type('{enter}')
    cy.get('.bg-white > .w-full').should('not.exist')
  })
})
