module.exports = {

    /**
     * Randomly generates a number between two numbers. If only one value is given it is assumed to be the max and the minimum defaults to 1.
     * @param {Number} min The minimum potential value.
     * @param {Number} max The maximum potential value.
     * @returns {Number} The randomly generated number in the given range.
     */
    randInt (min, max) {
        return randInt(min, max)
    },

    /**
     * Simulates the flipping of a coin.
     * @returns {Boolean} The result of the flip, either true or false.
     */
    flip() {
        var result = false
        if (randInt(2) === 1) {
            result = true
        }
        return result
    },

    /**
     * Simulates the rolling of an arbitrary number of arbitrary sided dice.
     * @param {Number} diceNum The number of dice to roll.
     * @param {Number} diceType The type of dice to roll (d6, d8, d100, etc.).
     * @returns {Number[]} An array of dice rolls.
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
     * @returns {Number} The calculated ability score modifier.
     */
    mod (rawScore) {
        return Math.floor((rawScore - 10) / 2) 
    },

   /**
    * Reduction function to some an array.
    * @param {Number} total The old total.
    * @param {Number} num The number to add.
    * @returns {Number} The new total.
    */ 
    getSum (total, num) {
        return getSum(total, num)
    },

    /**
     * Randomly selects an entry from the given table array.
     * @param {Array} table The table of values to select values from.
     * @returns {*} Randomly selected value from table.
     */
    rollTable (table) {
        return table[randInt(0, table.length - 1)]
    },
    
    /**
     * Randomly selects an entry from the given weighted table.
     * @param {Array} table The table of values to select values from.
     * @param {Number} diceNum The number of dice to roll.
     * @param {Number} diceType The type of dice to roll (d6, d8, d100, etc.)
     * @returns {*} Randomly selected weighted value from table.
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
        if (element.value != undefined) {
            return element.value
        } else {
            delete element.weight
            return element
        }
    },

    /**
     * Randomly selects a prop from a parent object.
     * @param {Object} object The parent object.
     * @returns {Object} The selected prop name and value
     */
    rollObject (object) {
        // Converts the object to a table
        var table = []
        for (props in object) {
            table.push(props)
        }
        // Randomly selects a prop using the rollTable function 
        var result = {}
        result.prop = this.rollTable(table)
        result.object = object[result.prop]
        delete result.object.value
        return result
    },

    /**
     * Randomly selects a prop object with a value weight from a parent object.
     * @param {Object} object The parent object with weighted props.
     * @param {Number} [diceNum] The number of dice to roll. Optional.
     * @param {Number} diceType The type of dice to roll. Optional.
     * @returns {Object} with the prop name and the prop object with the weight stripped out.
     */
    rollWeightedObject (object, diceNum, diceType) {
        // Converts the object to a weighted table
        var table = []
        for (prop in object) {
            table.push({
                weight: object[props].value,
                value: prop
            })
        }
        // Randomly selects a prop using the rollWeightedTable function 
        var result = {}
        result.prop = this.rollWeightedTable(table, diceNum, diceType)
        result.object = object[result.prop]
        delete result.object.value
        return result
    }
}

/**
 * Randomly generates a number between two numbers.
 * @param {Number} min The maximum potential value.
 * @param {Number} max The minimum potential value. If left blank, defaults to 1
 * @returns {Number} The randomly generated number in the given range.
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
 * @returns {Number} The new total.
 */
function getSum (total, num) {
    return total + num
}
