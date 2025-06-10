// Importa faker.js
import { faker, ur } from '@faker-js/faker';
import { URLs } from '../../../pages/pageUrls';
import { SIGNUP_SELECTORS } from '../../../pages/signupPage';

describe('Account creation form', () => {
  beforeEach(() => {
    cy.visit(URLs.SIGNUP)
  })

  const validEmail = faker.internet.email()
  const validName = faker.person.fullName()
  const validPassword = faker.internet.password(8)
  const successMessage = 'Operación Exitosa'
 
  it('Verify the form for creating a new user is visible.', () => {
    cy.get('form.mx-auto').should('be.visible')
    cy.get(SIGNUP_SELECTORS.EMAIL_INPUT).should('be.visible')
    cy.get(SIGNUP_SELECTORS.FULL_NAME_INPUT).should('be.visible')
    cy.get(SIGNUP_SELECTORS.PASSWORD_INPUT).should('be.visible')
    cy.get(SIGNUP_SELECTORS.CONFIRM_PASSWORD_INPUT).should('be.visible')
    cy.get(SIGNUP_SELECTORS.SUBMIT_BUTTON).should('be.visible')
    cy.get(`a[href='${URLs.LOGIN}']`).should('be.visible')
  })

  it ('Verify that the placeholder text for the fields is correct.', () => {
    cy.get(SIGNUP_SELECTORS.EMAIL_INPUT).should('have.attr', 'placeholder', 'Ingresa tu email')
    cy.get(SIGNUP_SELECTORS.FULL_NAME_INPUT).should('have.attr', 'placeholder','Ingresa tu nombre completo')
    cy.get(SIGNUP_SELECTORS.PASSWORD_INPUT).should('have.attr', 'placeholder', 'Ingresa tu contraseña')
    cy.get(SIGNUP_SELECTORS.CONFIRM_PASSWORD_INPUT).should('have.attr', 'placeholder', 'Repite tu contraseña')
  })

  it ('Verify the Email field accepts a valid email format.', () => {
    cy.get(SIGNUP_SELECTORS.EMAIL_INPUT).type(validEmail)
  })
  it('Verify the Full Name field accepts valid input.', () => {
    cy.get(SIGNUP_SELECTORS.FULL_NAME_INPUT).type(validName)
  })
  
  it('Verify the Password field accepts a valid password.', () => {
    cy.get(SIGNUP_SELECTORS.PASSWORD_INPUT).type(validPassword)
  })

  it('Get success notification when creating new account.', () => {  
    cy.get(SIGNUP_SELECTORS.EMAIL_INPUT).type(validEmail)
    cy.get(SIGNUP_SELECTORS.FULL_NAME_INPUT).type(validName)
    cy.get(SIGNUP_SELECTORS.PASSWORD_INPUT).type(validPassword)
    cy.get(SIGNUP_SELECTORS.CONFIRM_PASSWORD_INPUT).type(validPassword)
    cy.get(SIGNUP_SELECTORS.SUBMIT_BUTTON).should('be.visible').click()
    cy.wait(500)
    cy.get(SIGNUP_SELECTORS.MODAL_TITLE).contains(successMessage).should('be.visible')
  })

  it('Verify the user can confirm their account.', () => {
    cy.visit(URLs.CONFIRM+validEmail)
    cy.wait(800)
    cy.get(SIGNUP_SELECTORS.MODAL_TITLE).contains(successMessage).should('be.visible')
    cy.get(SIGNUP_SELECTORS.MODAL_TEXT).contains(validName).should('be.visible')
  })
})