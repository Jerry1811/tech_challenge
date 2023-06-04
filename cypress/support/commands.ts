export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Get a DOM element based on data-test-id value
       * @param value data-test-id text value
       * @example
       * cy.dataTestId('input-email')
       * // this will select this element
       * <input data-test-id="input-email" >
       */
      dataTestId(value: string): Chainable<any>;
    }
  }
}

Cypress.Commands.add("dataTestId", (value: string) => {
  return cy.get(`[data-test-id=${value}]`);
});
