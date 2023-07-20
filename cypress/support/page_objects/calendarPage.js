
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

    checkPriceInCurrentDay(day, price){
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
                } else if(day == 0){
                    //if the day is today
                    cy.get('nb-calendar-day-picker')
                    .eq(2)
                    .find('ngx-day-cell.today')
                    .contains(futureDay)
                    .parents('ngx-day-cell.today')
                    .find('span.caption')
                    .then(moneyText =>
                    {
                        //compare the price in that day from provided
                        expect(moneyText.text()).to.equal(price+"$")
                    })
                    .click()
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

    checkAndSelectTheMinPriceOfMonth(minPriceDay){
        // function getAllPricesOfMonth()
        // {
        //     var filteredPricesArr = new Array()
        //     //select a calendar
        //     // cy.get('nb-card')
        //     // .eq(2)
        //     // .then( calendar =>
        //     // {
        //     //     //get all prices values
        //     //     const pricesArr = calendar.find('nb-calendar-picker').find('.day-cell').not('.bounding-month').find('span.caption').text()
        //     //     //filter the array
        //     //     const filteredPricesArr = pricesArr.split(['$']).filter(function(el) {return el})
        //     //     // cy.log(filteredPricesArr)
        //     //     // for(let prices of filteredPricesArr) { cy.log(prices) }
        //     //     return filteredPricesArr
        //     // })

        //     //select all prices text
        //     cy.get('nb-card')
        //         .eq(2)
        //         .find('nb-calendar-picker')
        //         .find('.day-cell')
        //         .not('.bounding-month')
        //         .find('span.caption')
        //         .then(priceText =>
        //         {
        //             //get all prices
        //             let prices = priceText.text()
        //             //filter the array
        //             const filteredPricesArr = prices.split(['$']).filter(function(el) {return el})
        //             cy.wrap(filteredPricesArr).as('priceCal') 
        //         })

        //     //show prices
        //     cy.get('@priceCal').then(priceCal =>
        //     {
        //         // for(let prices of priceCal) { cy.log(prices) }
        //         return priceCal
        //     })
 
        // }

        // //get all prices of month
        // const pricesArray = getAllPricesOfMonth()
        // // console.log(prices)
        // cy.log(pricesArray)

        // var filteredPricesArr = new Array()
        //select a calendar
        cy.get('nb-card')
            .eq(2)
            .then( calendar =>
            {
                //get all prices values
                const pricesArr = calendar.find('nb-calendar-picker').find('.day-cell').not('.bounding-month').find('span.caption').text()
                //filter the array
                const filteredPricesArr = pricesArr.split(['$']).filter(function(el) {return el})
                // cy.log(filteredPricesArr)
                // for(let prices of filteredPricesArr) { cy.log(prices) }
                cy.wrap(filteredPricesArr).as('priceCal') 
            })
        //
        cy.get('@priceCal').then(priceCal =>
            {
                // for(let prices of priceCal) { cy.log(prices) }
                //get min price in month
                var priceArr = priceCal
                // var maxPrice = Math.max.apply(Math, priceArr)
                var minPrice = Math.min.apply(Math, priceArr)
                cy.log("min: "+ minPrice)

                //get the day of the min price
                cy.get('nb-card')
                    .eq(2)
                    .find('nb-calendar-picker')
                    .find('.day-cell')
                    .not('.bounding-month')
                    .contains(minPrice)
                    .parents('ngx-day-cell')
                    .find('div')
                    .then(priceDay =>
                    {
                        expect(parseInt(priceDay.text())).to.equal(minPriceDay)
                        cy.log('The day of min price is: '+priceDay.text())
                        cy.wrap(priceDay).click()
                    })
            })
        //check selected day
        var dateClicked = minPriceDay
        cy.get('.calendar-container').find('.subtitle').eq(2).should('contain', dateClicked)
    }

    checkAndSelectTheMaxPriceOfMonth(maxPriceDay){
        //select a calendar
        cy.get('nb-card')
            .eq(2)
            .then( calendar =>
            {
                //get all prices values
                const pricesArr = calendar.find('nb-calendar-picker').find('.day-cell').not('.bounding-month').find('span.caption').text()
                //filter the array
                const filteredPricesArr = pricesArr.split(['$']).filter(function(el) {return el})
                // cy.log(filteredPricesArr)
                // for(let prices of filteredPricesArr) { cy.log(prices) }
                cy.wrap(filteredPricesArr).as('priceCal') 
            })
        //
        cy.get('@priceCal').then(priceCal =>
        {
            // for(let prices of priceCal) { cy.log(prices) }
            //get max price in month
            var priceArr = priceCal
            var maxPrice = Math.max.apply(Math, priceArr)
            // var minPrice = Math.min.apply(Math, priceArr)
            cy.log("max: "+maxPrice)

                //get the day of the max price
                cy.get('nb-card')
                    .eq(2)
                    .find('nb-calendar-picker')
                    .find('.day-cell')
                    .not('.bounding-month')
                    .contains(maxPrice)
                    .parents('ngx-day-cell')
                    .find('div')
                    .then(priceDay =>
                    {
                        expect(parseInt(priceDay.text())).to.equal(maxPriceDay)
                        cy.log('The day of max price is: '+priceDay.text())
                        cy.wrap(priceDay).click()
                    })
        })
        //check selected day
        var dateClicked = maxPriceDay
        cy.get('.calendar-container').find('.subtitle').eq(2).should('contain', dateClicked)
    }

    getDayOfTheMaxPrice(){
        //select a calendar
        cy.get('nb-card')
            .eq(2)
            .then( calendar =>
            {
                //get all prices values
                const pricesArr = calendar.find('nb-calendar-picker').find('.day-cell').not('.bounding-month').find('span.caption').text()
                //filter the array
                const filteredPricesArr = pricesArr.split(['$']).filter(function(el) {return el})
                // cy.log(filteredPricesArr)
                // for(let prices of filteredPricesArr) { cy.log(prices) }
                cy.wrap(filteredPricesArr).as('priceCal') 
            })
        //
        cy.get('@priceCal').then(priceCal =>
        {
            // for(let prices of priceCal) { cy.log(prices) }
            //get max price in month
            var priceArr = priceCal
            var maxPrice = Math.max.apply(Math, priceArr)
            // var minPrice = Math.min.apply(Math, priceArr)
            cy.log("max: "+maxPrice)

                //get the day of the max price
                cy.get('nb-card')
                    .eq(2)
                    .find('nb-calendar-picker')
                    .find('.day-cell')
                    .not('.bounding-month')
                    .contains(maxPrice)
                    .parents('ngx-day-cell')
                    .find('div')
                    .then(priceDay =>
                    {
                        const maxDay = priceDay.text()
                        cy.log(maxDay + " -> the day of max price")
                    })
        })
    }

    getDayOfTheMinPrice(){
        //select a calendar
        cy.get('nb-card')
            .eq(2)
            .then( calendar =>
            {
                //get all prices values
                const pricesArr = calendar.find('nb-calendar-picker').find('.day-cell').not('.bounding-month').find('span.caption').text()
                //filter the array
                const filteredPricesArr = pricesArr.split(['$']).filter(function(el) {return el})
                // cy.log(filteredPricesArr)
                // for(let prices of filteredPricesArr) { cy.log(prices) }
                cy.wrap(filteredPricesArr).as('priceCal') 
            })
        //
        cy.get('@priceCal').then(priceCal =>
        {
            // for(let prices of priceCal) { cy.log(prices) }
            //get max price in month
            var priceArr = priceCal
            // var maxPrice = Math.max.apply(Math, priceArr)
            var minPrice = Math.min.apply(Math, priceArr)
            cy.log("min: "+minPrice)

                //get the day of the max price
                cy.get('nb-card')
                    .eq(2)
                    .find('nb-calendar-picker')
                    .find('.day-cell')
                    .not('.bounding-month')
                    .contains(minPrice)
                    .parents('ngx-day-cell')
                    .find('div')
                    .then(priceDay =>
                    {
                        const minDay = priceDay.text()
                        cy.log(minDay + " -> the day of max price")
                    })
        })
    }
}

export const onCalendarPage = new CalendarPage()