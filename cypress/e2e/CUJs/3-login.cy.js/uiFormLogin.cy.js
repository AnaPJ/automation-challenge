import { faker, ur } from '@faker-js/faker';
import { USER1 } from '../../../fixtures/users';
import { URLs } from '../../../pages/pageUrls';
import { FORM_SELECTORS } from '../../../pages/formSelectors';
import FormPageObject from '../../../pages/FormPageObject';
import NavBarPageObject from '../../../pages/NavBarPageObject';

describe('Login form', () => {

  beforeEach(() => {
    cy.visit(URLs.LOGIN)
  })

  const validEmail = USER1.userEmail
  const validPassword = USER1.password
  const expectedCookieName = '__AUTH-TOKEN-APP';

  it('should verify that the form for logging is ready to fill.', () => {
    FormPageObject.actionFindFormContainer().should('be.visible');
    FormPageObject.assertionLoginFormFieldsAreReadyToFill();
  });  
  //  cy.get(FORM_SELECTORS.FORM).should('be.visible')
  //  cy.get(FORM_SELECTORS.EMAIL_INPUT).should('be.visible')
  //  cy.get(FORM_SELECTORS.PASSWORD_INPUT).should('be.visible')

  it('should verify that the submit login button is disabled when the fields are empty.', () => {
    FormPageObject.assertionSubmitLoginButtonIsDisabled()
  })
  // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.disabled')  
  
  it('should verify that the submit login button is enabled when the fields are filled and that the placeholder texts for the fields are correct.', () => {
    FormPageObject.assertionLoginFormPlaceHolders();
  });
  //  cy.get(FORM_SELECTORS.FORM).should('be.visible')
  //  cy.get(FORM_SELECTORS.EMAIL_INPUT).should('be.visible')
  //  cy.get(FORM_SELECTORS.PASSWORD_INPUT).should('be.visible')

  it ('should verify that the Email field accepts a valid email format.', () => {
    FormPageObject.actionFillEmail(validEmail)
  })
  // cy.get(SIGNUP_SELECTORS.EMAIL_INPUT).type(validEmail)

  it('should verify the that the Password field accepts a valid password.', () => {
    FormPageObject.actionFillPassword(validPassword)
  })
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword)
    
  it('should login successfully and create an authentication cookie', () => {  
    FormPageObject.actionFillEmail(validEmail)
    FormPageObject.actionFillPassword(validPassword)
    FormPageObject.actionClickSubmitLoginButton()
    cy.wait(1000)
    cy.url().should('eq', Cypress.config('baseUrl') + URLs.HOME);
    cy.getCookie(expectedCookieName).should('exist');
    NavBarPageObject.assertionNavBarLinksAreVisible();
  }
)
  // cy.get(FORM_SELECTORS.EMAIL_INPUT).type(validEmail)
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword)
  // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.visible').click()
  // cy.getCookie(expectedCookieName).should('exist');
  // cy.url().should.equal(URLs.HOME);
  // cy.get(GLOBAL_SELECTORS.INICIO).should('be.visible');
  // cy.get(GLOBAL_SELECTORS.FAVORITOS).should('be.visible');
  // cy.get(GLOBAL_SELECTORS.MI_CUENTA).should('be.visible');
  // cy.get(GLOBAL_SELECTORS.CERRAR_SESION).should('be.visible');      
})
