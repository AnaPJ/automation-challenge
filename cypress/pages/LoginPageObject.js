import { URLs } from './pageUrls';
import FormPageObject from './FormPageObject';
import { USER1 } from '../fixtures/users';
import { DATA } from '../fixtures/data';

class LoginPageObject {
    actionPerfomLogin() {
        cy.visit(URLs.LOGIN)
        FormPageObject.actionFillEmail(USER1.userEmail)
        FormPageObject.actionFillPassword(USER1.password)
        FormPageObject.actionClickSubmitLoginButton()
        cy.wait(1000)
        cy.url().should('eq', Cypress.config('baseUrl') + URLs.HOME);
        cy.getCookie(DATA.COOKIE_NAME).should('exist'); 
    }
    assertionNavBarLoginLinksAreVisible() {
        cy.get("a[href='" + URLs.HOME + "']").should('be.visible');
        cy.get("a[href='" + URLs.LOGIN + "']").should('be.visible');
        cy.get("a[href='" + URLs.SIGNUP + "']").should('be.visible');
    }
    assertionNavBarLoginLinksAreNotVisible() {
        cy.get("a[href='" + URLs.HOME + "']").should('not.be.visible');
        cy.get("a[href='" + URLs.LOGIN + "']").should('not.be.visible');
        cy.get("a[href='" + URLs.SIGNUP + "']").should('not.be.visible');
    }        
}

export default new LoginPageObject();
