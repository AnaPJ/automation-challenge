import { USER1 } from '../../../fixtures/users';
import { API_ENDPOINTS } from '../../../fixtures/apiPaths';

describe('API Account login', () => {
  it('should return 201 when API POST method is requested', () => {
    cy.request({
      method: 'POST',
      url: API_ENDPOINTS.API_LOGIN,
      body: {
        email: USER1.userEmail,
        password: USER1.password
      },
    }).then(response => {
      expect(response.status).to.equal(201);
    });
  })
})