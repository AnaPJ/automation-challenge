import { DATA } from '../fixtures/data';
import { URLs } from './pageUrls';
import { GLOBAL_SELECTORS } from '../pages/globalSelectors';

class LogoutPageObject {
   actionPerformLogout() {
      cy.get(GLOBAL_SELECTORS.LOGOUT).click();
      cy.wait(1000)
      cy.getCookie(DATA.COOKIE_NAME).should('not.exist'); 
   }
   assertionNavBarLogedinLinksAreVisible() {
      cy.get(URLs.HOME).should('be.visible');
      cy.get(GLOBAL_SELECTORS.FAVORITE).should('be.visible');
      cy.get(GLOBAL_SELECTORS.MY_ACCOUNT).should('be.visible');
      cy.get(GLOBAL_SELECTORS.LOGOUT).should('be.visible');
   }    

   assertionNavBarLogoutLinksAreNotVisible() {
      cy.get(URLs.HOME).should('not.be.visible');
      cy.get(GLOBAL_SELECTORS.FAVORITE).should('not.be.visible');
      cy.get(GLOBAL_SELECTORS.MY_ACCOUNT).should('not.be.visible');
      cy.get(GLOBAL_SELECTORS.LOGOUT).should('not.be.visible');
   }
}
export default new LogoutPageObject();
