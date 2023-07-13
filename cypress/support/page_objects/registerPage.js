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
        //success information box
        cy.get('.outline-success').should('be.visible').and('contain', 'Hooray!')
        //redirect after successful login
        cy.url().should('contain', '/pages')
    }

    passwordTooShort(fullName, email, password, repassword){
        cy.url().should('contain', '/auth/register')
        cy.get('#title').should('have.text', 'Register')
        //full name
        cy.get('[for="input-name"]').should('have.text', 'Full name:')
        cy.get('#input-name').type(fullName).should('have.class', 'status-success')
        //email
        cy.get('[for="input-email"]').should('have.text', 'Email address:')
        cy.get('#input-email').type(email).should('have.class', 'status-success')
        cy.get('form').find('button').should('be.disabled')
        //password
        cy.get('[for="input-password"]').should('have.text', 'Password:')
        cy.get('#input-password').type(password)
        //repeat password
        cy.get('[for="input-re-password"]').should('have.text', 'Repeat password:')
        cy.get('#input-re-password').type(repassword)
        //agree to terms
        cy.get('[name="terms"]')
            .find('[type="checkbox"]')
            .check({force: true})
            .should('be.checked')
        //cannot register due to password error
        cy.get('.caption.status-danger')
            .should('be.visible')
            .and('contain', 'Password should contain from 4 to 50 characters')
        cy.get('form').find('button').should('be.disabled')
    }

    lackOfPasswordConfirmation(fullName, email, password){
        cy.url().should('contain', '/auth/register')
        cy.get('#title').should('have.text', 'Register')
        //full name
        cy.get('[for="input-name"]').should('have.text', 'Full name:')
        cy.get('#input-name').type(fullName).should('have.class', 'status-success')
        //email
        cy.get('[for="input-email"]').should('have.text', 'Email address:')
        cy.get('#input-email').type(email).should('have.class', 'status-success')
        cy.get('form').find('button').should('be.disabled')
        //password
        cy.get('[for="input-password"]').should('have.text', 'Password:')
        cy.get('#input-password').type(password)
        //click repeat password and not provide data
        cy.get('[for="input-re-password"]').should('have.text', 'Repeat password:')
        cy.get('#input-re-password').click()
        //agree to terms
        cy.get('[name="terms"]')
            .find('[type="checkbox"]')
            .check({force: true})
            .should('be.checked')
        //cannot register due to password error
        cy.get('.caption.status-danger')
            .should('be.visible')
            .and('contain', 'Password confirmation is required!')
        cy.get('form').find('button').should('be.disabled')
    }

    lackofPassAndRepass(fullName, email){
        cy.url().should('contain', '/auth/register')
        cy.get('#title').should('have.text', 'Register')
        //full name
        cy.get('[for="input-name"]').should('have.text', 'Full name:')
        cy.get('#input-name').type(fullName).should('have.class', 'status-success')
        //email
        cy.get('[for="input-email"]').should('have.text', 'Email address:')
        cy.get('#input-email').type(email).should('have.class', 'status-success')
        cy.get('form').find('button').should('be.disabled')
        //password
        cy.get('[for="input-password"]').should('have.text', 'Password:')
        cy.get('#input-password').click()
        //click repeat password and not provide data
        cy.get('[for="input-re-password"]').should('have.text', 'Repeat password:')
        cy.get('#input-re-password').click()
        //agree to terms
        cy.get('[name="terms"]')
            .find('[type="checkbox"]')
            .check({force: true})
            .should('be.checked')
        //cannot register due to password errors
        cy.get('.caption.status-danger').each(($el, index) =>
        {
            expect($el).to.be.visible
            if(index == 0) {expect($el).to.contain('Password is required!')}
            if(index == 1) {expect($el).to.contain('Password confirmation is required!')}
        })
        cy.get('form').find('button').should('be.disabled')
    }

    goToLoginAlreadyHaveAccount(){
        cy.url().should('contain', '/auth/register')
        cy.get('#title').should('have.text', 'Register')
        cy.get('section.another-action').find('.text-link').click()
    }
}

export const onRegisterPage = new RegisterPage()