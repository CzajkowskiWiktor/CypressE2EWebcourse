export class DialogPage{
    openDialogWithCompAndTemplate(){
        cy.contains('nb-card', 'Open Dialog').then(form =>
            {
                cy.wrap(form).contains('button', 'component').click()
                //get the dialog popup
                cy.get('ngx-showcase-dialog').find('nb-card').then(dialog =>
                {
                    //verify header of dialog
                    cy.wrap(dialog).find('nb-card-header').should('contain', 'This is a title passed to the dialog component')
                    //verify body text
                    cy.wrap(dialog).find('nb-card-body').should('contain', 'Lorem ipsum dolor sit amet,')
                    //dismiss dialog btn
                    cy.wrap(dialog).find('button').click()
                })
                //chceck if dialog with component is not exisiting
                cy.get('ngx-showcase-dialog').should('not.exist')
                //open dialog with template
                cy.wrap(form).contains('button', 'template').click()
                //get template popup
                cy.get('nb-dialog-container').find('nb-card').then(template =>
                {
                    const templateHeader = template.find('nb-card-header').text()
                    const templateBody = template.find('nb-card-body').text()
                    //verify header and body content
                    expect(templateHeader).to.equal('Template Dialog')
                    expect(templateBody).to.equal('this is some additional data passed to dialog')
                    //close dialog btn
                    cy.wrap(template).find('button').click() 
                })
                //check if dialog with template is not existing
                cy.get('nb-dialog-container').should('not.exist')
            })
    }

    openDialogWithEscAndWithoutEscClose(){
        cy.contains('nb-card', 'Open Without Esc').then(form =>
            {
                //open dialog with esc close
                cy.wrap(form).contains('button', 'with').click()
                //get the dialog popup
                cy.get('ngx-showcase-dialog').find('nb-card').then(dialog =>
                {
                    //verify header of dialog
                    cy.wrap(dialog).find('nb-card-header').should('contain', 'This is a title passed to the dialog component')
                    //verify body text
                    cy.wrap(dialog).find('nb-card-body').should('contain', 'Lorem ipsum dolor sit amet,')
                    //dismiss dialog with esc btn
                    cy.wrap(dialog).find('button').type('{esc}')
                })
                //chceck if dialog with component is not visible
                cy.get('ngx-showcase-dialog').should('not.exist')
                //open dialog without esc to close
                cy.wrap(form).contains('button', 'without').click()
                //get dialog popup
                cy.get('nb-dialog-container').find('nb-card').then(dialog =>
                {
                   //verify header of dialog
                    cy.wrap(dialog).find('nb-card-header').should('contain', 'Template Dialog')
                    //verify body text
                    cy.wrap(dialog).find('nb-card-body').should('contain', 'this is some additional data passed to dialog')
                    //dismiss dialog with esc btn
                    cy.wrap(dialog).find('button').type('{esc}')
                })
                //check if dialog with template is still existing
                cy.get('nb-dialog-container').should('exist')
                //close now dialog with button
                cy.get('nb-dialog-container').find('nb-card').find('button').click()
                //check if dialog with template is not existing
                cy.get('nb-dialog-container').should('not.exist')
    
            })
    }

    provideNamesToDialog(names){
        cy.contains('nb-card', 'Return Result').then(form =>
            {
                //check if names list is empty
                cy.wrap(form).find('ul').find('li').should('not.exist')
                //provide all names from array
                names.forEach(name =>
                {
                    //open dialog to provide names
                    cy.wrap(form).contains('button', 'Enter Name').click()
                    //get dialog
                    cy.get('ngx-dialog-name-prompt').find('nb-card').then(dialog =>
                    {
                        //verify dialog header
                        cy.wrap(dialog).find('nb-card-header').should('contain', 'Enter your name')
                        //provide input name
                        cy.wrap(dialog).find('[placeholder="Name"]').type(name)
                        //enter submit
                        cy.wrap(dialog).find('button.status-success').click()
                    })
                    //check if it is added to list
                    cy.wrap(form).find('ul').find('li').should('contain', name)
                })
                //verify listed names title
                cy.wrap(form).find('.title').should('contain','Names:')
                //check if all names are in the list
                cy.wrap(form).find('ul').find('li').each(($el, index) =>
                {
                    expect($el.text()).to.include(names[index])
                })
    
                //basic method
                // //open dialog to provide names
                // cy.wrap(form).contains('button', 'Enter Name').click()
                // //get dialog
                // cy.get('ngx-dialog-name-prompt').find('nb-card').then(dialog =>
                // {
                //     //verify dialog header
                //     cy.wrap(dialog).find('nb-card-header').should('contain', 'Enter your name')
                //     //provide input name
                //     cy.wrap(dialog).find('[placeholder="Name"]').type('John')
                //     //enter submit
                //     cy.wrap(dialog).find('button.status-success').click()
                // })
                //verify listed names
                // cy.wrap(form).find('.title').should('contain','Names:')
                // //list
                // cy.wrap(form).find('ul').find('li').should('contain', 'John')
            })
    }
}

export const onDialogPage = new DialogPage()