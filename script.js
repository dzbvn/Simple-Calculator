const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    
    }

    clear(){
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.slice(0,-1)
    }

    appendNumber(number){
        if (number == '.' && (this.currentOperand.includes('.') || (this.currentOperand == ''))){
            return
        }
        this.currentOperand += number
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.operation !== undefined) {
            this.operation = operation 
            this.equals()
            this.updateDisplay()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.previousOperand += ' '
        this.previousOperand += operation
        this.currentOperand = ''
    }

    equals(){
        if (this.operation === undefined) return
        if (this.currentOperand === ''){
            
            this.currentOperand = parseInt(this.previousOperand).toString()
            this.previousOperand = ''
            return
        }
        let res = parseFloat(this.previousOperand)

        if (this.operation == '+'){
            res += parseFloat(this.currentOperand)
        }
        else if (this.operation == '-'){
            res -= parseFloat(this.currentOperand)
        }
        else if (this.operation == '÷'){
            res /= parseFloat(this.currentOperand)
        }
        else if (this.operation == '*'){
            res *= parseFloat(this.currentOperand)
        }

        this.clear()
        this.currentOperand = res
        this.operation = undefined

    }


    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

deleteButton.addEventListener('click', (button) =>{
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.equals()
    calculator.updateDisplay()
})