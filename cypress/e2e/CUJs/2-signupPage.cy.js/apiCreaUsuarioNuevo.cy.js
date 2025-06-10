// Importa faker.js
import { faker } from '@faker-js/faker';
import { URLs} from '../../../pages/pageUrls';
import { SIGNUP_SELECTORS } from '../../../pages/signupPage';
import { API_ENDPOINTS } from '../../../fixtures/apiPaths'

describe('API Account creation', () => {
  it('Verify the account was created using the (POST) method and returns a (201) status for the request', () => {
    const validEmail = faker.internet.email()
    const validName = faker.person.fullName()
    const validPassword = faker.internet.password(8)

    cy.intercept('POST', API_ENDPOINTS.API_SIGNUP).as('createAccountRequest')
    cy.visit(URLs.SIGNUP)
    cy.get(SIGNUP_SELECTORS.FULL_NAME_INPUT).type(validName)
    cy.get(SIGNUP_SELECTORS.EMAIL_INPUT).type(validEmail)
    cy.get(SIGNUP_SELECTORS.PASSWORD_INPUT).type(validPassword)
    cy.get(SIGNUP_SELECTORS.CONFIRM_PASSWORD_INPUT).type(validPassword)
    cy.get(SIGNUP_SELECTORS.SUBMIT_BUTTON).click() 
    cy.wait('@createAccountRequest').then(intercept => { 
      expect(intercept.request.method).to.equal('POST')
      expect(intercept.response.statusCode).to.equal(201)
    })
  })
})