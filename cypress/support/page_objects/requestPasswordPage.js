export class RequestPasswordPage{
    submitResetPassword(email){
        cy.url().should('contain', '/auth/request-password')
        cy.get('#title').should('have.text', 'Forgot Password')
        cy.get('p.sub-title').should('contain','Enter your email address and we’ll send a link to reset your password')
        cy.get('form').find('button').should('be.disabled')
        //provide email
        cy.get('[for="input-email"]').should('have.text', 'Enter your email address:')
        cy.get('#input-email').type(email).should('have.class', 'status-success')
        cy.get('form').find('button').should('be.enabled').click()
        //success information box
        cy.get('.outline-success').should('be.visible').and('contain', 'Hooray!')
        //redirect after successful login
        cy.url().should('contain', '/pages')
    }
}

export const onRequestPasswordPage = new RequestPasswordPage()