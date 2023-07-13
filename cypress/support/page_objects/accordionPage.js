export class AccordionPage{
    checkAndToggleThreeAccordionItem(textsExpanded){
        cy.get('nb-accordion').eq(1).then(form => 
            {
                //check if accordion list is collapsed
                cy.wrap(form).find('nb-accordion-item').each($el =>
                {
                    cy.wrap($el).should('have.class', 'collapsed')
                })
    
                //click each item and validate the expanded text according to 3 different texts
                cy.wrap(form).find('nb-accordion-item').each(($el, index) =>
                {
                    cy.wrap($el).click().then( accordionItem =>
                    {
                        cy.wrap(accordionItem).should('have.class', 'expanded')
                        cy.wrap(accordionItem).find('.item-body').should('contain', textsExpanded[index])
                    })
                })
            })
    }

    clickFirstAccordion(textExpanded){
        cy.get('nb-accordion-item').eq(0).should('have.class', 'collapsed')
        cy.contains('Toggle First Item').click()
        // cy.get('nb-accordion-item').eq(0).should('have.class', 'expanded').then(form =>
        // {
        //     cy.wrap(form).find('.item-body').should('contain', textExpanded)
        // })
        // cy.get('nb-accordion-item').eq(1).should('have.class', 'collapsed')
        // cy.get('nb-accordion-item').eq(2).should('have.class', 'collapsed')

        //check collapsed and expanded accordions
        cy.get('nb-accordion-item').each(($el, index) =>
        {
            if(index == 0){
                cy.wrap($el).should('have.class', 'expanded').then(form =>
                    {
                        cy.wrap(form).find('.item-body').should('contain', textExpanded)
                    })
            } else {
                cy.wrap($el).should('have.class', 'collapsed')
            }       
        })
    }
}

export const onAccordionPage = new AccordionPage()