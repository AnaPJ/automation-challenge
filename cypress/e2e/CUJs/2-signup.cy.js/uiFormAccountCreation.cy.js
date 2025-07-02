import { faker, ur } from '@faker-js/faker';
import { URLs } from '../../../pages/pageUrls';
import { FORM_SELECTORS } from '../../../pages/formSelectors';
import FormPageObject from '../../../pages/FormPageObject';

describe('Account creation form', () => {
  beforeEach(() => {
    cy.visit(URLs.SIGNUP)
  })

  const validEmail = faker.internet.email()
  const validName = faker.person.fullName()
  const validPassword = faker.internet.password(8)
  const successMessage = 'Operación Exitosa'
 
  it('should verify that the form for creating a new user is ready to fill.', () => {
    FormPageObject.actionFindFormContainer();
    FormPageObject.assertionSignupFormFieldsAreReadyToFill();
    //Link ''Inicia Sesion''
    cy.get(`a[href='${URLs.LOGIN}']`).should('be.visible')
  })
    // cy.get(FORM_SELECTORS.FORM).shoud('be.visible')
    // cy.get(FORM_SELECTORS.EMAIL_INPUT).should('be.visible')
    // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).should('be.visible')
    // cy.get(FORM_SELECTORS.PASSWORD_INPUT).should('be.visible')
    // cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).should('be.visible')
    // cy.get(FORM_SELECTORS.SUBMIT_SIGNUP_BUTTON).should('be.visible')

  it('should verify that the submit signup button is disabled when the fields are empty.', () => {
    FormPageObject.assertionSubmitSignupButtonIsDisabled()
  })
  // cy.get(FORM_SELECTORS.SUBMIT_SIGNUP_BUTTON).should('be.disabled') 

  it ('should verify that the placeholder texts for the fields are correct.', () => {
    FormPageObject.assertionSignupFormPlaceHolders()
  })
    // cy.get(FORM_SELECTORS.EMAIL_INPUT).should('have.attr', 'placeholder', 'Ingresa tu email')
    // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).should('have.attr', 'placeholder','Ingresa tu nombre completo')
    // cy.get(FORM_SELECTORS.PASSWORD_INPUT).should('have.attr', 'placeholder', 'Ingresa tu contraseña')
    // cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).should('have.attr', 'placeholder', 'Repite tu contraseña')

  it ('should verify that the Email field accepts a valid email format.', () => {
    FormPageObject.actionFillEmail(validEmail)
  })
  // cy.get(SIGNUP_SELECTORS.EMAIL_INPUT).type(validEmail)

  it('should verify that the Full Name field accepts valid input.', () => {
    FormPageObject.actionFillName(validName)
  })
  // cy.get(SIGNUP_SELECTORS.FULL_NAME_INPUT).type(validName)
  
  it('should verify that the Password field accepts a valid password.', () => {
    FormPageObject.actionFillPassword(validPassword)
  })
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword)

  it('should get a success notification when creating new account.', () => {  
    FormPageObject.actionFillEmail(validEmail)
    FormPageObject.actionFillName(validName)
    FormPageObject.actionFillPassword(validPassword)
    FormPageObject.actionFillConfirmPassword(validPassword)
    FormPageObject.actionClickSubmitSignUpButton()
    FormPageObject.actionFindModalTitle().contains(successMessage).should('be.visible')
    FormPageObject.actionClickGoToLoginButton()
    cy.wait(1000)
    cy.url().should('eq', Cypress.config('baseUrl') + URLs.LOGIN);
  })
    // cy.get(FORM_SELECTORS.EMAIL_INPUT).type(validEmail)
    // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).type(validName)
    // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword)
    // cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).type(validPassword)
    // cy.get(FORM_SELECTORS.SUBMIT_SIGNUP_BUTTON).should('be.visible').click()
    // cy.get(FORM_SELECTORS.MODAL_TITLE).contains(successMessage).should('be.visible')
    // cy.contains('button', 'Ir al login').should('be.visible').click()
    // cy.wait(1000)
    // cy.url().should('eq', Cypress.config('baseUrl') + URLs.LOGIN);

  it('should verify that the user can confirm their account.', () => {
    cy.visit(URLs.CONFIRM+validEmail)
    cy.wait(1000)
    FormPageObject.actionFindModalTitle().contains(successMessage).should('be.visible')
    FormPageObject.actionFindModalText().contains(validName).should('be.visible')
  })
  // cy.get(FORM_SELECTORS.MODAL_TITLE).contains(successMessage).should('be.visible')
  // cy.get(FORM_SELECTORS.MODAL_TEXT).contains(validName).should('be.visible')
})