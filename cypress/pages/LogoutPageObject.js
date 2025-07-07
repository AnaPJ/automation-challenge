import { DATA } from '../fixtures/data';
import { URLs } from './pageUrls';

class LogoutPageObject {
   actionPerformLogout() {
      cy.get(URLs.LOGOUT).click();
      cy.wait(1000)
      cy.getCookie(DATA.COOKIE_NAME).should('not.exist'); 
   }
   assertionNavBarLogedinLinksAreVisible() {
      cy.get(URLs.HOME).should('be.visible');
      cy.get(URLs.FAVORITE).should('be.visible');
      cy.get(URLs.MY_ACCOUNT).should('be.visible');
      cy.get(URLs.LOGOUT).should('be.visible');
   }    

   assertionNavBarLogoutLinksAreNotVisible() {
      cy.get(URLs.HOME).should('not.be.visible');
      cy.get(URLs.FAVORITE).should('not.be.visible');
      cy.get(URLs.MY_ACCOUNT).should('not.be.visible');
      cy.get(URLs.LOGOUT).should('not.be.visible');
   }
}
export default new LogoutPageObject();
