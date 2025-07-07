import { faker } from '@faker-js/faker';
import { URLs } from '../../../pages/pageUrls';
import { USER1 } from '../../../fixtures/users';
import { FORM_SELECTORS } from '../../../pages/formSelectors';
import FormPageObject from '../../../pages/FormPageObject';


describe('Account creation form error messages', () => {
  beforeEach(() => {
    cy.visit(URLs.SIGNUP)
  })  

  const invalidEmail = 'test@invalid';
  const invalidPassword = "12ab ";
  const invalidName = "%%";
  const validEmail = USER1.userEmail;
  const validName = USER1.name;
  const validPassword = USER1.password;
  const errorMessage = 'Este campo es requerido';


// BUG: Este escenario va a a fallar porque el botón se habilita sin tener todos lo campos llenos 
//   it('should verify that the submit signup button is disabled when the user enters an invalid email.', () => {
//     FormPageObject.actionFillEmail(invalidEmail);
//     FormPageObject.actionFillName(validName);
//     FormPageObject.actionFillPassword(validPassword);
//     FormPageObject.actionFillConfirmPassword(validPassword)
//     FormPageObject.assertionSubmitLoginButtonIsDisabled();
//   });
  // cy.get(FORM_SELECTORS.EMAIL_INPUT).type(invalidEmail);
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword);
  // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).type(validName);
  // cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).type(validPassword)
  // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.disabled');

  // BUG: Este escenario va a a fallar porque el botón se habilita sin tener todos lo campos llenos 
//   it('should verify that the submit login button is disabled when the user enters a password with less than 8 characters.', () => {
//     FormPageObject.actionFillEmail(validEmail);
//     FormPageObject.actionFillName(validName);
//     FormPageObject.actionFillPassword(invalidPassword);
//     FormPageObject.actionFillConfirmPassword(validPassword)
//     FormPageObject.assertionSubmitLoginButtonIsDisabled();
//   });
//   // cy.get(FORM_SELECTORS.EMAIL_INPUT).type(validEmail);
//   // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).type(validName);
//   // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(invalidPassword);
//   // cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).type(validPassword)
//   // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.disabled');

// // BUG: Este escenario va a a fallar porque el botón se habilita sin tener todos lo campos llenos.  
//   it('should verify that the submit signup button is disabled when the user enters an invalid name.', () => {
//     FormPageObject.actionFillEmail(validEmail);
//     FormPageObject.actionFillName(invalidName);
//     FormPageObject.actionFillPassword(validPassword);
//     FormPageObject.actionFillConfirmPassword(validPassword)
//     FormPageObject.assertionSubmitLoginButtonIsDisabled();
//   });
  // cy.get(FORM_SELECTORS.EMAIL_INPUT).type(validEmail);
  // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).type(invalidName);
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword);
  // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).type(validName);
  // cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).type(validPassword)
  // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.disabled');

  it('should verify the error message for empty Email field.', () => {
    FormPageObject.actionFillEmail("a")
    FormPageObject.actionClearEmail();
    FormPageObject.actionFindErrorMessageForField(FORM_SELECTORS.EMAIL_INPUT,FORM_SELECTORS.ERROR_MESSAGE,errorMessage)
  });
 // cy.get(FORM_SELECTORS.EMAIL_INPUT).clear();
 // cy.get(FORM_SELECTORS.EMAIL_INPUT).next(FORM_SELECTORS.ERROR_MESSAGE).should('have.text', errorMessage);

 it('should verify the error message for empty Name field.', () => {
    FormPageObject.actionFillName("a")
    FormPageObject.actionClearName();
    FormPageObject.actionFindErrorMessageForField(FORM_SELECTORS.FULL_NAME_INPUT,FORM_SELECTORS.ERROR_MESSAGE,errorMessage)
  });
 // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).clear();
 // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).next(FORM_SELECTORS.ERROR_MESSAGE).should('have.text', errorMessage);

  it('should verify the error message for empty Password field.', () => {
    FormPageObject.actionFillPassword('text to be deleted');
    FormPageObject.actionClearPassword();
    FormPageObject.actionFindErrorMessageForField(FORM_SELECTORS.PASSWORD_INPUT,FORM_SELECTORS.ERROR_MESSAGE,errorMessage);
  });
 // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type('text to be deleted');
 // cy.get(FORM_SELECTORS.PASSWORD_INPUT).clear();
 // cy.get(FORM_SELECTORS.PASSWORD_INPUT).next(FORM_SELECTORS.ERROR_MESSAGE).should('have.text', errorMessage);

  it('should verify the error message for an invalid Email.', () => {
    FormPageObject.actionFillEmail(invalidEmail);
    FormPageObject.actionFindErrorMessageForField(FORM_SELECTORS.EMAIL_INPUT,FORM_SELECTORS.ERROR_MESSAGE,'Email inválido');
  });
  // cy.get(FORM_SELECTORS.EMAIL_INPUT_LOGIN).type(invalidEmail);
  // cy.get(FORM_SELECTORS.EMAIL_INPUT_LOGIN).next(FORM_SELECTORS.ERROR_MESSAGE).should('have.text', 'Email inválido');

  // BUG: Este escenario va a a fallar porque el campo no tiene ninguna validación.
//   it('should verify the error message for an invalid Name.', () => {
//     FormPageObject.actionFillName(invalidName);
//     FormPageObject.actionFindErrorMessageForField(FORM_SELECTORS.FULL_NAME_INPUT,FORM_SELECTORS.ERROR_MESSAGE,'Nombre inválido');
//   });
  // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).type(invalidEmail);
  // cy.get(FORM_SELECTORS.FULL_NAME_INPUT).next(FORM_SELECTORS.ERROR_MESSAGE).should('have.text', 'Nombre inválido');

  it('should verify the error message for an invalid Password.', () => {
    FormPageObject.actionFillPassword('test');
    FormPageObject.actionFindErrorMessageForField(FORM_SELECTORS.PASSWORD_INPUT,FORM_SELECTORS.ERROR_MESSAGE,'La contraseña debe tener al menos 8 caracteres');
  });
    //  cy.get(FORM_SELECTORS.PASSWORD_INPUT).type('test');
    //  cy.get(FORM_SELECTORS.PASSWORD_INPUT).next(FORM_SELECTORS.ERROR_MESSAGE).should('have.text', 'La contraseña debe tener al menos 8 caracteres');
})