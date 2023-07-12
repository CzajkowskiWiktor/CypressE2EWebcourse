function selectDayFromCurrent(day) 
        {
            //getting and setting the current date + variable 
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en-GB', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth+' '+futureDay+', '+futureYear
            
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAtrr =>
                {
                    if(!dateAtrr.includes(futureMonth))
                    {
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFromCurrent(day)
                    } else 
                    {
                        cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                    }
                })

            return dateAssert
        }

export class DatepickerPage{
    selectCommonDatepickerDateFromToday(dayFromToday){

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input =>
        {
            cy.wrap(input).click()

            let dateAssert = selectDayFromCurrent(dayFromToday)

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    }

    selectDatepickerWithRangeFromToday(firstDay, secondDay){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input =>
            {
                cy.wrap(input).click()
    
                let dateAssertFirst = selectDayFromCurrent(firstDay)
                let dateAssertSecond = selectDayFromCurrent(secondDay)

                const finalDate = dateAssertFirst + " - " + dateAssertSecond
                cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
                cy.wrap(input).should('have.value', finalDate)
            })
    }
}

export const onDatePickerPage = new DatepickerPage()