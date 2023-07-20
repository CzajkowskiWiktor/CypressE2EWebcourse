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
import { onDialogPage } from "../support/page_objects/dialogPage"
import { onPopoverPage } from "../support/page_objects/popoverPage"
import { onWindowPage } from "../support/page_objects/windowPage"


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

    it.only('check popover positions', () =>
    {
        const positionPop = ['left', 'top', 'bottom', 'right']
        navigateTo.popoverPage()
        onPopoverPage.checkPopoverPositionOnPage(positionPop)
    })

    it.only('check simple popovers', () =>
    {
        navigateTo.popoverPage()
        onPopoverPage.checkSimplePopovers()
    })

    it.only('check template popovers with item', () =>
    {
        navigateTo.popoverPage()
        onPopoverPage.checkTemplateWithItem()
    })

    it.only('check template popovers with form', () =>
    {
        navigateTo.popoverPage()
        onPopoverPage.checkTemplateWithForm()
    })

    it('check template popovers with card', () =>
    {
        navigateTo.popoverPage()
        onPopoverPage.checkTemplateWithCard()
    })

    it.only('check all component popovers', () =>
    {
        navigateTo.popoverPage()
        onPopoverPage.checkAllComponentPopovers()
    })

    it.only('fill window form, minimize, expand window and verify the text', () =>
    {
        const subject = 'Window test'
        const text = 'Lorem ipsum the pi 3.14'
        navigateTo.windowPage()
        onWindowPage.fillWindowFormMinimizeExpandVerify(subject, text)
    })

    it.only('fill window form and close it', () =>
    {
        const subject = 'Window test'
        const text = 'Lorem ipsum the pi 3.14'
        navigateTo.windowPage()
        onWindowPage.fillWindowForm(subject, text)
    })

    it.only('open window template and verify content', () =>
    {
        navigateTo.windowPage()
        onWindowPage.checkWindowTemplate()
    })

    it.only('open window with backdrop', () =>
    {
        navigateTo.windowPage()
        onWindowPage.openWindowWithBackdrop()
    })

    it.only('open window without backdrop', () =>
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