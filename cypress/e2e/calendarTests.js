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
        onCalendarPage.checkPriceInCurrentDay(2, 2684)
    })

    it('Verify and Choose the min price of month', ()=>
    {
        navigateTo.calendarPage()
        onCalendarPage.checkAndSelectTheMinPriceOfMonth(1)
    })

    it('Verify and Choose the max price of month', ()=>
    {
        navigateTo.calendarPage()
        onCalendarPage.checkAndSelectTheMaxPriceOfMonth(31)
    })

    it('Get the day of Max price', () =>
    {
        navigateTo.calendarPage()
        onCalendarPage.getDayOfTheMaxPrice()
    })

    it('Get the day of Min price', () =>
    {
        navigateTo.calendarPage()
        onCalendarPage.getDayOfTheMinPrice()
    })

})