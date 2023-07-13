export class LoginPage{
    submitLoginForm(email, password){
        cy.url().should('contain', '/auth/login')
        cy.get('#title').should('have.text', 'Login')
        //loggin button should be disabled
        cy.get('form').find('button').should('be.disabled')
        //chaining the email
        cy.get('form')
            .find('[for="input-email"]')
            .should('contain', 'Email address')
            .parents('form')
            .find('input#input-email')
            .type(email)
        //loggin button should be still disabled after providing the email
        cy.get('form').find('button').should('be.disabled')
        //provide password
        cy.get('form').find('[for="input-password"]').should('have.text', 'Password:')
        cy.get('form').find('#input-password').type(password)
        //loggin button now is enabled
        cy.get('form').find('button').should('be.enabled')
        //click remember me
        cy.get('[name="rememberMe"]')
            .find('[type="checkbox"]')
            .check({force: true})
            .should('be.checked')
        //click log in btn
        cy.get('form').find('button').click()
        //wait
        cy.wait(1000)
        //redirect after successful login
        cy.url().should('contain', '/pages')
    }
}

export const onLoginPage = new LoginPage()