
export class formLayoutsPage{

    submitInlineFormWithNameAndEmail(name, email){
        cy.contains('nb-card', 'Inline form').find('form').then( form =>
        {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wrap(form).submit()
        })
    }

    submitBasicFormWithEmailAndPassword(email, password){
        cy.contains('nb-card', 'Basic form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wrap(form).submit()
        })

    }

    submitInlineFormWithFullNameAndEmail(fullName, email){
        cy.contains('nb-card', 'Inline form').find('form').then(form =>
            {
                cy.wrap(form).find('[placeholder="Jane Doe"]').type(fullName)
                cy.wrap(form).find('[placeholder="Email"]').type(email)
                cy.wrap(form).find('[type="checkbox"]').check({force: true}).should('be.checked')
                // cy.wrap(form).find('[type="submit"]').click()
                cy.wrap(form).submit()
            })
    }

    submitFormWithoutLabels(email, subject, message){
        cy.contains('nb-card', 'Form without labels').find('form').then(form => 
            {
                cy.wrap(form).find('[placeholder="Recipients"]').type(email)
                cy.wrap(form).find('[placeholder="Subject"]').type(subject)
                cy.wrap(form).find('[placeholder="Message"]').type(message)
                cy.wrap(form).submit()
            }) 
    }

    submitBlockForm(firstName, lastName, email, website){
        cy.contains('nb-card', 'Block form').find('nb-card-body').then(formBody =>
            {
                //check first name label
                cy.wrap(formBody).find('label[for="inputFirstName"]').should('contain', 'First Name')
                cy.wrap(formBody).find('#inputFirstName').type(firstName)
    
                //check last name label
                cy.wrap(formBody).find('label[for="inputLastName"]').should('contain', 'Last Name')
                cy.wrap(formBody).find('#inputLastName').type(lastName)
    
                //check email label
                cy.wrap(formBody).find('label[for="inputEmail"]').should('contain', 'Email')
                cy.wrap(formBody).find('#inputEmail').type(email)
    
                //check website label
                cy.wrap(formBody).find('label[for="inputWebsite"]').should('contain', 'Website')
                cy.wrap(formBody).find('#inputWebsite').type(website)
    
                //click button
                cy.wrap(formBody).find('button[type="submit"]').click()
            })
    }

    submitHorizontalForm(email, password){
        cy.contains('nb-card', 'Horizontal form').find('nb-card-body').then(formBody =>
            {
                cy.wrap(formBody).find('#inputEmail3').type(email)
                cy.wrap(formBody).find('#inputPassword3').type(password)
                cy.wrap(formBody).find('[type="checkbox"]').check({force: true}).should('be.checked')
                cy.wrap(formBody).find('button[type="submit"]').click()
            })
    }

}

export const onFormLayoutsPage = new formLayoutsPage()