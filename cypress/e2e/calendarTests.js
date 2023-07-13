/// <reference types="cypress" />
import { navigateTo } from "../support/page_objects/navigationPage"
import { onCalendarPage } from "../support/page_objects/calendarPage"

describe("Testing calendar tab", () =>
{
    beforeEach('open application', () =>
    {
        cy.openHomePage()
    })

    it('calendar select date', () =>
    {
        navigateTo.calendarPage()
        onCalendarPage.selectDayFromCalendar(13)       
    })

    it("calender select range", () =>
    {
        navigateTo.calendarPage()
        onCalendarPage.selectRangeDaysFromCalendar(10,19)
    })

    it('Select date and check the price', () =>
    {
        navigateTo.calendarPage()
        onCalendarPage.checkPriceinCurrentDay(5, 2124)
    })

})