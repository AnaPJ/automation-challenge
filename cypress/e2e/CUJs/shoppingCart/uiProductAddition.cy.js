import { URLs } from '../../../pages/pageUrls';
import { GLOBAL_SELECTORS } from '../../../pages/globalSelectors';
import { SHOPING_CART_SELECTORS } from '../../../pages/shoppingCartSelectors';
import { HOME_PAGE_SELECTORS } from '../../../pages/homePageSelectors';

describe ('Product addition and cleaning up functionality', () => {
  beforeEach(() => {
    cy.visit(URLs.HOME)
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON).click(); 
    cy.get(SHOPING_CART_SELECTORS.NO_ELEMENTS_MESSAGE).should('be.visible').and('contain', 'No tienes elementos en el carrito'); 
    cy.get(SHOPING_CART_SELECTORS.TOTAL).should('be.visible').and('contain', 'Total: $0.00');
    cy.get(SHOPING_CART_SELECTORS.CLOSE_BUTTON).click(); 
  })
    
  it ('should verify that the cart column headings exist', () => {
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON).click(); 
    cy.get(SHOPING_CART_SELECTORS.HEADER_IMAGE).should('be.visible').and('have.text', 'Imagen');
    cy.get(SHOPING_CART_SELECTORS.HEADER_NAME).should('be.visible').and('have.text','Nombre');
    cy.get(SHOPING_CART_SELECTORS.HEADER_QUANTITY).should('be.visible').and('have.text','Cantidad');
    cy.get(SHOPING_CART_SELECTORS.HEADER_PRICE).should('be.visible').and('have.text','Precio');
    cy.get(SHOPING_CART_SELECTORS.HEADER_DELETE).should('be.visible').and('have.text','Eliminar');
  });
  
  it ('should verify that an added item is reflected in the shopping cart item count', () => {
    cy.contains('p', HOME_PAGE_SELECTORS.PRODUCT_BANDAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click(); 
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON_COUNT).first().should('be.visible').and('have.text', '1'); 
    cy.contains ('p',HOME_PAGE_SELECTORS.PRODUCT_SET_PESAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click();
  });

  // BUG: Este escenario va a a fallar porque el carrito no refleja la suma de items cuando pertenecen a una misma clase. 
  // it ('should verify that 1+ added items of the same kind are reflected in the shopping cart item count', () => {
  //   const numberOfClicks = 3;
  //   cy.contains('p', HOME_PAGE_SELECTORS.PRODUCT_BANDAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click().as('productItemToClick');

  //   for (let i = 0; i < numberOfClicks; i++) {
  //   cy.get('@productItemToClick').click();
  //   }

  //   cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON_COUNT).first().should('be.visible').and('have.text', numberOfClicks.toString());
  // });

  it ('should verify that 1+ added items of different kind are reflected in the shopping cart item count', () => {;
    cy.contains('p', HOME_PAGE_SELECTORS.PRODUCT_SET_PESAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click();
    cy.contains('p', HOME_PAGE_SELECTORS.PRODUCT_BANDAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click();
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON_COUNT).first().should('be.visible').and('have.text', 2);
  });

  it ('should verify that an added item is reflected in the shopping cart modal', () => {
    cy.contains('p', HOME_PAGE_SELECTORS.PRODUCT_BANDAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click(); 
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON_COUNT).first().should('be.visible').and('have.text', '1'); 
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON).click(); 
    cy.get(SHOPING_CART_SELECTORS.SHOPPING_CART_MODAL).should('be.visible');
    cy.get(SHOPING_CART_SELECTORS.FIRST_PRODUCT_IMAGE).should('be.visible').and('have.attr','alt','Bandas Elásticas de Resistencia');
    cy.get(SHOPING_CART_SELECTORS.FIRST_PRODUCT_NAME).should('be.visible').and('have.text','Bandas Elásticas de Resistencia');
    cy.get(SHOPING_CART_SELECTORS.FIRST_PRODUCT_QUANTITY).should('be.visible').and('have.text','1');
    cy.get(SHOPING_CART_SELECTORS.FIRST_PRODUCT_PRICE).should('be.visible').and('have.text','$350.00');
  });

  it ('should verify that 1+ added items are reflected in the shopping cart modal', () => {
    cy.contains('p', HOME_PAGE_SELECTORS.PRODUCT_BANDAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click(); 
    cy.contains('p', HOME_PAGE_SELECTORS.PRODUCT_SET_PESAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click();
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON_COUNT).first().should('be.visible').and('have.text', '2'); 
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON).click(); 
    cy.get(SHOPING_CART_SELECTORS.SHOPPING_CART_MODAL).should('be.visible');
    cy.get(SHOPING_CART_SELECTORS.FIRST_PRODUCT_IMAGE).should('be.visible').and('have.attr','alt','Bandas Elásticas de Resistencia');
    cy.get(SHOPING_CART_SELECTORS.FIRST_PRODUCT_NAME).should('be.visible').and('have.text','Bandas Elásticas de Resistencia');
    cy.get(SHOPING_CART_SELECTORS.FIRST_PRODUCT_QUANTITY).should('be.visible').and('have.text','1');
    cy.get(SHOPING_CART_SELECTORS.FIRST_PRODUCT_PRICE).should('be.visible').and('have.text','$350.00');
    cy.get(SHOPING_CART_SELECTORS.SECOND_PRODUCT_IMAGE).should('be.visible').and('have.attr','alt','Set de Pesas Ajustables');
    cy.get(SHOPING_CART_SELECTORS.SECOND_PRODUCT_NAME).should('be.visible').and('have.text','Set de Pesas Ajustables');
    cy.get(SHOPING_CART_SELECTORS.SECOND_PRODUCT_QUANTITY).should('be.visible').and('have.text','1');
    cy.get(SHOPING_CART_SELECTORS.SECOND_PRODUCT_PRICE).should('be.visible').and('have.text','$2,500.00');
  });

  it ('should verify that an added item can be deleted from the shopping cart', () => {
    cy.contains('p', HOME_PAGE_SELECTORS.PRODUCT_BANDAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click(); 
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON_COUNT).first().should('be.visible').and('have.text', '1'); 
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON).click(); 
    cy.get(SHOPING_CART_SELECTORS.SHOPPING_CART_MODAL).should('be.visible');
    cy.get(SHOPING_CART_SELECTORS.FIRST_PRODUCT_DELETE).click();
    cy.get(SHOPING_CART_SELECTORS.NO_ELEMENTS_MESSAGE).should('be.visible').and('contain', 'No tienes elementos en el carrito'); 
    cy.get(SHOPING_CART_SELECTORS.TOTAL).should('be.visible').and('contain', 'Total: $0.00');
    cy.get(SHOPING_CART_SELECTORS.CLOSE_BUTTON).click(); 
  });

   it ('should verify that the shopping cart can be cleaned up', () => {
    cy.contains('p', HOME_PAGE_SELECTORS.PRODUCT_BANDAS).parents(HOME_PAGE_SELECTORS.PRODUCT_CARD).next().click(); 
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON_COUNT).first().should('be.visible').and('have.text', '1'); 
    cy.get(GLOBAL_SELECTORS.SHOPPING_CART_ICON).click(); 
    cy.get(SHOPING_CART_SELECTORS.SHOPPING_CART_MODAL).should('be.visible');
    cy.get(SHOPING_CART_SELECTORS.EMPTY_CART_BUTTON).click();
    cy.get(SHOPING_CART_SELECTORS.NO_ELEMENTS_MESSAGE).should('be.visible').and('contain', 'No tienes elementos en el carrito'); 
    cy.get(SHOPING_CART_SELECTORS.TOTAL).should('be.visible').and('contain', 'Total: $0.00');
    cy.get(SHOPING_CART_SELECTORS.CLOSE_BUTTON).click(); 
  });  
});


