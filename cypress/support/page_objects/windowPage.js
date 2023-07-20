export class WindowPage{
    fillWindowFormMinimizeExpandVerify(subject, text){
        //get button
        cy.contains('nb-card', 'Window Form').contains('button', 'Open window form').click()
        //fill the form and minimize
        cy.get('nb-window.full-screen').then(window =>
        {
            //verify window title
            cy.wrap(window).find('nb-card-header').find('.title').should('contain', 'Window')
            //type to subject input
            cy.wrap(window).find('#subject').type(subject)
            //type to text input
            cy.wrap(window).find('#text').type(text)
            //minimize the window
            cy.wrap(window).find('.buttons').find('[icon="minus-outline"]').click()
        })
        //open window again by clicking expand btn
        cy.get('nb-window').should('have.class', 'minimized').then(window =>
        {
            //expand the window
            cy.wrap(window).find('.buttons').find('[icon="expand-outline"]').click()
            cy.wrap(window).find('#subject').should('not.contain', subject)
            cy.wrap(window).find('#text').should('not.contain',text)
        })
    }

    fillWindowForm(subject, text){
        //get button
        cy.contains('nb-card', 'Window Form').contains('button', 'Open window form').click()
        //fill the form and minimize
        cy.get('nb-window.full-screen').then(window =>
        {
            //verify window title
            cy.wrap(window).find('nb-card-header').find('.title').should('contain', 'Window')
            //check subject title
            cy.wrap(window).find('[for="subject"]').should('contain', 'Subject:')
            //type to subject input
            cy.wrap(window).find('#subject').type(subject)
            //check text title
            cy.wrap(window).find('.text-label').should('contain', 'Text:')
            //type to text input
            cy.wrap(window).find('#text').type(text)
            //close the window
            cy.wrap(window).find('.buttons').find('[icon="close-outline"]').click()
        })
    }

    checkWindowTemplate(){
        //get button
        cy.contains('nb-card', 'Window Form').contains('button', 'Open window with').click()
        //check the form template
        cy.get('nb-window.full-screen').then(window =>
        {
            //verify window title
            cy.wrap(window).find('nb-card-header').find('.title').should('contain', 'Window content from template')
            //check window text
            cy.wrap(window).find('nb-card-body').find('p').should('contain', 'Here is the text provided via config: "some text to pass into template"')
            //1#close the window
            // cy.wrap(window).find('.buttons').find('[icon="close-outline"]').click()
            //2#closing the window by esc btn
            cy.wrap(window).find('nb-card-header').find('.title').type('{esc}')
        })
    }

    openWindowWithBackdrop(){
        //get button
        cy.contains('nb-card', 'Window Without').contains('button', 'Open window with').click()
        //check the form template
        cy.get('nb-window.full-screen').then(window =>
            {
                //verify window title
                cy.wrap(window).find('nb-card-header').find('.title').should('contain', 'Window content from template')
                //check window text
                cy.wrap(window).find('nb-card-body').find('p').should('contain', 'Here is the text provided via config: "some text to pass into template"')
                //2#closing the window by esc btn
                cy.wrap(window).find('nb-card-header').find('.title').type('{esc}')
            })
    }

    openWindowWithoutBackdrop(){
        //get button
        cy.contains('nb-card', 'Window Without').contains('button', 'Open window without').click()
        //check the form template
        cy.get('nb-window.full-screen').then(window =>
            {
                //verify window title
                cy.wrap(window).find('nb-card-header').find('.title').should('contain', 'Window without backdrop')
                //check window text
                cy.wrap(window).find('nb-card-body').should('contain', 'Disabled close on escape click.')
                //2#closing the window by esc btn
                cy.wrap(window).find('nb-card-header').find('.title').type('{esc}')
                //verify if window form is still visible on screen
                cy.get('nb-window').should('have.class', 'full-screen')
                //close the window by clicking close btn
                cy.wrap(window).find('.buttons').find('[icon="close-outline"]').click()
            })
        //check if window is not existing now
        cy.get('nb-window').should('not.exist')
    }
}

export const onWindowPage = new WindowPage()