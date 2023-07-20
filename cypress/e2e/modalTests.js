/// <reference types="cypress" />
import { onToastrPage } from "../support/page_objects/toastrPage"
import { onTooltipPage } from "../support/page_objects/tooltipPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onDialogPage } from "../support/page_objects/dialogPage"
import { onPopoverPage } from "../support/page_objects/popoverPage"
import { onWindowPage } from "../support/page_objects/windowPage"

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

    it('get random toast message', () =>
    {
        navigateTo.toastrPage()
        onToastrPage.showRandomToastMessage()
    })

    it('check popover positions', () =>
    {
        const positionPop = ['left', 'top', 'bottom', 'right']
        navigateTo.popoverPage()
        onPopoverPage.checkPopoverPositionOnPage(positionPop)
    })

    it('check simple popovers', () =>
    {
        navigateTo.popoverPage()
        onPopoverPage.checkSimplePopovers()
    })

    it('check template popovers with item', () =>
    {
        navigateTo.popoverPage()
        onPopoverPage.checkTemplateWithItem()
    })

    it('check template popovers with form', () =>
    {
        navigateTo.popoverPage()
        onPopoverPage.checkTemplateWithForm()
    })

    it('check template popovers with card', () =>
    {
        navigateTo.popoverPage()
        onPopoverPage.checkTemplateWithCard()
    })

    it('check all component popovers', () =>
    {
        navigateTo.popoverPage()
        onPopoverPage.checkAllComponentPopovers()
    })

    it('fill window form, minimize, expand window and verify the text', () =>
    {
        const subject = 'Window test'
        const text = 'Lorem ipsum the pi 3.14'
        navigateTo.windowPage()
        onWindowPage.fillWindowFormMinimizeExpandVerify(subject, text)
    })

    it('fill window form and close it', () =>
    {
        const subject = 'Window test'
        const text = 'Lorem ipsum the pi 3.14'
        navigateTo.windowPage()
        onWindowPage.fillWindowForm(subject, text)
    })

    it('open window template and verify content', () =>
    {
        navigateTo.windowPage()
        onWindowPage.checkWindowTemplate()
    })

    it('open window with backdrop', () =>
    {
        navigateTo.windowPage()
        onWindowPage.openWindowWithBackdrop()
    })

    it('open window without backdrop', () =>
    {
        navigateTo.windowPage()
        onWindowPage.openWindowWithoutBackdrop()
    })

    it('open dialog with component and then with template', () =>
    {
        navigateTo.dialogPage()
        onDialogPage.openDialogWithCompAndTemplate()
    })

    it('open dialog with esc and then without esc to close', () =>
    {
        navigateTo.dialogPage()
        onDialogPage.openDialogWithEscAndWithoutEscClose()
    })

    it('return result from dialog - provide 3 inputs', () =>
    {
        const names = ['John', 'Marcel', 'Edi']
        navigateTo.dialogPage()
        onDialogPage.provideNamesToDialog(names)
    })

})