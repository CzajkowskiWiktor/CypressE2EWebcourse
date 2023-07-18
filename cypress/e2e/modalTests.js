/// <reference types="cypress" />
import { onToastrPage } from "../support/page_objects/toastrPage"
import { onTooltipPage } from "../support/page_objects/tooltipPage"
import { navigateTo } from "../support/page_objects/navigationPage"

describe('Modal and Overlays tab test', () =>
{
    beforeEach('open application', () =>
    {
        cy.openHomePage()
    })

    it('Colored tooltips', () =>
    {
        navigateTo.tooltipPage()
        onTooltipPage.checkColoredTooltips()
    })

    it('Tooltip placements', () =>
    {
        navigateTo.tooltipPage()
        onTooltipPage.checkTooltipPlacements()
    })

    it('tooltip with icon', ()=>
    {
        navigateTo.tooltipPage()
        onTooltipPage.chceckTooltipWithIcon()
    })

    it('show toast message with all checkboxes', () =>
    {
        navigateTo.toastrPage()
        onToastrPage.showToastMessage('top-left','title','example content','2500', 'success')
    })

    it('show toast message and delete it by clicking it', () =>
    {
        navigateTo.toastrPage()
        onToastrPage.showToastAndDeleteItByClicking('top-left','title','example content','2500', 'success')
    })

    it('show toast message and click it but hide unchecked', () =>
    {
        navigateTo.toastrPage()
        onToastrPage.showToastAndClickButDoNotDisappear('top-left','title','example content','2500', 'success')
    })

    it('show toast message without icon', () =>
    {
        navigateTo.toastrPage()
        onToastrPage.showToastMessageWihtoutIcon('top-left','title','example content','2500', 'success')
    })

    it.only('get random toast message', () =>
    {
        navigateTo.toastrPage()
        onToastrPage.showRandomToastMessage()
    })

})