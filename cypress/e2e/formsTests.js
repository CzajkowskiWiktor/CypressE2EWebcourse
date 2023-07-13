/// <reference types="cypress" />
import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"

describe("Forms testing", () =>
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

    it('should submit Inline and Basic form', ()=>
    {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Test', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'pass1234')
    })

    it('select tomorrow date in the calendar', () =>
    {
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
    })

    it('select range in dates', () =>
    {
        navigateTo.datePickerPage()
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 15)
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
})