export class RegisterPage{
    successfulRegister(fullName, email, password, repassword){
        cy.url().should('contain', '/auth/register')
        cy.get('#title').should('have.text', 'Register')
        //full name
        cy.get('[for="input-name"]').should('have.text', 'Full name:')
        cy.get('#input-name').type(fullName).should('have.class', 'status-success')
        cy.get('form').find('button').should('be.disabled')
        //email
        cy.get('[for="input-email"]').should('have.text', 'Email address:')
        cy.get('#input-email').type(email).should('have.class', 'status-success')
        cy.get('form').find('button').should('be.disabled')
        //password
        cy.get('[for="input-password"]').should('have.text', 'Password:')
        cy.get('#input-password').type(password).should('have.class', 'status-success')
        cy.get('form').find('button').should('be.disabled')
        //repeat password
        cy.get('[for="input-re-password"]').should('have.text', 'Repeat password:')
        cy.get('#input-re-password').type(repassword).should('have.class', 'status-success')
        cy.get('form').find('button').should('be.disabled')
        //agree to terms
        cy.get('[name="terms"]')
            .find('[type="checkbox"]')
            .check({force: true})
            .should('be.checked')
        //button
        cy.get('form').find('button').should('be.enabled')
        cy.get('form').find('button').click()
        //redirect after successful login
        cy.url().should('contain', '/pages')
    }
}

export const onRegisterPage = new RegisterPage()