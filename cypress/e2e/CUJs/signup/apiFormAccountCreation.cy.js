import { faker } from '@faker-js/faker';
import { API_ENDPOINTS } from '../../../fixtures/apiPaths';

describe('API Account creation', () => {
  it('should return 201 when API POST method is requested', () => {
    const validEmail = faker.internet.email()
    const validName = faker.person.fullName()
    const validPassword = faker.internet.password(8)
    cy.request({
      method: 'POST',
      url: API_ENDPOINTS.API_SIGNUP,
      body: {
        email: validEmail,
        name: validName,
        password: validPassword
      },
    }).then(response => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Usuario creado correctamente');
    });
  })
})