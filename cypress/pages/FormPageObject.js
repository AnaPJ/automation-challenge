import { FORM_SELECTORS } from './formSelectors'

class FormPageObject {
    actionFindFormContainer() {
        return cy.get(FORM_SELECTORS.FORM);
    }
    
    actionFillName(name) {
        cy.get(FORM_SELECTORS.FULL_NAME_INPUT).type(name);
    }

    actionFillEmail(email) {
        cy.get(FORM_SELECTORS.EMAIL_INPUT).type(email);
    }

    actionFillPassword(password) {
        cy.get(FORM_SELECTORS.PASSWORD_INPUT).type(password);
    }

    actionFillConfirmPassword(password) {
        cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).type(password);
    }

    actionClickSubmitSignUpButton() {
        cy.get(FORM_SELECTORS.SUBMIT_SIGNUP_BUTTON).click();
    }

    actionClickSubmitLoginButton() {
        cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).click();
    }

    actionFindModal(){
        cy.get(FORM_SELECTORS.MODAL);
    }

    actionFindModalTitle() {
        return cy.get(FORM_SELECTORS.MODAL_TITLE);
    }

    actionFindModalText() {
        return cy.get(FORM_SELECTORS.MODAL_TEXT);
    } 

    actionClickGoToLoginButton(){
        cy.contains('button', 'Ir al login').click();
    }
    
    actionFindModalVolverButton(){
        return cy.get(FORM_SELECTORS.MODAL_VOLVER_BUTTON);
    }

    actionClearEmail() {
      cy.get(FORM_SELECTORS.EMAIL_INPUT).clear();
    }

    actionClearName() {
      cy.get(FORM_SELECTORS.FULL_NAME_INPUT).clear();
    }    
    
    actionClearPassword() {
      cy.get(FORM_SELECTORS.PASSWORD_INPUT).clear();
    }

    actionFindErrorMessageForField(fieldSelector, errorMessageSelector,errorMessage) {
      cy.get(fieldSelector).next(errorMessageSelector).should('be.visible').and('have.text',errorMessage);
    }

    assertionSignupFormPlaceHolders() {
        cy.get(FORM_SELECTORS.EMAIL_INPUT).should('have.attr', 'placeholder', 'Ingresa tu email');
        cy.get(FORM_SELECTORS.FULL_NAME_INPUT).should('have.attr', 'placeholder', 'Ingresa tu nombre completo');
        cy.get(FORM_SELECTORS.PASSWORD_INPUT).should('have.attr', 'placeholder', 'Ingresa tu contraseña');
        cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).should('have.attr', 'placeholder', 'Repite tu contraseña');
    }
    assertionLoginFormPlaceHolders() {
        cy.get(FORM_SELECTORS.EMAIL_INPUT).should('have.attr', 'placeholder', 'Ingresa tu email');
        cy.get(FORM_SELECTORS.PASSWORD_INPUT).should('have.attr', 'placeholder', 'Ingresa tu contraseña');
    }    

    assertionSubmitSignupButtonIsDisabled() {
        cy.get(FORM_SELECTORS.SUBMIT_SIGNUP_BUTTON).should('be.disabled');
    }

    assertionSubmitLoginButtonIsDisabled() {
        cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.disabled');
    }

     assertionSubmitLoginButtonIsEnabled() {
        cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('not.be.disabled');
    }

     assertionSubmitSignupButtonIsEnabled() {
        cy.get(FORM_SELECTORS.SUBMIT_SIGNUP_BUTTON).should('not.be.disabled');
    }
    
     assertionSignupFormFieldsAreReadyToFill() {
      cy.get(FORM_SELECTORS.EMAIL_INPUT).should('be.visible');
      cy.get(FORM_SELECTORS.FULL_NAME_INPUT).should('be.visible');
      cy.get(FORM_SELECTORS.PASSWORD_INPUT).should('be.visible');
      cy.get(FORM_SELECTORS.CONFIRM_PASSWORD_INPUT).should('be.visible');
      cy.get(FORM_SELECTORS.SUBMIT_SIGNUP_BUTTON).should('be.visible');
    }

    assertionLoginFormFieldsAreReadyToFill() {
      cy.get(FORM_SELECTORS.EMAIL_INPUT).should('be.visible');
      cy.get(FORM_SELECTORS.PASSWORD_INPUT).should('be.visible');
      cy.get(FORM_SELECTORS.SUBMIT_LOGIN_BUTTON).should('be.visible');
    }
}
export default new FormPageObject();
