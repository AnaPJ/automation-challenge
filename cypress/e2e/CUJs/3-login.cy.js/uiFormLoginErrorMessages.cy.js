import { faker } from '@faker-js/faker';
import { USER1 } from '../../../fixtures/users';
import { URLs } from '../../../pages/pageUrls';
import { FORM_SELECTORS } from '../../../pages/formSelectors';
import FormPageObject from '../../../pages/FormPageObject';


describe('Login form error messages', () => {
  beforeEach(() => {
    cy.visit(URLs.LOGIN);
  });

  const invalidEmail = 'mail';
  const invalidPassword = "hh";
  const validEmail = USER1.userEmail;
  const validPassword = USER1.password;
  const errorMessage = 'Este campo es requerido';

  it('should verify that the submit login button is disabled when the user enters an invalid email.', () => {
    FormPageObject.actionFillEmail(invalidEmail);
    FormPageObject.assertionSubmitLoginButtonIsDisabled();
  });
  // cy.get(FORM_SELECTORS.EMAIL_INPUT_LOGIN).type(invalidEmail);
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(validPassword);
  // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.disabled');
  
  it('should verify that the submit login button is disabled when the user enters a password with less than 8 characters.', () => {
    FormPageObject.actionFillEmail(validEmail);
    FormPageObject.actionFillPassword(invalidPassword);
    FormPageObject.assertionSubmitLoginButtonIsDisabled();
  });
  // cy.get(FORM_SELECTORS.EMAIL_INPUT_LOGIN).type(validEmail);
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(invalidPassword);
  // cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.disabled');

  it('should verify the error message for empty Email field.', () => {
    FormPageObject.actionFillEmail("a");
    FormPageObject.actionClearEmail();
    FormPageObject.actionFindErrorMessageForField(FORM_SELECTORS.EMAIL_INPUT,FORM_SELECTORS.ERROR_MESSAGE,errorMessage);
  });
  // cy.get(FORM_SELECTORS.EMAIL_INPUT_LOGIN).clear();
  // cy.get(FORM_SELECTORS.EMAIL_INPUT_LOGIN).next(FORM_SELECTORS.ERROR_MESSAGE).should('contain', errorMessage);

  it('should verify the error message for empty Password field.', () => {
    FormPageObject.actionFillPassword('text to be deleted');
    FormPageObject.actionClearPassword();
    FormPageObject.actionFindErrorMessageForField(FORM_SELECTORS.PASSWORD_INPUT,FORM_SELECTORS.ERROR_MESSAGE,errorMessage);
  });
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type('text to be deleted');
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).clear();
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).next(FORM_SELECTORS.ERROR_MESSAGE).should('contain', errorMessage);

  it('should verify the error message for an invalid Email.', () => {
    FormPageObject.actionFillEmail(invalidEmail);
    FormPageObject.actionFindErrorMessageForField(FORM_SELECTORS.EMAIL_INPUT,FORM_SELECTORS.ERROR_MESSAGE,'Email inválido');
  });
  // cy.get(FORM_SELECTORS.EMAIL_INPUT_LOGIN).type(invalidEmail);
  // cy.get(FORM_SELECTORS.EMAIL_INPUT_LOGIN).next(FORM_SELECTORS.ERROR_MESSAGE).should('contain', 'Email inválido');

  it('should verify the error message for an invalid Password.', () => {
    FormPageObject.actionFillPassword('test');
    FormPageObject.actionFindErrorMessageForField(FORM_SELECTORS.PASSWORD_INPUT,FORM_SELECTORS.ERROR_MESSAGE,'La contraseña debe tener al menos 8 caracteres');
  });
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).type('test');
  // cy.get(FORM_SELECTORS.PASSWORD_INPUT).next(FORM_SELECTORS.ERROR_MESSAGE).should('contain', 'La contraseña debe tener al menos 8 caracteres');

  it('should verify the error message for an failed login attempt', () => {
    FormPageObject.actionFillEmail(validEmail);
    FormPageObject.actionFillPassword('12345678');
    FormPageObject.assertionSubmitLoginButtonIsEnabled();
    FormPageObject.actionClickSubmitLoginButton();
    FormPageObject.actionFindModal();
    FormPageObject.actionFindModalTitle().should('be.visible').and('have.text', 'Error');
    FormPageObject.actionFindModalText().should('be.visible').and('have.text', 'No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.')
    FormPageObject.actionFindModalVolverButton().click();
    FormPageObject.actionFindFormContainer().should('be.visible');  
  })
})