function checkPopover(position) {
  //get left button and verify popover
  cy.get('[nbpopoverplacement="' + position + '"]').click();
  cy.get("nb-popover")
    .should("have.class", "nb-overlay-" + position)
    .and("contain", "Hello, how are you today?");
}

export class PopoverPage {
  checkPopoverPositionOnPage(positionPop) {
    // checkPopover('top')
    cy.contains("nb-card", "Popover Position").then((card) => {
      //check title
      cy.wrap(card)
        .find("nb-card-header")
        .should("contain", "Popover Position");
      //check body text
      cy.wrap(card)
        .find("nb-card-body")
        .find("p")
        .should("contain", "When popover has");
      //get left button and verify popover
      // cy.wrap(card).find('[nbpopoverplacement="'+position+'"]').click()
      // cy.get('nb-popover').should('have.class', 'nb-overlay-'+position).and('contain','Hello, how are you today?')
      positionPop.forEach((item) => {
        checkPopover(item);
      });
    });
  }

  checkSimplePopovers() {
    cy.contains("nb-card", "Simple Popovers").then((card) => {
      //check title
      cy.wrap(card).find("nb-card-header").should("contain", "Simple Popovers");
      //check body text
      cy.wrap(card)
        .find("nb-card-body")
        .find("p")
        .should("contain", "In a simples form popover");
      //buttons
      cy.wrap(card)
        .find("button")
        .each((item, index) => {
          cy.wrap(item).click();
          cy.get("nb-popover")
            .should("have.class", "nb-overlay-top")
            .and("contain", "Hello, how are you today?");
        });
      // cy.wrap(card).contains('on click').click()
      // cy.get('nb-popover').should('have.class', 'nb-overlay-top').and('contain','Hello, how are you today?')
      // cy.wrap(card).find('[nbpopovertrigger="hover"]').click()
      // cy.get('nb-popover').should('have.class', 'nb-overlay-top').and('contain','Hello, how are you today?')
      // cy.wrap(card).find('[nbpopovertrigger="hint"]').click()
      // cy.get('nb-popover').should('have.class', 'nb-overlay-top').and('contain','Hello, how are you today?')
    });
  }

  checkTemplateWithItem() {
    cy.contains("nb-card", "Template Popovers").then((card) => {
      //check title
      cy.wrap(card)
        .find("nb-card-header")
        .should("contain", "Template Popovers");
      //check body text
      cy.wrap(card)
        .find("nb-card-body")
        .find("p")
        .should("contain", "You can pass a refference");
      //find button with tabs
      cy.wrap(card).contains("With tabs").click();
      //form popover
      cy.get("nb-popover").then((popoverForm) => {
        //whatsup tab
        cy.wrap(popoverForm)
          .find("nb-tabset")
          .find("li.active")
          .should("contain", "What's up")
          .parents("nb-tabset")
          .find("nb-tab.content-active")
          .should("contain", "Such a wonderful day");

        //second tab
        cy.wrap(popoverForm)
          .find("nb-tabset")
          .find("li")
          .contains("Second Tab")
          .click()
          .parents("nb-tabset")
          .contains("li", "Second Tab")
          .should("have.class", "active")
          .parents("nb-tabset")
          .find("nb-tab.content-active")
          .should("contain", "Indeed!");
      });
    });
  }

  checkTemplateWithForm() {
    cy.contains("nb-card", "Template Popovers").then((card) => {
      //check title
      cy.wrap(card)
        .find("nb-card-header")
        .should("contain", "Template Popovers");
      //check body text
      cy.wrap(card)
        .find("nb-card-body")
        .find("p")
        .should("contain", "You can pass a refference");
      //find button with tabs
      cy.wrap(card).contains("With form").click();
      //form popover verifyu content
      cy.get("nb-popover").then((popoverForm) => {
        //placeholders input
        cy.wrap(popoverForm)
          .find('[placeholder="Recipients"]')
          .type("test@test.com");
        //subject input
        cy.wrap(popoverForm)
          .find('[placeholder="Subject"]')
          .type("Test popover");
        //message input
        cy.wrap(popoverForm)
          .find('[placeholder="Message"]')
          .type("This is my test popover tab");
        //button send message
        cy.wrap(popoverForm).find("button").click();
      });
    });
  }

  checkTemplateWithCard() {
    cy.contains("nb-card", "Template Popovers").then((card) => {
      //check title
      cy.wrap(card)
        .find("nb-card-header")
        .should("contain", "Template Popovers");
      //check body text
      cy.wrap(card)
        .find("nb-card-body")
        .find("p")
        .should("contain", "You can pass a refference");
      //find button with tabs
      cy.wrap(card).contains("With card").click();
      //form popover verify content
      cy.get("nb-popover")
        .find("nb-card")
        .then((popoverForm) => {
          cy.wrap(popoverForm)
            .find("nb-card-header")
            .should("contain", "Hello!");
          cy.wrap(popoverForm)
            .find("nb-card-body")
            .should(
              "contain",
              "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean"
            );
        });
    });
  }

  checkAllComponentPopovers() {
    cy.contains("nb-card", "Component Popovers").then((card) => {
      //check title
      cy.wrap(card)
        .find("nb-card-header")
        .should("contain", "Component Popovers");
      //check body text
      cy.wrap(card)
        .find("nb-card-body")
        .find("p")
        .should(
          "contain",
          "Same way popover can render any angular compnoent."
        );
      //find button with tabs
      cy.wrap(card).contains("With tabs").click();
      //form popover verify content
      cy.get("nb-popover").then((popoverForm) => {
        //whatsup tab
        cy.wrap(popoverForm)
          .find("nb-tabset")
          .find("li.active")
          .should("contain", "What's up")
          .parents("nb-tabset")
          .find("nb-tab.content-active")
          .should("contain", "Such a wonderful day");

        //second tab
        cy.wrap(popoverForm)
          .find("nb-tabset")
          .find("li")
          .contains("Second Tab")
          .click()
          .parents("nb-tabset")
          .contains("li", "Second Tab")
          .should("have.class", "active")
          .parents("nb-tabset")
          .find("nb-tab.content-active")
          .should("contain", "Indeed!");
      });

      //find button with tabs
      cy.wrap(card).contains("With form").click();
      //form popover verifyu content
      cy.get("nb-popover").then((popoverForm) => {
        //placeholders input
        cy.wrap(popoverForm)
          .find('[placeholder="Recipients"]')
          .type("test@test.com");
        //subject input
        cy.wrap(popoverForm)
          .find('[placeholder="Subject"]')
          .type("Test popover");
        //message input
        cy.wrap(popoverForm)
          .find('[placeholder="Message"]')
          .type("This is my test popover tab");
        //button send message
        cy.wrap(popoverForm).find("button").click();
      });

      //find button with tabs
      cy.wrap(card).contains("With card").click();
      //form popover verify content
      cy.get("nb-popover")
        .find("nb-card")
        .then((popoverForm) => {
          cy.wrap(popoverForm)
            .find("nb-card-header")
            .should("contain", "Hello!");
          cy.wrap(popoverForm)
            .find("nb-card-body")
            .should(
              "contain",
              "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean"
            );
        });
    });
  }
}

export const onPopoverPage = new PopoverPage();
