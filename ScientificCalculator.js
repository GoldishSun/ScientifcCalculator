const ScientificCalculator = class SC {
  constructor(expression) {
    this.expression = expression;
    this.splitedExpression = [];
    this.postfixExpression = [];
    this.operator = ["+", "-", "*", "/", "(", ")"];
  }
  input(expression) {
    this.expression = expression;
  }
  reset() {
    this.expression = null;
  }  
  setInfixToPostFix() {
    const operatorStack = [];
    for(let g = 0; g < this.splitedExpression.length; ++ g) {
      const tmp = this.splitedExpression[g];
      if (this.isOperator(tmp)) {
        if (operatorStack.length > 0) {
          while(this.getPriority(operatorStack[operatorStack.length - 1]) <= this.getPriority(tmp))
            this.postfixExpression.push(operatorStack.pop());
        }
        operatorStack.push(tmp);
        continue;
      }

      this.postfixExpression.push(tmp);
    }
    while(operatorStack.length > 0)
      this.postfixExpression.push(operatorStack.pop());
  }
  setSplitedExpression() {
    if (this.expression.length < 1) return ;
    let Nums = [];
    for(let g = 0; g < this.expression.length; ++ g) {
      let tmp = this.expression[g];
      if(this.isOperator(tmp)) {
        if (Nums.length > 0) {
          this.splitedExpression.push(Number(Nums.join('')));
          Nums = [];
        }
        this.splitedExpression.push(tmp);
        continue; 
      }
      Nums.push(tmp);
    }
    if(Nums.length > 0) this.splitedExpression.push(Number(Nums.join('')));
  }
  plus(operand_1, operand_2) {
    return operand_1 + operand_2;
  }
  minus(operand_1, operand_2) {
    return operand_1 - operand_2;
  }
  multiply(operand_1, operand_2) {
    return operand_1 * operand_2;
  }
  divide(operand_1, operand_2) {
    return operand_1 / operand_2;
  }
  isOperator(char) {
    return this.operator.indexOf(char) > -1 ? true : false;
  }
  getPriority(char) {
    switch (char) {
      case "(":
      case ")":
        return 0;
      case "*":
      case "/":
        return 5;
      case "+":
      case "-":
        return 10;
      default:
        return 99;
    }
  }
  calc() {
    
  }
};

const sc = new ScientificCalculator();
sc.input('(4+2)*2'); // (4+2)*2 => 42+2*
sc.setSplitedExpression();
sc.setInfixToPostFix();
console.log(sc.postfixExpression);
