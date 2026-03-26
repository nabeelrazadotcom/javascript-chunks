const mySym = Symbol("Sold")

let corolla = {
    Name: "Corolla Yaris",
    Brand: "Toyota",
    Color: "Black",
    [mySym]: "Sold",
    Model: 2012,
    status: function status() {
        console.log(`The car is ${this[mySym]}`)
    }
}

console.log(corolla.status());
