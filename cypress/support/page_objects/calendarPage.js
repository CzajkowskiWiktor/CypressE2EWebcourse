export class CalendarPage{
    selectDayFromCalendar(dayProvided){
        function selectDay(day)
        {
            //get today date
            let date = new Date()
            date.setDate(date.getDate()+day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en-GB', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth+' '+futureDay+', '+futureYear
            cy.log(dateAssert)

            //select a date
            cy.get('nb-card')
            .eq(0)
            .find('nb-calendar-navigation')
            .invoke('attr', 'ng-reflect-date')
            .then( dateAtrr =>
            {
                if(!dateAtrr.includes(futureMonth))
                {
                    cy.get('[data-name="chevron-right"]').first().click()
                    selectDay(day)
                } else {
                    cy.get('nb-calendar-day-picker').eq(0).find('[class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    // cy.get('.calendar-container').find('.subtitle').eq(0).should('contain', dateAssert)
                }
                
            })

            return dateAssert
        }

        let dateAssert = selectDay(dayProvided)

        //check if the selected date and today is equal to today
        cy.get('.calendar-container').find('.subtitle').eq(0).should('contain', dateAssert)
        // cy.get('.title').eq(0).should('contain', dateAssert)

    }

    selectRangeDaysFromCalendar(firstDay, secondDay){
        function selectDay(day)
        {
            //get today date
            let date = new Date()
            date.setDate(date.getDate()+day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en-GB', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth+' '+futureDay+', '+futureYear
            cy.log(dateAssert)

            //select a date
            cy.get('nb-card')
            .eq(1)
            .find('nb-calendar-navigation')
            .invoke('attr', 'ng-reflect-date')
            .then( dateAtrr =>
            {
                if(!dateAtrr.includes(futureMonth))
                {
                    cy.get('[data-name="chevron-right"]').eq(1).click()
                    selectDay(day)
                } else {
                    // cy.get('nb-calendar-range-day-cell')
                    cy.get('nb-calendar-range-day-cell').find('.day-cell').not('.bounding-month').contains(futureDay).click()
                    // cy.get('.calendar-container').find('.subtitle').eq(0).should('contain', dateAssert)
                }
                
            })

            return dateAssert
        }

        let dateAssertFirst = selectDay(firstDay)
        let dateAssertSecond = selectDay(secondDay)

        const finalDate = dateAssertFirst + " - " + dateAssertSecond
        cy.log(finalDate)
        //check if the selected date and today is equal to today
        cy.get('.calendar-container').find('.subtitle').eq(1).should('contain', finalDate)
    }

    checkPriceinCurrentDay(day, price){
        function checkPriceInDay(day, price)
        {
            //get today date
            let date = new Date()
            date.setDate(date.getDate()+day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en-GB', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth+' '+futureDay+', '+futureYear

            //select a date
            cy.get('nb-card')
            .eq(2)
            .find('nb-calendar-navigation')
            .invoke('attr', 'ng-reflect-date')
            .then( dateAtrr =>
            {
                if(!dateAtrr.includes(futureMonth))
                {
                    cy.get('[data-name="chevron-right"]').eq(2).click()
                    selectDay(day)
                } else {
                    cy.get('nb-calendar-day-picker')
                        .eq(2)
                        .find('[class="day-cell ng-star-inserted"]')
                        .not('.bounding-month')
                        .find('div')
                        .contains(futureDay)
                        .next()
                        .then(moneyText =>
                        {
                            //compare the price in that day from provided
                            expect(moneyText.text()).to.equal(price+"$")
                        })
                        .click()
                        
                    // cy.get('.calendar-container').find('.subtitle').eq(0).should('contain', dateAssert)
                }
            })
            return dateAssert
        }

        //check price in searched day and click it
        let dateClicked = checkPriceInDay(day, price)
        cy.get('.calendar-container').find('.subtitle').eq(2).should('contain', dateClicked)
    }
}

export const onCalendarPage = new CalendarPage()