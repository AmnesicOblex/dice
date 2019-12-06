module.exports = {

    /**
     * Randomly generates a number between two numbers. If only one value is given it is assumed to be the max and the minimum defaults to 1.
     * @param {Number} min The minimum potential value.
     * @param {Number} max The maximum potential value.
     * @returns The randomly generated number in the given range.
     */
    randInt (min, max) {
        return randInt(min, max)
    },

    /**
     * Simulates the flipping of a coin.
     * @returns The result of the flip, either true or false.
     */
    flip() {
        var result = false
        if (randInt(2) === 1) {
            result = true
        }
        return result
    },

    /**
     * Simulates the rolling of an arbitrary number of arbitrary sided dice
     * @param {Number} diceNum The number of dice to roll.
     * @param {Number} diceType The type of dice to roll (d6, d8, d100, etc.).
     * @returns An array of dice rolls.
     */
    roll (diceNum, diceType){
        var rolls = []
        for (var i = 0; i < diceNum; ++i) {
            rolls.push(randInt(diceType))
        }
        return rolls
    },

    /**
     * Takes a raw ability score and converts it to an ability score modifier
     * @param {Number} rawScore The raw ability score.
     * @returns The calculated ability score modifier.
     */
    mod (rawScore) {
        return Math.floor((rawScore - 10) / 2) 
    },

   /**
    * Reduction function to some an array.
    * @param {Number} total The old total.
    * @param {Number} num The number to add.
    * @returns The new total.
    */ 
    getSum (total, num) {
        return getSum(total, num)
    },

    /**
     * Randomly selects an entry from the given table array.
     * @param {Array} table The table of values to select values from.
     * @returns Randomly selected value from table.
     */
    rollTable (table) {
        return table[randInt(0, table.length)]
    },
    
    /**
     * Randomly selects an entry from the given weighted table.
     * @param {Array} table The table of values to select values from.
     * @param {Number} diceNum The number of dice to roll.
     * @param {Number} diceType The type of dice to roll (d6, d8, d100, etc.)
     * @returns Randomly selected weighted value from table.
     */
    rollWeightedTable (table, diceNum, diceType) {
        // Calculates the upper bound for the weighted table.
        var max = table.reduce((total, element) => {
            return {weight: total.weight + element.weight}
        }).weight

        // Generates the roll.
        var roll
        if (diceNum == undefined) {
            // If their is no dice specified, the roll is just a random integer between 0 and max.
            roll = randInt(0, max)
        } else {
            // Otherwise the specified dice configuration is rolled.
            var mod = diceNum*diceType - max
            roll = this.roll(diceNum,diceType).reduce(getSum) - mod
        }

        // Iterates through the table until the cumulative weight is greater than or equal to the roll.
        var current = 0
        var element = table.find((element) => {
            current += element.weight
            return current >= roll
        })

        return element.value
    }
}

/**
 * Randomly generates a number between two numbers.
 * @param {Number} min The maximum potential value.
 * @param {Number} max The minimum potential value. If left blank, defaults to 1
 * @returns The randomly generated number in the given range.
 */
function randInt (min, max) {
    if (max == undefined) {
        max = min
        min = 1
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Reduction function to some an array.
 * @param {Number} total The old total.
 * @param {Number} num The number to add.
 * @returns The new total.
 */
function getSum (total, num) {
    return total + num
}
