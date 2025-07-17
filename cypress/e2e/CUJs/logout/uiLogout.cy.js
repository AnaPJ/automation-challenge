import { USER1 } from '../../../fixtures/users.js';
import { URLs } from '../../../pages/pageUrls.js';
import LogoutPageObject from '../../../pages/LogoutPageObject.js';
import LoginPageObject from '../../../pages/LoginPageObject.js';

describe('Logout functionality', () => {

  beforeEach(() => {
    LoginPageObject.actionPerfomLogin();
  })

  it('should verify that the user can logout from the page.', () => {
    LogoutPageObject.actionPerformLogout();
    LoginPageObject.assertionNavBarLoginLinksAreVisible();
    // LogoutPageObject.assertionNavBarLogoutLinksAreNotVisible();  
  });  
})  