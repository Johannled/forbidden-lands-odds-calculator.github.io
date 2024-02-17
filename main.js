const SIMULATION_ATTEMPTS = 1_000_000
const SUCCESS = true
const FAIL = false
const BANE = 1

function calculate() {
    let attribute_dice_input = document.getElementById("attribute")
    let skill_dice_input = document.getElementById("skill")
    let gear_dice_input = document.getElementById("gear")

    let successes = 0

    let n_attribute_dices = parseInt(attribute_dice_input.value)
    let n_skill_dices = parseInt(skill_dice_input.value)
    let n_gear_dices = parseInt(gear_dice_input.value)
    
    for (let i = 0; i < SIMULATION_ATTEMPTS; i++) {
        if (simulate(n_attribute_dices,n_skill_dices,n_gear_dices)) {
            successes++
        }
    }

    let odds_text = document.getElementById("odds")
    console.log(successes)
    odds_text.innerHTML = ((successes/SIMULATION_ATTEMPTS)*100).toFixed(2)+"%"
}

function simulate(n_attribute_dices,n_skill_dices,n_gear_dices) {
    let n_attribute_dices_to_push = 0

    /* Roll Attribute & Gear Dices */
    for (let j = 0; j < n_attribute_dices + n_gear_dices; j++) {
        let val = rollDice()
        if (val == 6) {
            return SUCCESS
        }
        else if (val != BANE) {
            n_attribute_dices_to_push++
        }
    }

    /* Roll Skill Dices */
    for (let j = 0; j < n_skill_dices; j++) {
        let val = rollDice()
        if (val == 6) {
            return SUCCESS
        }
    }

    /* Reroll Attribute Dices */
    for (let j = 0; j < n_attribute_dices_to_push; j++) {
        let val = rollDice()
        if (val == 6) {
            return SUCCESS
        }
    }

    /* Reroll Skill Dices */
    for (let j = 0; j < n_skill_dices; j++) {
        let val = rollDice()
        if (val == 6) {
            return SUCCESS
        }
    }

    return FAIL;
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}