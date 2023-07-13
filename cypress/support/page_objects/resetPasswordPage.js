export class ResetPasswordPage{
    submitChangePassword(password, repassword){
        cy.url().should('contain', '/auth/reset-password')
        cy.get('#title').should('have.text', 'Change password')
        //loggin button should be disabled
        cy.get('form').find('button').should('be.disabled')
        cy.get('p.sub-title').should('contain','Please set a new password')
        //provide password
        cy.get('[for="input-password"]').should('have.text', 'New Password:')
        cy.get('#input-password').type(password).should('have.class', 'status-success')
        cy.get('form').find('button').should('be.disabled')
        //repeat password
        cy.get('[for="input-re-password"]').should('have.text', 'Confirm Password:')
        cy.get('#input-re-password').type(repassword)
        //change password btn
        cy.get('form').find('button').should('be.enabled').click()
        //success information box
        cy.get('.outline-success').should('be.visible').and('contain', 'Hooray!')
        //redirect after successful login
        cy.url().should('contain', '/pages')
    }

    differenceInPassAndRepass(password, repassword){
        cy.url().should('contain', '/auth/reset-password')
        cy.get('#title').should('have.text', 'Change password')
        //loggin button should be disabled
        cy.get('form').find('button').should('be.disabled')
        cy.get('p.sub-title').should('contain','Please set a new password')
        //provide password
        cy.get('[for="input-password"]').should('have.text', 'New Password:')
        cy.get('#input-password').type(password).should('have.class', 'status-success')
        cy.get('form').find('button').should('be.disabled')
        //repeat password
        cy.get('[for="input-re-password"]').should('have.text', 'Confirm Password:')
        cy.get('#input-re-password').type(repassword)
        cy.get('[for="input-re-password"]').click()
        //cannot change password due to error message
        cy.get('.caption.status-danger')
            .should('be.visible')
            .and('contain', 'Password does not match the confirm password')
    }
}

export const onResetPasswordPage = new ResetPasswordPage()