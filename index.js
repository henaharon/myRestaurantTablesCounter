var express = require('express'),
    events = require('events'),
    eventsConfig = require('./Rest/config').events, // use it
    Restaurant = require('./Rest/index')
    // create web server
    var app = express()
    var port = process.env.PORT || 8080
    
    var myRes = new Restaurant()

    app.get('/', (req, res) => {
        
        myRes.addToRes(5)
        myRes.addToRes(5)
        myRes.printOrders()
        myRes.addToRes(11)
        myRes.printOrders()
        myRes.addToRes(10)
        myRes.clearOrders()
        myRes.addToRes(20)
        myRes.removeTables(20)

        
        res.send(JSON.stringify(myRes.msgQue))
        
        /* Resetting the msgQue */
        while(myRes.msgQue.length)
            myRes.msgQue.pop()
        
        res.end()
    })



    app.listen(port, () =>{
        console.log(`Listening to port ${port}`)
    })

    myRes
    .on(eventsConfig.NEW, myRes.enterRestaurant)
    .on(eventsConfig.FINISH, myRes.leaveRestaurant)
    .on(eventsConfig.FULL, myRes.resFull)
    .on(eventsConfig.EMPTY, myRes.resEmpty)
    .on(eventsConfig.OVER, myRes.overFlow)