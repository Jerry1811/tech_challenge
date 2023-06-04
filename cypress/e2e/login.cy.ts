import { displayName } from "fixtures/login.data";

const username = displayName();

describe("Login and verify display name can be updated", () => {
  it("Login and verify display name can be updated", () => {
    cy.intercept("POST", "/frontegg/identity/resources/auth/v1/user").as(
      "login"
    );
    cy.intercept("GET", "/api/v1/nylas/active").as("activeUser");

    cy.visit("/");
    cy.dataTestId("input-email").type(`${Cypress.env("username")}{enter}`);
    cy.dataTestId("input-password").type(`${Cypress.env("password")}{enter}`);
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.location("pathname").should("eq", "/dashboard/operational");
    cy.get(".fill-current").should("not.be.visible");

    // navigate to profile personal settings page
    cy.get('a[href="/settings/personal"]').click();
    cy.wait("@activeUser");
    cy.location("pathname").should("eq", "/settings/personal");

    // verify display name update is working correctly
    cy.intercept("POST", "/api/v1/user/me").as("user");
    cy.get("input[placeholder='Enter display name']").as("displayName");
    cy.get("@displayName").clear().type(username);
    cy.get("@displayName").siblings().contains("Save").click();
    cy.wait("@user")
      .its("response.body.detailInfo.name")
      .should("eq", username);
    cy.get("@displayName").should("have.value", username);
  });
});
