import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Objects', () =>
{
    beforeEach('open application', () =>
    {
        cy.openHomePage()
    })

    it('verify navigation across the pages', () =>
    {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.smartTablePage()
        navigateTo.toastrPage()
        navigateTo.tooltipPage()
    })

    it('should submit Inline and Basic form and select tomorrow date in the calendar', () =>
    {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Test', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'pass1234')
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 15)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithUserData('Wiktor','Tester', 'Test', 'test@test.com', 25)
        onSmartTablePage.updateAgeByFirstName('Wiktor', 32)
        onSmartTablePage.deleteRowByIndex(1)
    })
})