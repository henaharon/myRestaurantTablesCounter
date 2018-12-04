var events = require('events'),
    eventsConfig = require('./config.js').events;


const MAX=20;

class Restaurant extends events.EventEmitter{
    constructor(){
        super();
        this.numOfTables=0;
        this.msgQue = [];
    }

    
    // adding order
    addToRes(num){ 
        if((this.numOfTables+num)==MAX){
            this.numOfTables+=num;
            this.emit('newTables');
            this.emit('fullRestaurant');
            return;
        }
        // the order is too big
        if((this.numOfTables+num)>MAX){ 
            this.emit('overFlow');
            return;
        }
        this.numOfTables+=num;
        this.emit('newTables');

    }
    // removing orders
    removeTables(num){ 
        if((this.numOfTables-num)<=0){
            this.emit('emptyRestaurant')
            return
        }
        this.numOfTables-=num
        this.emit('tablesLeft')
    }

    enterRestaurant(){ 
        this.msgQue.push('Your order has been placed.')
        console.log('Your order has been placed.')

    }

    overFlow(){
        this.msgQue.push('We do not have enough tables for you.')
        console.log('We do not have enough tables for you.')

    }

    leaveRestaurant(){ 
        this.msgQue.push('A table left the restaurant.')
        console.log('A table left the restaurant.')

    }

    resFull(){
        this.msgQue.push('The Restaurant is full.')
        console.log('The Restaurant is full.')

    }

    resEmpty(){
        this.msgQue.push('The Restaurant is empty.')
        console.log('The Restaurant is empty.')

    }

    printOrders(){
        this.msgQue.push(`Number of orders : ${this.numOfTables}.`)
        console.log(this.numOfTables)
    }

    printMsgQue(){
        for(let i = 0; i < this.queue.length; ++i)
            console.log(this.msgLog.push(this.queue[i]))
    }

    clearOrders(){
        this.numOfTables = 0;
        this.msgQue.push('All orders have been cancelled.')
        console.log('All orders cancelled.')

    }

    
}
module.exports = Restaurant;