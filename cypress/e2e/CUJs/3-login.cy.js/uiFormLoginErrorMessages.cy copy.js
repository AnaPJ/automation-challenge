import { faker, ur } from '@faker-js/faker';
import { USER1 } from '../../../fixtures/users';
import { URLs } from '../../../pages/pageUrls';
import { LOGIN_SELECTORS } from '../../../pages/loginPageSelectors';

describe('Login form', () => {
  beforeEach(() => {
    cy.visit(URLs.LOGIN)
  })

  const validEmail = USER1.userEmail
  const validPassword = USER1.password
  const invalidEmail = faker.internet.email()
  const invalidPassword = faker.internet.password(7)

    it('Verify the form for logging is visible.', () => {
  //   cy.get(LOGIN_SELECTORS.FORM).should('be.visible')
  //   cy.get(LOGIN_SELECTORS.EMAIL_INPUT).should('be.visible')
  //   cy.get(LOGIN_SELECTORS.PASSWORD_INPUT).should('be.visible')
  // })
  
    it('Verify that the placeholder texts for the fields are correct.', () => {
  //   cy.get(LOGIN_SELECTORS.FORM).should('be.visible')
  //   cy.get(LOGIN_SELECTORS.EMAIL_INPUT).should('be.visible')
  //   cy.get(LOGIN_SELECTORS.PASSWORD_INPUT).should('be.visible')
  // })

  

  
  

})
