import Add from './Add.svelte'
import { mount } from 'cypress-svelte-unit-test'

describe('Add', () => {
  it('works', () => {
    mount(Add, {
      callbacks: {
        add: cy.stub().as('add')
    }}, {
      cssFile: 'public/global.css'
    })
    cy.get('input').type('Washington, DC')
    cy.get('button').click()
    cy.get('@add').should('be.called')
      .its('firstCall.args.0.detail')
      .should('deep.equal', { city: 'Washington, DC' })
  })
})
