/// <reference types="cypress" />
import { navigateTo } from "../support/page_objects/navigationPage"
import { onLoginPage } from "../support/page_objects/loginPage"
import { onRegisterPage } from "../support/page_objects/registerPage"
import { onRequestPasswordPage } from "../support/page_objects/requestPasswordPage"
import { onResetPasswordPage } from "../support/page_objects/resetPasswordPage"

describe("Testing the AUTH tab", () =>
{
    beforeEach('open application', () =>
    {
        cy.openHomePage()
    })

    it('successful login auth test', () =>
    {
        navigateTo.loginPage()
        onLoginPage.submitLoginForm('test@test.com', 'test1234')
    })

    it('forgot password - send request password link through login page', () =>
    {
        const email = 'david@test.com'
        navigateTo.loginPage()
        onLoginPage.clickForgotPassword(email)
        onRequestPasswordPage.submitResetPassword(email)
    })

    it('successful register auth', () =>
    {
        const fullName = 'David Test'
        const email = 'david@test.com'
        const password = 'test123'
        const repassword = 'test123'
        navigateTo.registerPage()
        onRegisterPage.successfulRegister(fullName, email, password, repassword)
    })

    it('failed register auth - length of password', () =>
    {
        const fullName = 'David Test'
        const email = 'david@test.com'
        const password = 'te1'
        const repassword = 'te12'
        navigateTo.registerPage()
        onRegisterPage.passwordTooShort(fullName, email, password, repassword)
    })

    it('failed register auth - lack of pass confirmation', () =>
    {
        const fullName = 'David Test'
        const email = 'david@test.com'
        const password = 'te12'
        navigateTo.registerPage()
        onRegisterPage.lackOfPasswordConfirmation(fullName, email, password)
    })

    it('failed register auth - lack of pass and repass', () =>
    {
        const fullName = 'David Test'
        const email = 'david@test.com'
        navigateTo.registerPage()
        onRegisterPage.lackofPassAndRepass(fullName, email)
    })

    it('Click register page and then go to login through link to sign in', ()=>
    {
        navigateTo.registerPage()
        onRegisterPage.goToLoginAlreadyHaveAccount()
        onLoginPage.submitLoginForm('test@test.com', 'test1234')
    })

    it('request a new password for email', () =>
    {
        const email = 'david@test.com'
        navigateTo.requestPasswordPage()
        onRequestPasswordPage.submitResetPassword(email)
    })

    it('reset a password', () =>
    {
        const password = 'test1234'
        const repassword = 'test1234'
        navigateTo.resetPasswordPage()
        onResetPasswordPage.submitChangePassword(password, repassword)
    })

    it('Difference in pass and repass in reset Password form', () =>
    {
        const password = 'test12'
        const repassword = 'test1234'
        navigateTo.resetPasswordPage()
        onResetPasswordPage.differenceInPassAndRepass(password,repassword)
    })
})