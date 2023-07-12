/// <reference types="cypress" />

describe("First suite", () =>
{
    it("first test", () => 
    {
        cy.visit('/')
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        //creating own locators in html
        cy.get('[data-cy="signInButton"')

        cy.contains("Sign in")
        //another way to find element - with contains and atrribute
        cy.contains("[status='warning']", "Sign in")

        //another way to find element - with parent way - chaining the events
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card' ,'Horizontal form').find('[type="email"]')

    })

    it("Then and wrap methods", () => 
    {
        cy.visit('/')
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        //Using the grid - form
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //Basic form
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //nested form - jquery context and cypress context
        cy.contains('nb-card', 'Using the Grid').then( firstForm => 
        {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm =>
            {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                //change to cypress from jquery object
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })
        })
    })

    it('invoke command', () =>
    {
        cy.visit('/')
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()     
        
        //1 method - cypress assertion
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2 method - jquery method
        cy.get('[for="exampleInputEmail1"]').then( inputLabel =>
        {
            expect(inputLabel.text()).to.equal('Email address')
        })

        //3 method - cypress invoke
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text =>
        {
            expect(text).to.equal('Email address')
        })

        //4
        cy.contains('nb-card','Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')
            // .then( classValue =>
            //     {
            //         expect(classValue).to.contain('checked')
            //     })

    })

    it('assert property from calendar', () =>
    {
        function selectDayFromCurrent(day) 
        {
            //getting and setting the current date + variable 
            let date = new Date()
            date.setDate(date.getDate() + day)
            
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en-GB', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth+' '+futureDay+', '+futureYear
            cy.log(dateAssert)
            
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAtrr =>
                {
                    if(!dateAtrr.includes(futureMonth))
                    {
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFromCurrent(day)
                    } else 
                    {
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    }
                })

            return dateAssert
        }

        cy.visit('/')
        cy.contains("Forms").click()
        cy.contains("Datepicker").click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input =>
        {
            cy.wrap(input).click()

            let dateAssert = selectDayFromCurrent(5)

            // cy.get('nb-calendar-day-picker').contains('18').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        })

    })

    it('radio buttons and checkboxes', () =>
    {
        cy.visit('/')
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons =>
        {
            //first radio button
            cy.wrap(radioButtons).first().check({force: true}).should('be.checked')

            //second radio button
            cy.wrap(radioButtons).eq(1).check({force: true})

            cy.wrap(radioButtons).first().should('not.be.checked')

            //third radio button
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
        
    })

    it('check boxes', () =>
    {
        cy.visit('/')
        cy.contains("Modal & Overlays").click()
        cy.contains("Toastr").click()

        //it does not uncheck the checked boxes - to uncheck you need to click
        //it only works on input elements
        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
    })

    it('lists and dropdowns', () =>
    {
        cy.visit('/')

        //1 - manual method of changing background color
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
        cy.get('nav nb-select').should('contain', "Dark")
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Light').click()
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(255, 255, 255)')
        cy.get('nav nb-select').should('contain', "Light")


        //2 - automate method of changng the background color
        cy.get('nav nb-select').then( dropdown =>
        {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) =>
            {
                // cy.log(listItem.text())
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index < 3) {cy.wrap(dropdown).click()}
                
            })
        })

        //there is another method with select() - but it is needed to chawe select tag and option values
    })

    it("web tables", () =>
    {
        cy.visit('/')
        cy.contains("Tables & Data").click()
        cy.contains("Smart Table").click()

        //1 example - change the age of existing person
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => 
        {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("24")
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '24')
        })

        //2 example - add new row
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow =>
        {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type("Wiktor")
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Czajk")
            cy.wrap(tableRow).find('[placeholder="Username"]').type("Czaja")
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type("test@test.com")
            cy.wrap(tableRow).find('[placeholder="Age"]').type("32")
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').first().find('td').then( tableColumns =>
        {
            cy.wrap(tableColumns).eq(2).should('contain', 'Wiktor')
            cy.wrap(tableColumns).eq(3).should('contain', 'Czajk')
            cy.wrap(tableColumns).eq(4).should('contain', 'Czaja')
            cy.wrap(tableColumns).eq(5).should('contain', 'test@test.com')
            cy.wrap(tableColumns).eq(6).should('contain', '32')
        })

        //3 example - search by age
        const age = [20, 30 ,40, 200]

        cy.wrap(age).each( age =>
        {
            cy.get('thead').find('[placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => 
            {
                if(age == 200) 
                {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else
                {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it('Pop ups and tooltips', () =>
    {
        cy.visit('/')
        cy.contains("Modal & Overlays").click()
        cy.contains("Tooltip").click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('dialog box', () =>
    {
        cy.visit('/')
        cy.contains("Tables & Data").click()
        cy.contains("Smart Table").click()

        cy.get('tbody tr').first().find('.nb-trash').click()

        //1 method - not good to follow - if window:confirm method will not be executed then the message will not be checked
        cy.on('window:confirm', (confirm) =>
        {
            expect(confirm).to.equal("Are you sure you want to delete?")
        })

        //2 method - better - the stub will be empty and there will be no message - give right assertion
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() =>
        {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        //3 not confirm to dialog - to false
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)

    })

    
})