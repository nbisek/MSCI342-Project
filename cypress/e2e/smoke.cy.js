describe("Smoke Test", () => {
  it("can view the settings page", () => {
    cy.visit("/settings");
    cy.contains("Settings");
  });
  it("can view the login page", () => {
    cy.visit("/login");
    cy.contains("WarriorsTogether");
  });
  it("can view the my groups page", () => {
    cy.visit("/mygroups");
    cy.contains("My Groups");
  });
  it("should sign up successfully", () => {
    cy.visit("/");
    cy.get("#email").type("nbisek@uwaterloo.ca");
    cy.get("#name").type("nadia");
    cy.get("#password").type("password");
    cy.get("#verifyPassword").type("password");
    cy.get("#signup-button").click();
  });
  it("should log in successfully", () => {
    cy.visit("/login");
    cy.get("#email").type("yaathavi@gmail.com");
    cy.get("#password").type("yaathavirocks");
    cy.get("#submit-button").click();
    cy.url().should("include", "/findgroups");
  });
});