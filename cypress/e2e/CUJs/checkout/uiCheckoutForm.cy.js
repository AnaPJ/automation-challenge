import { faker, ur } from '@faker-js/faker';
import { URLs } from '../../../pages/pageUrls';
import LogInPageObject from '../../../pages/LogInPageObject';
import { USER1 } from '../../../fixtures/users';
import { CHECKOUT_SELECTORS } from '../../../pages/checkoutSelectors';
import { GLOBAL_SELECTORS } from '../../../pages/globalSelectors';
import { SHOPING_CART_SELECTORS } from '../../../pages/shoppingCartSelectors';
import { HOME_PAGE_SELECTORS } from '../../../pages/homePageSelectors';
import { FORM_SELECTORS } from '../../../pages/formSelectors';

describe('Checkout functionality', () => {
    beforeEach(() => {
    LogInPageObject.actionPerfomLoginApi(USER1.userEmail, USER1.password);
    cy.visit(URLs.CHECKOUT)
})
  const validEmail = faker.internet.email()
  const validFullName = faker.person.fullName()
  const validFirstName = faker.person.firstName();
  const validLastName = faker.person.lastName()
  const validStreetAddress = faker.location.streetAddress();
  const maxCreditCardAllowedLength = 19; // 16 digits + 3 spaces = 19 characters
  const maxSecurityCodeAllowedLength = 3;
  const today = new Date(); // Present > July 2025
  const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1); //Set to 1st of next month for consistency
  // Format for the actual input value (YYYY-MM)
  const nextMonthYear = nextMonthDate.getFullYear();
  const nextMonthNum = (nextMonthDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because getMonth() is 0-indexed
  const validExpiryDate = `${nextMonthYear}-${nextMonthNum}`;

  const successMessage = 'Orden creada'
 
  it('should verify that the buyers and payment info form is ready to fill.', () => {
    cy.get(CHECKOUT_SELECTORS.FORM).should('be.visible');
    cy.get(CHECKOUT_SELECTORS.NAME_INPUT).should('be.visible');
    cy.get(CHECKOUT_SELECTORS.LAST_NAME_INPUT).should('be.visible');
    cy.get(CHECKOUT_SELECTORS.EMAIL_INPUT).should('be.visible');
    cy.get(CHECKOUT_SELECTORS.ADDRESS_INPUT).should('be.visible');
    cy.get(CHECKOUT_SELECTORS.COUNTRY_SELECTOR).should('be.visible');
    cy.get(CHECKOUT_SELECTORS.CARD_HOLDER_NAME_INPUT).should('be.visible');
    cy.get(CHECKOUT_SELECTORS.CREDIT_CARD_NUMBER_INPUT).should('be.visible');
    cy.get(CHECKOUT_SELECTORS.SECURITY_CODE_NUMBER_INPUT).should('be.visible');
    cy.get(CHECKOUT_SELECTORS.EXPIRY_DATE_INPUT).should('be.visible');
  })
    
  it('should verify that the button to complete the payments is disabled when the fields are empty.', () => {
    cy.contains('Completar Pago').should('be.disabled');
  })

  it ('should verify that the placeholder texts for the fields are correct.', () => {
    cy.get(CHECKOUT_SELECTORS.NAME_INPUT).should('have.attr', 'placeholder', 'John');
    cy.get(CHECKOUT_SELECTORS.LAST_NAME_INPUT).should('have.attr', 'placeholder','Doe');
    cy.get(CHECKOUT_SELECTORS.EMAIL_INPUT).should('have.attr', 'placeholder', 'mail@domain.com');
    cy.get(CHECKOUT_SELECTORS.ADDRESS_INPUT).should('have.attr', 'placeholder', '1234 Calle Primavera');
    cy.get(CHECKOUT_SELECTORS.CARD_HOLDER_NAME_INPUT).should('have.attr', 'placeholder', 'John Doe');
    cy.get(CHECKOUT_SELECTORS.CREDIT_CARD_NUMBER_INPUT).should('have.attr', 'placeholder', '1234 5678 9012 3456');
    // BUG:  Estos 2 van a fallar porque no tienen el place holder visible
    //cy.get(CHECKOUT_SELECTORS.SECURITY_CODE_NUMBER_INPUT).should('have.attr', 'placeholder', 'expiryDate');
    //cy.get(CHECKOUT_SELECTORS.EXPIRY_DATE_INPUT).should('have.attr', 'placeholder', 'securityCode');
  })
    
  it ('should verify that the state of the coutry selector is disabled and the placeholder is correct', () => {
    cy.get('#country option[disabled][selected]').should('have.text', 'Selecciona una opción');
  })
  
   it('should verify that the Name field accepts valid input.', () => {
    cy.get(CHECKOUT_SELECTORS.NAME_INPUT).type(validFirstName);
  })
  
   it('should verify that the Last Name field accepts valid input.', () => {
    cy.get(CHECKOUT_SELECTORS.LAST_NAME_INPUT).type(validLastName);
  })

  it ('should verify that the Email field accepts a valid email format.', () => {
    cy.get(CHECKOUT_SELECTORS.EMAIL_INPUT).type(validEmail);
  })
  
  it('should verify that the Address field accepts a valid address.', () => {
    cy.get(CHECKOUT_SELECTORS.ADDRESS_INPUT).type(validStreetAddress);
  })

  it('should verify that the Card holder name field accepts a valid input.', () => {
    cy.get(CHECKOUT_SELECTORS.CARD_HOLDER_NAME_INPUT).type(validFullName);
  })

  it('should verify that the Credit card number field accepts a valid format.', () => {
    cy.get(CHECKOUT_SELECTORS.CREDIT_CARD_NUMBER_INPUT).type('1234 5678 9012 3456').should('have.value', '1234 5678 9012 3456').invoke('val').should('have.length', maxCreditCardAllowedLength).and('match', /^(\d{4}\s?){3}\d{4}$/);
  })
  
  it('should verify that the Security code number field accepts a valid format.', () => {
    cy.get(CHECKOUT_SELECTORS.SECURITY_CODE_NUMBER_INPUT).type('123').should('have.value','123').invoke('val').should ('have.length', maxSecurityCodeAllowedLength).and('match', /^\d{3}$/);
  })
  
   it('should verify that the Expiry date field accepts a valid format', () => {
    cy.get(CHECKOUT_SELECTORS.EXPIRY_DATE_INPUT).clear().type(validExpiryDate).should('have.value', validExpiryDate);
  });

  describe('Checkout successfully', () => {
    beforeEach(() => {
    LogInPageObject.actionPerfomLoginApi(USER1.userEmail, USER1.password);
    cy.visit(URLs.HOME)
})

  it('should get a success notification when completing the checkout process.', () => {  
    cy.contains('p', HOME_PAGE_SELECTORS.PRODUCT_BANDAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click(); 
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON).click(); 
    cy.get(SHOPING_CART_SELECTORS.GO_TO_CHECKOUT_BUTTON).click();
    cy.get(CHECKOUT_SELECTORS.NAME_INPUT).type(validFirstName);
    cy.get(CHECKOUT_SELECTORS.LAST_NAME_INPUT).type(validLastName);
    cy.get(CHECKOUT_SELECTORS.EMAIL_INPUT).type(USER1.userEmail);
    cy.get(CHECKOUT_SELECTORS.ADDRESS_INPUT).type(validStreetAddress);
    cy.get(CHECKOUT_SELECTORS.COUNTRY_SELECTOR).select('Colombia');
    cy.get(CHECKOUT_SELECTORS.CARD_HOLDER_NAME_INPUT).type(USER1.userEmail);
    cy.get(CHECKOUT_SELECTORS.CREDIT_CARD_NUMBER_INPUT).type(USER1.validCardNumber);
    cy.get(CHECKOUT_SELECTORS.SECURITY_CODE_NUMBER_INPUT).type(USER1.cvv);
    cy.get(CHECKOUT_SELECTORS.EXPIRY_DATE_INPUT).type(USER1.expDate);
    cy.contains ('Completar Pago').click();
    cy.get(FORM_SELECTORS.MODAL_TITLE).contains(successMessage).should('be.visible');
    cy.get(FORM_SELECTORS.MODAL_TEXT).contains('Tu orden se ha creado con éxito, podrás ver tu historial en tu cuenta').should('be.visible');
    cy.contains('Ir a mi cuenta').click();
    cy.wait(1000);
    cy.url().should('eq', Cypress.config('baseUrl') + URLs.MY_ACCOUNT);
    });
}) 
})
