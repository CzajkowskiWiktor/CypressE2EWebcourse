function selectGroupMenuItem(groupName){
    cy.contains('a', groupName).then( menu =>
    {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr =>
        {
            if(attr.includes('left'))
            {
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage{

    formLayoutsPage(){
        selectGroupMenuItem('Forms')
        cy.contains("Form Layouts").click()
    }

    datePickerPage(){
        // cy.contains("Forms").click()
        selectGroupMenuItem('Forms')
        cy.contains("Datepicker").click()
    }

    toastrPage(){
        selectGroupMenuItem("Modal & Overlays")
        cy.contains("Toastr").click()
    }

    smartTablePage(){
        selectGroupMenuItem("Tables & Data")
        cy.contains("Smart Table").click()
    }

    tooltipPage(){
        selectGroupMenuItem("Modal & Overlays")
        cy.contains("Tooltip").click()
    }

    stepperPage(){
        selectGroupMenuItem("Layout")
        cy.contains("Stepper").click()
    }

    accordionPage(){
        selectGroupMenuItem("Layout")
        cy.contains("Accordion").click()
    }

    calendarPage(){
        selectGroupMenuItem("Extra Components")
        cy.contains("Calendar").click()
    }

    loginPage(){
        selectGroupMenuItem("Auth")
        cy.contains("Login").click()
    }

    registerPage(){
        selectGroupMenuItem("Auth")
        cy.contains("Register").click()
    }

}

export const navigateTo = new NavigationPage()