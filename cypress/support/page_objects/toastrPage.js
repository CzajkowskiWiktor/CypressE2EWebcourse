function fillTheToastMsg(position, title, content, timeout, type) {
  //click  dropdown list
  cy.get("nb-card")
    .find(".form-group")
    .contains("Position")
    .parents(".form-group")
    .find("nb-select")
    .click();
  //select from dropdown
  cy.get(".options-list").contains(position).click();
  //check the value
  cy.get("nb-card")
    .find(".form-group")
    .contains("Position")
    .parents(".form-group")
    .find(".select-button")
    .should("contain", position);
  //change title
  cy.get('[name="title"]').clear().type(title);
  //change content
  cy.get('[name="content"]').clear().type(content);
  //change timeout
  cy.get('[name="timeout"]').clear().type(timeout);
  //change type
  cy.get("nb-card")
    .find(".form-group")
    .contains("Toast type")
    .parents(".form-group")
    .find("nb-select")
    .click();
  cy.get(".options-list").contains(type).click();
}

export class ToastrPage {
  showToastMessage(position, title, content, timeout, type) {
    fillTheToastMsg(position, title, content, timeout, type);
    //checkboxes
    cy.get('[type="checkbox"]').check({ force: true });
    //show toast
    cy.get("nb-card").find("button").contains("Show toast").click();

    //get toast msg and verify content
    cy.get("nb-toast").then((form) => {
      cy.wrap(form).should("have.class", "has-icon");
      cy.wrap(form).should("have.class", "status-" + type);
      cy.wrap(form)
        .find(".content-container")
        .then((formContent) => {
          cy.wrap(formContent).find(".title").should("contain", title);
          cy.wrap(formContent).find(".message").should("contain", content);
        });
      cy.wrap(form).find(".icon-container").should("be.visible");
    });
  }

  showToastAndDeleteItByClicking(position, title, content, timeout, type) {
    fillTheToastMsg(position, title, content, timeout, type);
    //check if the checkbox of hiding by clicking is checked
    cy.get('[type="checkbox"]').eq(0).should("be.checked");
    //show toast
    cy.get("nb-card").find("button").contains("Show toast").click();

    //get toast msg and verify content
    cy.get("nb-toast")
      .then((form) => {
        cy.wrap(form).should("have.class", "has-icon");
        cy.wrap(form).should("have.class", "status-" + type);
        cy.wrap(form)
          .find(".content-container")
          .then((formContent) => {
            cy.wrap(formContent).find(".title").should("contain", title);
            cy.wrap(formContent).find(".message").should("contain", content);
          });
        cy.wrap(form).find(".icon-container").should("be.visible");
      })
      .click()
      .then((form) => {
        cy.wait(1000);
        //should not exists element after clicking it
        cy.wrap(form).should("not.exist");
      });
  }

  showToastAndClickButDoNotDisappear(position, title, content, timeout, type) {
    //uncheck the hide
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    fillTheToastMsg(position, title, content, timeout, type);
    //check if the checkbox of hiding by clicking is checked
    cy.get('[type="checkbox"]').eq(0).should("not.be.checked");
    //show toast
    cy.get("nb-card").find("button").contains("Show toast").click();

    //get toast msg and verify content
    cy.get("nb-toast")
      .then((form) => {
        cy.wrap(form).should("have.class", "has-icon");
        cy.wrap(form).should("have.class", "status-" + type);
        cy.wrap(form)
          .find(".content-container")
          .then((formContent) => {
            cy.wrap(formContent).find(".title").should("contain", title);
            cy.wrap(formContent).find(".message").should("contain", content);
          });
        cy.wrap(form).find(".icon-container").should("be.visible");
      })
      .click();
    cy.wait(1000);
    //toast message still visible
    cy.get("nb-toast").should("be.visible").and("exist");
  }

  showToastMessageWihtoutIcon(position, title, content, timeout, type) {
    fillTheToastMsg(position, title, content, timeout, type);
    cy.get('[type="checkbox"]')
      .eq(2)
      .should("be.checked")
      .click({ force: true });
    //show toast
    cy.get("nb-card").find("button").contains("Show toast").click();

    //get toast msg and verify content
    cy.get("nb-toast")
      .then((form) => {
        //icon not visible
        cy.wrap(form).should("not.have.class", "has-icon");
        cy.wrap(form).find(".icon-container").should("not.exist");
        cy.wrap(form).should("have.class", "status-" + type);

        cy.wrap(form)
          .find(".content-container")
          .then((formContent) => {
            cy.wrap(formContent).find(".title").should("contain", title);
            cy.wrap(formContent).find(".message").should("contain", content);
          });
      })
      .click();
  }

  showRandomToastMessage() {
    //show random toast
    cy.get("nb-card").find("button").contains("Random toast").click();
    //get toast msg and
    cy.get("nb-toast").should("be.visible").and("exist");
  }
}

export const onToastrPage = new ToastrPage();
