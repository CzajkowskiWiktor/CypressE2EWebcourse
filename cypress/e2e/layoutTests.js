/// <reference types="cypress" />
import { navigateTo } from "../support/page_objects/navigationPage"
import { onStepperPage } from "../support/page_objects/stepperPage"
import { onAccordionPage } from "../support/page_objects/accordionPage"

describe("Layout tab testing", () =>
{
    beforeEach('open application', () =>
    {
        cy.openHomePage()
    })

    it("stepper horizontal test", () =>
    {
        navigateTo.stepperPage()
        onStepperPage.goThroughStepContentHorizontal()
    })

    it('Wizard completed', () => 
    {
        navigateTo.stepperPage()
        onStepperPage.completeWizard()
    })

    it("stepper vertical test", () =>
    {
        navigateTo.stepperPage()
        onStepperPage.goThroughStepContentVertical()
    })

    it("toggle first item tests", () =>
    {
        const textExpanded = "A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases. Originally, nebula was a name for any diffuse astronomical object, including galaxies beyond the Milky Way."
        navigateTo.accordionPage()
        onAccordionPage.clickFirstAccordion(textExpanded)
    })

    it('toggle three accordion items', () =>
    {
        const textsExpanded = ["A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.",
            "Originally, nebula was a name for any diffuse astronomical object,",
            "including galaxies beyond the Milky Way"]
        navigateTo.accordionPage()
        onAccordionPage.checkAndToggleThreeAccordionItem(textsExpanded)
        
    })

})