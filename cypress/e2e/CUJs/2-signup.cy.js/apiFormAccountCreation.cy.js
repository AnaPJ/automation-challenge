// Importa faker.js
import { faker } from '@faker-js/faker';
import { URLs} from '../../../pages/pageUrls';
import { FORM_SELECTORS } from '../../../pages/formSelectors';
import { API_ENDPOINTS } from '../../../fixtures/apiPaths';
import FormPageObject from '../../../pages/FormPageObject';

describe('API Account creation', () => {
  it('should verify that the account was created using the (POST) method and that returns a (201) status for the request', () => {
    const validEmail = faker.internet.email()
    const validName = faker.person.fullName()
    const validPassword = faker.internet.password(8)

    cy.intercept('POST', API_ENDPOINTS.API_SIGNUP).as('createAccountRequest')
    cy.visit(URLs.SIGNUP)
    FormPageObject.actionFillEmail(validEmail)
    FormPageObject.actionFillName(validName)
    FormPageObject.actionFillPassword(validPassword)
    FormPageObject.actionFillConfirmPassword(validPassword)
    FormPageObject.actionClickSubmitSignUpButton()
    cy.wait('@createAccountRequest').then(intercept => { 
      expect(intercept.request.method).to.equal('POST')
      expect(intercept.response.statusCode).to.equal(201)
    })
    // //cy.get(FORM_SELECTORS.EMAIL_INPUT).type(validEmail)
    // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword)
    // cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).type(validPassword)
    // cy.get(FORM_SELECTORS.SUBMIT_SIGNUP_BUTTON).click() 
    // cy.wait('@createAccountRequest').then(intercept => { 
    // expect(intercept.request.method).to.equal('POST')
    // expect(intercept.response.statusCode).to.equal(201)
    // })
  })
})