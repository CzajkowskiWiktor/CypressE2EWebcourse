export class TooltipPage{
    checkColoredTooltips(){
        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

        cy.contains('nb-card', 'Colored Tooltips').contains('Primary').click()
        cy.get('nb-tooltip').should('have.class', 'status-primary').and('contain', 'This is a tooltip')

        cy.contains('nb-card', 'Colored Tooltips').contains('Success').click()
        cy.get('nb-tooltip').should('have.class', 'status-success').and('contain', 'This is a tooltip')

        cy.contains('nb-card', 'Colored Tooltips').contains('Danger').click()
        cy.get('nb-tooltip').should('have.class', 'status-danger').and('contain', 'This is a tooltip')

        cy.contains('nb-card', 'Colored Tooltips').contains('Info').click()
        cy.get('nb-tooltip').should('have.class', 'status-info').and('contain', 'This is a tooltip')

        cy.contains('nb-card', 'Colored Tooltips').contains('Warning').click()
        cy.get('nb-tooltip').should('have.class', 'status-warning').and('contain', 'This is a tooltip')
    }

    checkTooltipPlacements(){
        cy.contains('nb-card', 'Tooltip Placements').contains('Top').click()
        cy.get('nb-tooltip').should('have.class', 'top').and('contain', 'This is a tooltip')
        cy.contains('nb-card', 'Tooltip Placements').contains('Bottom').click()
        cy.get('nb-tooltip').should('have.class', 'bottom').and('contain', 'This is a tooltip')
        cy.contains('nb-card', 'Tooltip Placements').contains('Right').click()
        cy.get('nb-tooltip').should('have.class', 'right').and('contain', 'This is a tooltip')
        cy.contains('nb-card', 'Tooltip Placements').contains('Left').click()
        cy.get('nb-tooltip').should('have.class', 'left').and('contain', 'This is a tooltip')
    }

    chceckTooltipWithIcon(){
        cy.contains('nb-card', 'Tooltip With Icon').contains('Show Tooltip').click()
        cy.get('nb-tooltip').find('nb-icon').should('be.visible').parents('nb-tooltip').should('contain', 'This is a tooltip')
        cy.contains('nb-card', 'Tooltip With Icon').find('[nbtooltipstatus="danger"]').click()
        cy.get('nb-tooltip').find('nb-icon').should('be.visible')
    }

}

export const onTooltipPage = new TooltipPage()