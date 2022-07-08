// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages


const input = require('sync-input')

/*
console.log("Starting to make a coffee");
console.log("Grinding coffee beans");
console.log("Boiling water");
console.log("Mixing boiled water with crushed coffee beans");
console.log("Pouring coffee into the cup");
console.log("Pouring some milk into the cup");
console.log("Coffee is ready!");
*/

// Coffee Machine
class CoffeeMachine {
    constructor(water, milk, coffee, disposableCups, balance) {
        this.hasWater = water;
        this.hasMilk = milk;
        this.hasCoffee = coffee;
        this.balance = balance
        this.hasDisposableCups = disposableCups
    }

    buy(drink) {
        if (this.maxCups(drink) < 1) {
            let details = this.maxCupsDetails(drink)
            let notEnough
            if (details.water < 1) {
                notEnough = "water"
            } else {
                if (details.milk < 1) {
                    notEnough = "milk"
                } else {
                    if (details.beans < 1) {
                        notEnough = "beans"
                    } else {
                        notEnough = "disposable cups"
                    }
                }
            }
            console.log("Sorry, not enough" + notEnough + "!")
        } else {
            console.log("I have enough resources, making you a coffee!")
            this.hasWater = this.hasWater - drink.needWater;
            this.hasMilk = this.hasMilk - drink.needMilk;
            this.hasCoffee = this.hasCoffee - drink.needCoffee;
            this.hasDisposableCups = this.hasDisposableCups - 1
            this.balance = this.balance + drink.price;
        }
    }

    fill(water, milk, coffee, disposableCups) {
        this.hasWater = this.hasWater + water
        this.hasCoffee = this.hasCoffee + coffee
        this.hasMilk = this.hasMilk + milk
        this.hasDisposableCups = this.hasDisposableCups + disposableCups
    }

    take() {
        console.log("I gave you $" + this.balance)
        this.balance = 0
    }

    printState() {
        console.log("")
        console.log("The coffee machine has:")
        console.log(this.hasWater + " ml of water")
        console.log(this.hasMilk + " ml of milk")
        console.log(this.hasCoffee + " g of coffee beans")
        console.log(this.hasDisposableCups + " disposable cups")
        console.log("$" + this.balance + " of money")
    }

    maxCups(drink) {
        let cups = this.maxCupsDetails(drink)
        return Math.floor(Math.min(cups.water, cups.milk, cups.beans))
    }

    maxCupsDetails(drink) {
        return {
            "water":
                parseFloat(this.hasWater / drink.needWater),
            "milk":
                parseFloat(this.hasMilk / drink.needMilk),
            "beans":
                parseFloat(this.hasCoffee / drink.needCoffee)
        }
    }
}

//init
class Drink {
    constructor(water, milk, coffee, price) {
        this.needWater = water
        this.needMilk = milk
        this.needCoffee = coffee
        this.price = price
    }
}

function fill() {
    console.log("Write how many ml of water you want to add:")
    let water = Number(input())

    console.log("Write how many ml of milk you want to add:")
    let milk = Number(input())

    console.log("Write how many grams of coffee beans you want to add:")
    let coffee = Number(input())

    console.log("Write how many disposable coffee cups you want to add:");
    let cups = Number(input())

    machine.fill(water, milk, coffee, cups)
}


let espresso = new Drink(250, 0, 16, 4)
let latte = new Drink(350, 75, 20, 7)
let cappuccino = new Drink(200, 100, 12, 6)

//init Machine
let machine = new CoffeeMachine(400, 540, 120, 9, 550)

function mainMenu() {
    console.log("Write action (buy, fill, take, remaining, exit):")
    action = input()

    if (action !== "exit") {
        writeAction()
    }
}

function writeAction() {
    //while (action !== "exit") {
    switch (action) {
        case "buy":
            console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:")
            let drink = Number(input())
            switch (drink) {
                case 1:
                    machine.buy(espresso)
                    break;
                case 2:
                    machine.buy(latte)
                    break;
                case 3:
                    machine.buy(cappuccino)
                    break;
                case "back":
                    mainMenu()
                    break;
            }
            break;
        case "fill":
            fill()
            break;
        case "take":
            machine.take()
            break;
        case "remaining":
            machine.printState();
            break;
    }
    mainMenu()
}

mainMenu()
