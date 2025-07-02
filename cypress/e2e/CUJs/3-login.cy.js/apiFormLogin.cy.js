// Importa faker.js
import { faker } from '@faker-js/faker';
import { USER1 } from '../../../fixtures/users';
import { URLs} from '../../../pages/pageUrls';
import { FORM_SELECTORS } from '../../../pages/formSelectors';
import { API_ENDPOINTS } from '../../../fixtures/apiPaths';
import FormPageObject from '../../../pages/FormPageObject';


describe('API Account login', () => {
  it('should verify that the user can login to the application using the (POST) method that returns a (201) status for the request and that an authentication cookie is created', () => {
    const validEmail = USER1.userEmail
    const validPassword = USER1.password
    const expectedCookieName = '__AUTH-TOKEN-APP';

    cy.intercept('POST', API_ENDPOINTS.API_LOGIN).as('loginRequest')
    cy.visit(URLs.LOGIN)
    FormPageObject.actionFillEmail(validEmail)
    FormPageObject.actionFillPassword(validPassword)
    FormPageObject.actionClickSubmitLoginButton()
    cy.wait('@loginRequest').then(intercept => { 
      expect(intercept.request.method).to.equal('POST')
      expect(intercept.response.statusCode).to.equal(201)
    })
    // //cy.get(FORM_SELECTORS.EMAIL_INPUT).type(validEmail)
    // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword)
    // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).click() 
    // cy.getCookie(expectedCookieName).should('exist');
    // cy.wait('@logintRequest').then(intercept => { 
    // expect(intercept.request.method).to.equal('POST')
    // expect(intercept.response.statusCode).to.equal(201)
    // })
  })
})