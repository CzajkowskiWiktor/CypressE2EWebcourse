/// <reference types="cypress" />
import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"
import { onStepperPage } from "../support/page_objects/stepperPage"

describe("New tests out of course", () =>
{

    beforeEach('open application', () =>
    {
        cy.openHomePage()
    })

    it("inline form test", () =>
    {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithFullNameAndEmail("Dave Johnson", "johnson@example.com")
    })

    it("form without labels test", () =>
    {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitFormWithoutLabels("johnsondave@test.com", 'This is test', 'That is the test message of form')
    })

    it("block form", () => 
    {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitBlockForm("Dave", "Johnson","johnson.dav@test.com","https://johny.com")
    })

    it('horizontal form test', () =>
    {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitHorizontalForm("johnson.dav@test.com", "test1234")
    })

    it("datepicker with disabled min max values - to do", () => 
    {
        function selectDayFromCurrent(day) 
        {
            //getting and setting the current date + variable 
            let date = new Date()
            date.setDate(date.getDate()+day)
            
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en-GB', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth+' '+futureDay+', '+futureYear
            cy.log(futureDay)
            
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAtrr =>
                {
                    if(!dateAtrr.includes(futureMonth))
                    {
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFromCurrent(day)
                    } else 
                    {
                        if(day >= 6 || day <= -6)
                        {
                           throw new Error ("The Min Max values are out scope")
                        } else{
                            cy.get('.day-cell').not('.disabled').contains(futureDay).click()
                        }
                    }
                })

            return dateAssert
        }

        navigateTo.datePickerPage()
        cy.contains('nb-card', 'Datepicker With Disabled').find('input').then(input =>
        {
            cy.wrap(input).click()
            var listDays = []
            var indexList = 0
            // let min = listDays[0], max = listDays[0];
            cy.get('nb-calendar-day-cell').each( (dayCalendar, $index) =>
            {
                cy.wrap(dayCalendar).invoke('attr', 'class').then(($class) =>
                {
                    cy.log($class)
                })
                indexList = indexList + 1
                // if(!dayCalendar.hasClass('disabled')) 
                // {
                //     // cy.log(dayCalendar.text())
                //     listDays.push(dayCalendar.text())
                //     // cy.log(listDays[index])
                //     // cy.log(index)
                //     indexList = indexList +1
                // }

                // cy.log(listDays[0])

                
            })
            cy.log(indexList)
            // cy.log(listDays[0])
            // for (let i = 1; i < listDays.length; i++) { 
            //     if (listDays[i] > max) 
            //        max = listDays[i]; 
            //     if (listDays[i] < min) 
            //        min = listDays[i]; 
            //   } 
            // cy.log(max)
            // cy.log(min)

            let dateMax = selectDayFromCurrent(4)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateMax)
            // cy.wrap(input).should('have.value', dateMax)
        })
    })

    it('calendar select date', () =>
    {
        function selectDay(day)
        {
            //get today date
            let date = new Date()
            date.setDate(date.getDate()+day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en-GB', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth+' '+futureDay+', '+futureYear
            cy.log(dateAssert)

            //select a date
            cy.get('nb-card')
            .eq(0)
            .find('nb-calendar-navigation')
            .invoke('attr', 'ng-reflect-date')
            .then( dateAtrr =>
            {
                if(!dateAtrr.includes(futureMonth))
                {
                    cy.get('[data-name="chevron-right"]').first().click()
                    selectDay(day)
                } else {
                    cy.get('nb-calendar-day-picker').eq(0).find('[class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    // cy.get('.calendar-container').find('.subtitle').eq(0).should('contain', dateAssert)
                }
                
            })

            return dateAssert
        }

        cy.contains("Extra Components").click()
        cy.contains("Calendar").click()

        let dateAssert = selectDay(13)

        //check if the selected date and today is equal to today
        cy.get('.calendar-container').find('.subtitle').eq(0).should('contain', dateAssert)
        // cy.get('.title').eq(0).should('contain', dateAssert)

       
    })

    it("calender select range", () =>
    {
        function selectDay(day)
        {
            //get today date
            let date = new Date()
            date.setDate(date.getDate()+day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en-GB', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth+' '+futureDay+', '+futureYear
            cy.log(dateAssert)

            //select a date
            cy.get('nb-card')
            .eq(1)
            .find('nb-calendar-navigation')
            .invoke('attr', 'ng-reflect-date')
            .then( dateAtrr =>
            {
                if(!dateAtrr.includes(futureMonth))
                {
                    cy.get('[data-name="chevron-right"]').eq(1).click()
                    selectDay(day)
                } else {
                    // cy.get('nb-calendar-range-day-cell')
                    cy.get('nb-calendar-range-day-cell').find('.day-cell').not('.bounding-month').contains(futureDay).click()
                    // cy.get('.calendar-container').find('.subtitle').eq(0).should('contain', dateAssert)
                }
                
            })

            return dateAssert
        }

        cy.contains("Extra Components").click()
        cy.contains("Calendar").click()

        let dateAssertFirst = selectDay(19)
        let dateAssertSecond = selectDay(26)

        const finalDate = dateAssertFirst + " - " + dateAssertSecond
        cy.log(finalDate)
        //check if the selected date and today is equal to today
        cy.get('.calendar-container').find('.subtitle').eq(1).should('contain', finalDate)
    })

    it('Select date and check the price', () =>
    {
        function checkPriceInDay(day, price)
        {
            //get today date
            let date = new Date()
            date.setDate(date.getDate()+day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en-GB', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth+' '+futureDay+', '+futureYear

            //select a date
            cy.get('nb-card')
            .eq(2)
            .find('nb-calendar-navigation')
            .invoke('attr', 'ng-reflect-date')
            .then( dateAtrr =>
            {
                if(!dateAtrr.includes(futureMonth))
                {
                    cy.get('[data-name="chevron-right"]').eq(2).click()
                    selectDay(day)
                } else {
                    cy.get('nb-calendar-day-picker')
                        .eq(2)
                        .find('[class="day-cell ng-star-inserted"]')
                        .not('.bounding-month')
                        .find('div')
                        .contains(futureDay)
                        .next()
                        .then(moneyText =>
                        {
                            //compare the price in that day from provided
                            expect(moneyText.text()).to.equal(price+"$")
                        })
                        .click()
                        
                    // cy.get('.calendar-container').find('.subtitle').eq(0).should('contain', dateAssert)
                }
            })
            return dateAssert
        }

        cy.contains("Extra Components").click()
        cy.contains("Calendar").click()

        //check price in searched day and click it
        let dateClicked = checkPriceInDay(5, 1989)
        cy.get('.calendar-container').find('.subtitle').eq(2).should('contain', dateClicked)

    })

    it.only("stepper horizontal test", () =>
    {
        navigateTo.stepperPage()
        onStepperPage.goThroughStepContentHorizontal()
    })

    it.only('Wizard completed', () => 
    {
        navigateTo.stepperPage()
        onStepperPage.completeWizard()
    })

    it.only("stepper vertical test", () =>
    {
        navigateTo.stepperPage()
        onStepperPage.goThroughStepContentVertical()
    })

})