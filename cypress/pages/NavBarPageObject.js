import { GLOBAL_SELECTORS} from './globalSelectors';

class NavBarPageObject {
    assertionNavBarLinksAreVisible() {
        cy.get(GLOBAL_SELECTORS.INICIO).should('be.visible');
        cy.get(GLOBAL_SELECTORS.FAVORITOS).should('be.visible');
        cy.get(GLOBAL_SELECTORS.MI_CUENTA).should('be.visible');
        cy.get(GLOBAL_SELECTORS.CERRAR_SESION).should('be.visible');
     }
}

export default new NavBarPageObject();