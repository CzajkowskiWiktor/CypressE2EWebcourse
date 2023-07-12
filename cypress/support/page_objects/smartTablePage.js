
export class SmartTable{

    updateAgeByFirstName(name, age){
        cy.get('tbody').contains('tr', name).then( tableRow => 
            {
                cy.wrap(tableRow).find('.nb-edit').click()
                cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
                cy.wrap(tableRow).find('.nb-checkmark').click()
                cy.wrap(tableRow).find('td').eq(6).should('contain', age)
            })
    }

    addNewRecordWithUserData(firstName, lastName, username, email, age){
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow =>
        {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(tableRow).find('[placeholder="Username"]').type(username)
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type(email)
            cy.wrap(tableRow).find('[placeholder="Age"]').type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').first().find('td').then( tableColumns =>
        {
            cy.wrap(tableColumns).eq(2).should('contain', firstName)
            cy.wrap(tableColumns).eq(3).should('contain', lastName)
            cy.wrap(tableColumns).eq(4).should('contain', username)
            cy.wrap(tableColumns).eq(5).should('contain', email)
            cy.wrap(tableColumns).eq(6).should('contain', age)
        })  
    }

    deleteRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() =>
        {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }

}

export const onSmartTablePage = new SmartTable()