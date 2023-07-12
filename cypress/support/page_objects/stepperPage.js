
export class StepperPage{

    completeWizard(){
        //first step
        cy.get('nb-card').eq(1).then(form =>
            {
                //first step - validate and pass name
                cy.wrap(form).find('.step.selected').find('.label').find('span').should('contain', 'First step')
                cy.wrap(form).find('[placeholder="Enter your name"]').type('DaveTest13')
                cy.wrap(form).find('[type="submit"]').click()
                //go back and check provided name
                cy.wrap(form).find('[type="button"]').click()
                cy.wrap(form).find('[placeholder="Enter your name"]').should('have.value', 'DaveTest13')
                //go to next step and provide movie
                cy.wrap(form).find('[type="submit"]').click()
                cy.wrap(form).find('.step').eq(0).should('have.class', 'completed')
                cy.wrap(form).find('.step').eq(1).should('have.class', 'selected')
                cy.wrap(form).find('[placeholder="Enter favorite movie"]').type('Interstellar').should('have.value', 'Interstellar')
                cy.wrap(form).find('[type="submit"]').click()
                //last step - verify all steps and send the form
                cy.wrap(form).find('.step').eq(0).should('have.class', 'completed')
                cy.wrap(form).find('.step').eq(1).should('have.class', 'completed')
                cy.wrap(form).find('.step').eq(2).should('have.class', 'selected')
                cy.wrap(form).find('[placeholder="Enter something"]').type('That is the test')
                cy.wrap(form).find('[type="submit"]').click()
                //check if the form has been successfully sent
                //all steps completed
                cy.wrap(form).find('.step').each(($el, index) =>
                {
                    cy.wrap($el).should('have.class', 'completed')
                })
                //validate the title completion
                cy.wrap(form).find('h3').should('contain', 'Wizard completed!')
                cy.wrap(form).find('button').should('contain', 'Try again')
                // cy.wrap(form).find('.step').eq(0).should('have.class', 'completed')
                // cy.wrap(form).find('.step').eq(1).should('have.class', 'completed')
                // cy.wrap(form).find('.step').eq(2).should('have.class', 'completed')
    
    
    
            })
    }

    goThroughStepContentHorizontal(){
        //check if it is on 1 step and then go through all steps
        cy.get('nb-card').eq(0).find('.step-content').find('h3.ng-star-inserted').then(label =>
            {
                let headerText = label.text()
                expect(headerText).to.contain("#1")
                if(headerText.includes('#1'))
                {
                    //click next button
                    cy.get('[orientation="horizontal"]').find('[type="submit"]').contains('next').click()
                    //check if first step is completed and step content number has changed
                    cy.get('[orientation="horizontal"]').find('.header').find('.step').first().should('have.class', 'completed')
                    cy.get('[orientation="horizontal"]').find('h3').should('contain','#2')
                    //go through 2 step and validate
                    cy.get('[orientation="horizontal"]').find('.header').find('.step').should('have.class', 'selected')
                    cy.get('[orientation="horizontal"]').find('[type="submit"]').contains('next').click()
                    cy.get('[orientation="horizontal"]').find('.header').find('.step').eq(1).should('have.class', 'completed')
                    cy.get('[orientation="horizontal"]').find('h3').should('contain','#3')
                    //go through 3 step and validate
                    cy.get('[orientation="horizontal"]').find('.header').find('.step').should('have.class', 'selected')
                    cy.get('[orientation="horizontal"]').find('[type="submit"]').contains('next').click()
                    cy.get('[orientation="horizontal"]').find('.header').find('.step').eq(2).should('have.class', 'completed')
                    cy.get('[orientation="horizontal"]').find('h3').should('contain','#4')
                    //button NEXT should be disabled and PREV enabled
                    cy.get('[orientation="horizontal"]').find('.header').find('.step.selected').find('.label-index').should('contain', '4')
                    cy.get('[orientation="horizontal"]').find('[type="submit"]').contains('next').should('have.class', 'btn-disabled')
                    cy.get('[orientation="horizontal"]').find('[type="button"]').contains('prev').should('be.enabled')
                }
            })
    }

    goThroughStepContentVertical(){
        cy.get('[orientation="vertical"]').then(form =>
            {
                //check first step
                cy.wrap(form).find('h3').should('contain', '#1')
                cy.wrap(form).find('p.lorem').should('contain', 'Proin varius accumsan semper')
                cy.wrap(form).find('.step').eq(0).should('have.class', 'selected')
                //buttons are disabled and enabled
                cy.wrap(form).find('.step-content').find('[aria-disabled="true"]').should('contain', 'prev')
                cy.wrap(form).find('.step-content').find('[aria-disabled="false"]').should('contain', 'next')
                //go to second step and verify information
                cy.wrap(form).find('.step-content').find('[aria-disabled="false"]').click()
                cy.wrap(form).find('h3').should('contain', '#2')
                cy.wrap(form).find('p.lorem').should('contain', 'Curabitur luctus mattis risus')
                cy.wrap(form).find('.step').eq(0).should('have.class', 'completed')
                cy.wrap(form).find('.step').eq(1).should('have.class', 'selected')
                //go to third step
                cy.wrap(form).find('[type="submit"]').click()
                cy.wrap(form).find('h3').should('contain', '#3')
                cy.wrap(form).find('p.lorem').should('contain', 'Curabitur luctus mattis risus')
                cy.wrap(form).find('.step').eq(0).should('have.class', 'completed')
                cy.wrap(form).find('.step').eq(1).should('have.class', 'completed')
                cy.wrap(form).find('.step').eq(2).should('have.class', 'selected')
                //go to fourth step
                cy.wrap(form).find('[type="submit"]').click()
                cy.wrap(form).find('h3').should('contain', '#4')
                cy.wrap(form).find('p.lorem').should('contain', 'Fusce eu pulvinar magna, quis viverra ex')
                cy.wrap(form).find('.step-content').find('[aria-disabled="true"]').should('contain', 'next')
                cy.wrap(form).find('.step-content').find('[aria-disabled="false"]').should('contain', 'prev')
                cy.wrap(form).find('.step').each(($el, index) =>
                    {
                        if(index ==3){
                            cy.wrap($el).should('have.class', 'selected')
                        } else {
                            cy.wrap($el).should('have.class', 'completed')
                        }
                    })
            })
    }

}

export const onStepperPage = new StepperPage()