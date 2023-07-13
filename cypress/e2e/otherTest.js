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

    it("stepper horizontal test", () =>
    {
        navigateTo.stepperPage()
        onStepperPage.goThroughStepContentHorizontal()
    })

    it('Wizard completed', () => 
    {
        navigateTo.stepperPage()
        onStepperPage.completeWizard()
    })

    it("stepper vertical test", () =>
    {
        navigateTo.stepperPage()
        onStepperPage.goThroughStepContentVertical()
    })

    it("toggle first item tests", () =>
    {
        const textExpanded = "A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases. Originally, nebula was a name for any diffuse astronomical object, including galaxies beyond the Milky Way."
        navigateTo.accordionPage()
        onAccordionPage.clickFirstAccordion(textExpanded)
    })

    it('toggle three accordion items', () =>
    {
        const textsExpanded = ["A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.",
            "Originally, nebula was a name for any diffuse astronomical object,",
            "including galaxies beyond the Milky Way"]
        navigateTo.accordionPage()
        onAccordionPage.checkAndToggleThreeAccordionItem(textsExpanded)
        
    })

    it('successful login auth test', () =>
    {
        navigateTo.loginPage()
        onLoginPage.submitLoginForm('test@test.com', 'test1234')
    })

    it('successful register auth test', () =>
    {
        const fullName = 'David Test'
        const email = 'david@test.com'
        const password = 'test123'
        const repassword = 'test123'
        navigateTo.registerPage()
        onRegisterPage.successfulRegister(fullName, email, password, repassword)
    })

    it.only('failed register auth test - length of password', () =>
    {

    })

})