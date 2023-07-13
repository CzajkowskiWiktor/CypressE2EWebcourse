/// <reference types="cypress" />
import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"
import { onStepperPage } from "../support/page_objects/stepperPage"
import { onAccordionPage } from "../support/page_objects/accordionPage"
import { onCalendarPage } from "../support/page_objects/calendarPage"
import { onLoginPage } from "../support/page_objects/loginPage"
import { onRegisterPage } from "../support/page_objects/registerPage"
import { onRequestPasswordPage } from "../support/page_objects/requestPasswordPage"
import { onResetPasswordPage } from "../support/page_objects/resetPasswordPage"

describe("Tables tab testing", () =>
{
    beforeEach('open application', () =>
    {
        cy.openHomePage()
    })

    it('add new record with user data', () =>
    {
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithUserData('Wiktor','Tester', 'Test', 'test@test.com', 25)
        // onSmartTablePage.deleteRowByIndex(1)
    })

    it('delete row by index', () =>
    {
        navigateTo.smartTablePage()
        onSmartTablePage.deleteRowByIndex(1)
    })

    it('add new record with user data and update age of username provided', () =>
    {
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithUserData('Wiktor','Tester', 'Test', 'test@test.com', 25)
        onSmartTablePage.updateAgeByFirstName('Wiktor', 32)
    })
})