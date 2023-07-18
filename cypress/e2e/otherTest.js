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
import { onToastrPage } from "../support/page_objects/toastrPage"
import { onTooltipPage } from "../support/page_objects/tooltipPage"
import { Button } from "bootstrap"

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

    it('forgot password - send request password link through login page', () =>
    {
        const email = 'david@test.com'
        navigateTo.loginPage()
        onLoginPage.clickForgotPassword(email)
        onRequestPasswordPage.submitResetPassword(email)
    })

    it('successful register auth', () =>
    {
        const fullName = 'David Test'
        const email = 'david@test.com'
        const password = 'test123'
        const repassword = 'test123'
        navigateTo.registerPage()
        onRegisterPage.successfulRegister(fullName, email, password, repassword)
    })

    it('failed register auth - length of password', () =>
    {
        const fullName = 'David Test'
        const email = 'david@test.com'
        const password = 'te1'
        const repassword = 'te12'
        navigateTo.registerPage()
        onRegisterPage.passwordTooShort(fullName, email, password, repassword)
    })

    it('failed register auth - lack of pass confirmation', () =>
    {
        const fullName = 'David Test'
        const email = 'david@test.com'
        const password = 'te12'
        navigateTo.registerPage()
        onRegisterPage.lackOfPasswordConfirmation(fullName, email, password)
    })

    it('failed register auth - lack of pass and repass', () =>
    {
        const fullName = 'David Test'
        const email = 'david@test.com'
        navigateTo.registerPage()
        onRegisterPage.lackofPassAndRepass(fullName, email)
    })

    it('Click register page and then go to login through link to sign in', ()=>
    {
        navigateTo.registerPage()
        onRegisterPage.goToLoginAlreadyHaveAccount()
        onLoginPage.submitLoginForm('test@test.com', 'test1234')
    })

    it('request a new password for email', () =>
    {
        const email = 'david@test.com'
        navigateTo.requestPasswordPage()
        onRequestPasswordPage.submitResetPassword(email)
    })

    it('reset a password', () =>
    {
        const password = 'test1234'
        const repassword = 'test1234'
        navigateTo.resetPasswordPage()
        onResetPasswordPage.submitChangePassword(password, repassword)
    })

    it('Difference in pass and repass in reset Password form', () =>
    {
        const password = 'test12'
        const repassword = 'test1234'
        navigateTo.resetPasswordPage()
        onResetPasswordPage.differenceInPassAndRepass(password,repassword)
    })

    it('check boxes', () =>
    {
        navigateTo.toastrPage()

        //it does not uncheck the checked boxes - to uncheck you need to click
        //it only works on input elements
        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
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
        function checkPopover(position){
            //get left button and verify popover
            cy.get('[nbpopoverplacement="'+position+'"]').click()
            cy.get('nb-popover').should('have.class', 'nb-overlay-'+position).and('contain','Hello, how are you today?')
        }
        const positionPop = ['left', 'top', 'bottom', 'right']
        navigateTo.popoverPage()
        // checkPopover('top')
        cy.contains('nb-card', 'Popover Position').then(card =>
            {
                //check title
                cy.wrap(card).find('nb-card-header').should('contain', 'Popover Position')
                //check body text
                cy.wrap(card).find('nb-card-body').find('p').should('contain', 'When popover has')
                //get left button and verify popover
                // cy.wrap(card).find('[nbpopoverplacement="'+position+'"]').click()
                // cy.get('nb-popover').should('have.class', 'nb-overlay-'+position).and('contain','Hello, how are you today?')
                positionPop.forEach(item =>
                {
                    checkPopover(item)
                })
            })
    })

    it('check simple popovers', () =>
    {
        navigateTo.popoverPage()
        cy.contains('nb-card', 'Simple Popovers').then(card =>
        {
                //check title
                cy.wrap(card).find('nb-card-header').should('contain', 'Simple Popovers')
                //check body text
                cy.wrap(card).find('nb-card-body').find('p').should('contain', 'In a simples form popover')
                //buttons
                cy.wrap(card).find('button').each((item, index) =>
                {
                    cy.wrap(item).click()
                    cy.get('nb-popover').should('have.class', 'nb-overlay-top').and('contain','Hello, how are you today?')
                })
                // cy.wrap(card).contains('on click').click()
                // cy.get('nb-popover').should('have.class', 'nb-overlay-top').and('contain','Hello, how are you today?')
                // cy.wrap(card).find('[nbpopovertrigger="hover"]').click()
                // cy.get('nb-popover').should('have.class', 'nb-overlay-top').and('contain','Hello, how are you today?')
                // cy.wrap(card).find('[nbpopovertrigger="hint"]').click()
                // cy.get('nb-popover').should('have.class', 'nb-overlay-top').and('contain','Hello, how are you today?')
        })
    })

    it('check template popovers with item', () =>
    {
        navigateTo.popoverPage()
        cy.contains('nb-card', 'Template Popovers').then(card =>
        {
            //check title
            cy.wrap(card).find('nb-card-header').should('contain', 'Template Popovers')
            //check body text
            cy.wrap(card).find('nb-card-body').find('p').should('contain', 'You can pass a refference')
            //find button with tabs
            cy.wrap(card).contains('With tabs').click()
            //form popover
            cy.get('nb-popover').then(popoverForm =>
            {
                //whatsup tab
                cy.wrap(popoverForm)
                    .find('nb-tabset')
                    .find('li.active')
                    .should('contain', "What's up")
                    .parents('nb-tabset')
                    .find('nb-tab.content-active')
                    .should('contain', 'Such a wonderful day')

                //second tab
                cy.wrap(popoverForm)
                    .find('nb-tabset')
                    .find('li')
                    .contains('Second Tab')
                    .click()
                    .parents('nb-tabset')
                    .contains('li', 'Second Tab')
                    .should('have.class', 'active')
                    .parents('nb-tabset')
                    .find('nb-tab.content-active')
                    .should('contain', 'Indeed!')
            })
        })
    })

    it.only('check template popovers with form', () =>
    {
        navigateTo.popoverPage()
        cy.contains('nb-card', 'Template Popovers').then(card =>
            {
                //check title
                cy.wrap(card).find('nb-card-header').should('contain', 'Template Popovers')
                //check body text
                cy.wrap(card).find('nb-card-body').find('p').should('contain', 'You can pass a refference')
                //find button with tabs
                cy.wrap(card).contains('With form').click()
                //form popover
                cy.get('nb-popover').then(popoverForm =>
                {
                    //placeholders input
                    cy.wrap(popoverForm).find('[placeholder="Recipients"]').type('test@test.com')
                    //subject input
                    cy.wrap(popoverForm).find('[placeholder="Subject"]').type('Test popover')
                    //message input
                    cy.wrap(popoverForm).find('[placeholder="Message"]').type('This is my test popover tab')
                    //button send message
                    cy.wrap(popoverForm).find('button').click()
                })
            })
    })

})