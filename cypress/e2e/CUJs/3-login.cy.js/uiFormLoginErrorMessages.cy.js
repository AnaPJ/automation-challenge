import { faker, ur } from '@faker-js/faker';
import { USER1 } from '../../../fixtures/users';
import { URLs } from '../../../pages/pageUrls';
import { LOGIN_SELECTORS } from '../../../pages/loginPageSelectors';

describe('Login form', () => {
  beforeEach(() => {
    cy.visit(URLs.LOGIN)
  })

  const invalidEmail = faker.internet.email()
  const invalidPassword = faker.internet.password(7)

  it('Verify the submit login button is disabled when the user enters an invalid email.', () => {
       cy.get(LOGIN_SELECTORS.FORM).should('be.visible')
       cy.get(LOGIN_SELECTORS.EMAIL_INPUT).type(invalidEmail)
       cy.get(LOGIN_SELECTORS.PASSWORD_INPUT)
       cy.get(LOGIN_SELECTORS.SUBMIT_BUTTON).should('be.disabled') 
     })

  it('Verify the submit login button is disabled when the user enters a password with less than 8 characters.', () => {
    cy.get(LOGIN_SELECTORS.FORM).should('be.visible')
      cy.get(LOGIN_SELECTORS.EMAIL_INPUT).type(EMAIL_INPUT)
       cy.get(LOGIN_SELECTORS.EMAIL_INPUT).type(invalidPassword)
      cy.get(LOGIN_SELECTORS.SUBMIT_BUTTON).should('be.disabled') 
     })
  
  it('Verify the error message for empty Email field.', () => {
    cy.get(LOGIN_SELECTORS.EMAIL_INPUT).type('test').clear()
    cy.get(LOGIN_SELECTORS.EMAIL_INPUT).next(LOGIN_SELECTORS.ERROR_MESSAGE).should('be.visible').and('have','Este campo es requerido')
    })
  
  it('Verify the error message for empty Password field.', () => {
    cy.get(LOGIN_SELECTORS.PASSWORD_INPUT).type('test').clear()
    cy.get(LOGIN_SELECTORS.PASSWORD_INPUT).next(LOGIN_SELECTORS.ERROR_MESSAGE).should('be.visible').and('have','Este campo es requerido')
    })
  
   it('Verify the error message for an invalid Email.', () => {
    cy.get(LOGIN_SELECTORS.EMAIL_INPUT).type(invalidEmail)
    cy.get(LOGIN_SELECTORS.EMAIL_INPUT).next(LOGIN_SELECTORS.ERROR_MESSAGE).should('be.visible').and('have','Email inválido')
    })
  
  it('Verify the error message for an invalid Password.', () => {
    cy.get(LOGIN_SELECTORS.PASSWORD_INPUT).type('test').clear()
    cy.get(LOGIN_SELECTORS.PASSWORD_INPUT).next(LOGIN_SELECTORS.ERROR_MESSAGE).should('be.visible').and('have','La contraseña debe tener al menos 8 caracteres')
    }) 

})
