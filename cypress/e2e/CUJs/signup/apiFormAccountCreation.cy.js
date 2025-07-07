import { faker } from '@faker-js/faker';
// import FormPageObject from '../../../pages/FormPageObject';
// import { API_ENDPOINTS } from '../../../fixtures/apiPaths'
// import { URLs } from '../../../pages/pageUrls'

// describe('API Account creation', () => {
//   it('should verify that the account was created using the (POST) method and that returns a (201) status for the request', () => {
//     const validEmail = faker.internet.email()
//     const validName = faker.person.fullName()
//     const validPassword = faker.internet.password(8)

//     cy.intercept('POST', API_ENDPOINTS.API_SIGNUP).as('createAccountRequest')
//     cy.visit(URLs.SIGNUP)
//     FormPageObject.actionFillEmail(validEmail)
//     FormPageObject.actionFillName(validName)
//     FormPageObject.actionFillPassword(validPassword)
//     FormPageObject.actionFillConfirmPassword(validPassword)
//     FormPageObject.actionClickSubmitSignUpButton()
//     cy.wait('@createAccountRequest').then(intercept => { 
//       expect(intercept.request.method).to.equal('POST')
//       expect(intercept.response.statusCode).to.equal(201)
//     })
//     // //cy.get(FORM_SELECTORS.EMAIL_INPUT).type(validEmail)
//     // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword)
//     // cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).type(validPassword)
//     // cy.get(FORM_SELECTORS.SUBMIT_SIGNUP_BUTTON).click() 
//     // cy.wait('@createAccountRequest').then(intercept => { 
//     // expect(intercept.request.method).to.equal('POST')
//     // expect(intercept.response.statusCode).to.equal(201)
//     // })
//   })
// })

import { USER1 } from '../../../fixtures/users';
import { API_ENDPOINTS } from '../../../fixtures/apiPaths';

describe('API Account creation', () => {
  it('should return 201 when API POST method is requested', () => {
    const validEmail = faker.internet.email()
    const validName = faker.person.fullName()
    const validPassword = faker.internet.password(8)
    cy.request({
      method: 'POST',
      url: API_ENDPOINTS.API_SIGNUP,
      body: {
        email: validEmail,
        name: validName,
        password: validPassword
      },
    }).then(response => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Usuario creado correctamente');
    });
  })
})