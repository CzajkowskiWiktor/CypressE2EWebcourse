/// <reference types="cypress" />

describe("First suite", () =>
{
    it("first test", () => 
    {
        cy.visit('/')
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        //creating own locators in html
        cy.get('[data-cy="signInButton"')

        cy.contains("Sign in")
        //another way to find element - with contains and atrribute
        cy.contains("[status='warning']", "Sign in")

        //another way to find element - with parent way - chaining the events
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card' ,'Horizontal form').find('[type="email"]')

    })
})