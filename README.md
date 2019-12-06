# dice
The `@amnesic0blex/dice` module is a collection of simple functions that help with random generation. 
# Usage

## Table of contents
- [dice](#dice)
- [Usage](#usage)
  - [Table of contents](#table-of-contents)
  - [Dice Roller](#dice-roller)
  - [Random Integer Generator](#random-integer-generator)
  - [Coin Flipper](#coin-flipper)
  - [Ability Score Modifiers](#ability-score-modifiers)
  - [Table](#table)
  - [Weighted Table](#weighted-table)



## Dice Roller
Simulates the rolling of an arbitrary number of arbitrary sided dice. In this example `@amnesic0blex/dice` simulates rolling 1d100 and 4d6. Also the ```dice.getSum``` is a reduction function that sums an array. This can be used to get the sum of multiple dice rolls.

``` js
const dice = require('@amnesic0blex/dice')

console.log(dice.roll(1,100))
var rolls = dice.roll(4,6)
console.log(rolls)
console.log(rolls.reduce(dice.getSum))
```

## Random Integer Generator
Generates a random integer between two values. If only one value is given it is assumed to be the maximum and the minimum is assumed to be 1.

``` js
const dice = require('@amnesic0blex/dice')

console.log(dice.randInt(1,10))
console.log(dice.randInt(10))
console.log(dice.randInt(0,10))
console.log(dice.randInt(-5,5))
```

## Coin Flipper 
Simulates the flipping of a double-sided coin. Returns boolean true or false.

``` js
const dice = require('@amnesic0blex/dice')
var heads = 0
var tails = 0
for (var i = 0; i < 100; ++i) {
    if (dice.flip()) {
        ++heads
    } else {
        ++tails
    }
}
console.log(`Heads: ${heads}`)
console.log(`Tails: ${tails})
```

## Ability Score Modifiers
Calculates the 5e ability score modifier from an ability score.

``` js
const dice = require('@amnesic0blex/dice')

for (var i = 3; i < 20; ++i) {
    console.log(`Score: ${i}`)
    console.log(`Mod: ${dice.mod(i)}`)
    console.log()
}
```

## Table
Randomly selects a value from a table, with each value weighted evenly.

``` js
const dice = require('@amnesic0blex/dice')
var classTable = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard"
]

console.log(dice.rollTable(classTable))
```

## Weighted Table
Randomly selects a value from a table, with each value weighted individually.

``` js
const dice = require('@amnesic0blex/dice')
var raceTable = [
    {
        weight: 1,
        value: "Dragonborn"
    },
    {
        weight: 20,
        value: "Dwarf"
    },
    {
        weight: 15
        value: "Elf"
    },
    {
        weight: 5,
        value: "Gnome"
    },
    {
        weight: 10,
        value: "Half-Elf"
    },
    {
        weight: 7,
        value: "Half-Orc"
    },
    {
        weight: 5,
        value: "Halfling"
    },
    {
        weight: 35,
        value: "Human"
    },
    {
        weight: 2,
        value: "Tiefling"
    }
]

console.log(dice.rollWeightedTable(raceTable))
```