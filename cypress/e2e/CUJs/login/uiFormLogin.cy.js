import { USER1 } from '../../../fixtures/users';
import { URLs } from '../../../pages/pageUrls';
import { FORM_SELECTORS } from '../../../pages/formSelectors';
import FormPageObject from '../../../pages/FormPageObject';
import LoginPageObject from '../../../pages/LoginPageObject';
import { API_ENDPOINTS } from '../../../fixtures/apiPaths';

describe('Login functionality', () => {

  beforeEach(() => {
    cy.visit(URLs.LOGIN)
  })

  const validEmail = USER1.userEmail
  const validPassword = USER1.password

  it('should verify that the form for logging is ready to fill.', () => {
    FormPageObject.actionFindFormContainer().should('be.visible');
    FormPageObject.assertionLoginFormFieldsAreReadyToFill();
  });  
  //  cy.get(FORM_SELECTORS.FORM).should('be.visible')
  //  cy.get(FORM_SELECTORS.EMAIL_INPUT).should('be.visible')
  //  cy.get(FORM_SELECTORS.PASSWORD_INPUT).should('be.visible')

  it('should verify that the submit login button is disabled when the fields are empty.', () => {
    FormPageObject.assertionSubmitLoginButtonIsDisabled();
  })
  // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.disabled')  
  
  it('should verify that the submit login button is enabled when the fields are filled and that the placeholder texts for the fields are correct.', () => {
    FormPageObject.assertionLoginFormPlaceHolders();
  });
  //  cy.get(FORM_SELECTORS.FORM).should('be.visible')
  //  cy.get(FORM_SELECTORS.EMAIL_INPUT).should('be.visible')
  //  cy.get(FORM_SELECTORS.PASSWORD_INPUT).should('be.visible')

  it ('should verify that the Email field accepts a valid email format.', () => {
    FormPageObject.actionFillEmail(validEmail);
  })
  // cy.get(SIGNUP_SELECTORS.EMAIL_INPUT).type(validEmail)

  it('should verify the that the Password field accepts a valid password.', () => {
    FormPageObject.actionFillPassword(validPassword);
  })
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword)
    
  it('should login successfully and create an authentication cookie', () => {  
    LoginPageObject.actionPerfomLogin();
    LoginPageObject.assertionNavBarLoginLinksAreVisible();
  }
)
  // cy.get(FORM_SELECTORS.EMAIL_INPUT).type(validEmail)
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword)
  // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.visible').click()
  // cy.getCookie(DATA.COOKIE_NAME).should('exist')
  // cy.url().should.equal(URLs.HOME)
  // cy.get(URLs.HOME).should('be.visible')
  // cy.get(GLOBAL_SELECTORS.FAVORITE).should('be.visible')
  // cy.get(GLOBAL_SELECTORS.MY_ACCOUNT).should('be.visible')
  // cy.get(GLOBAL_SELECTORS.LOGOUT).should('be.visible')  
})

describe('Validate API Account login', () => {
  it('should verify that the user can login to the application using the (POST) method that returns a (201) status for the request', () => {
    const validEmail = USER1.userEmail
    const validPassword = USER1.password

    cy.intercept('POST', API_ENDPOINTS.API_LOGIN).as('loginRequest')
    cy.visit(URLs.LOGIN)
    FormPageObject.actionFillEmail(validEmail)
    FormPageObject.actionFillPassword(validPassword)
    FormPageObject.actionClickSubmitLoginButton()
    cy.wait('@loginRequest').then(intercept => { 
      expect(intercept.request.method).to.equal('POST')
      expect(intercept.response.statusCode).to.equal(201)
    })
    // cy.get(FORM_SELECTORS.EMAIL_INPUT).type(validEmail)
    // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword)
    // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).click() 
  })
})
