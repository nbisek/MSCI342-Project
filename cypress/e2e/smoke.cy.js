describe("Smoke Test", () => {
  it("can view the login", () => {
    cy.visit("/");
    cy.contains("Connect with other UWaterloo students");
  });
  it("can log into an account", () => {
    cy.visit("/");
    cy.get("#loginButton").click();
    cy.get("#email").type("cypresstests@cypress.ca");
    cy.get("#password").type("cypress");
    cy.get("#submit-button").click();
    cy.contains("Find Groups");
  });
  it("can join a group", () => {
    cy.visit("/findgroups");
    cy.get("#joinGroup5").click();
    cy.contains("Success");
    cy.get("#close").click();
    cy.visit("/mygroups");
    cy.contains("Hip-Hop");
  });
  it("can visit a group page and like a post", () => {
    cy.get("#group5").click();
    cy.contains("Hip-Hop Dancers");
    cy.get("#likePost93").click();
    cy.get("#unlikePost93").click();
  });
  it("can leave a group", () => {
    cy.visit("/findgroups");
    cy.get("#leaveGroup5").click();
    cy.get("#leave-group").click();
  });
  it("can sign out", () => {
    cy.visit("/settings");
    cy.get("#sign-out").click();
    cy.contains("Connect with other UWaterloo students");
  });
  // it("can leave a group", () => {
  //   cy.visit("/");
  //   cy.get("#email").type("cypresstests@cypress.ca");
  //   cy.get("#password").type("cypress");
  //   cy.get("#submit-button").click();
  //   cy.visit("/mygroups");
  //   cy.contains("My Groups");
  // });
  // it("can view the settings page", () => {
  //   cy.visit("/settings");
  //   cy.contains("Settings");
  // });
  // it("can view the login page", () => {
  //   cy.visit("/login");
  //   cy.contains("WarriorsTogether");
  // });
  // it("can view the my groups page", () => {
  //   cy.visit("/mygroups");
  //   cy.contains("My Groups");
  // });
  // it("should sign up successfully", () => {
  //   cy.visit("/");
  //   cy.get("#email").type("nbisek@uwaterloo.ca");
  //   cy.get("#name").type("nadia");
  //   cy.get("#password").type("password");
  //   cy.get("#verifyPassword").type("password");
  //   cy.get("#signup-button").click();
  // });
  // it("should log in successfully", () => {
  //   cy.visit("/login");
  //   cy.get("#email").type("yaathavi@gmail.com");
  //   cy.get("#password").type("yaathavirocks");
  //   cy.get("#submit-button").click();
  //   cy.url().should("include", "/findgroups");
  // });
});
