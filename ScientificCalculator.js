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
      let tmp = this.splitedExpression[g];
      if (this.isOperator(tmp)) {
        if (operatorStack.length === 0) {
          operatorStack.push(tmp);
          continue;
        }
        
        const curr_priority = this.getPriority(tmp);
        while(operatorStack.length > 0) {
          const prev = operatorStack.pop();
          const prev_priority = this.getPriority(prev);

        }
        continue;
      }

      this.postfixExpression.push(tmp);
    }
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
        return 1;
      case "+":
      case "-":
        return 2;
      default:
        return 99;
    }
  }
};

const sc = new ScientificCalculator();
sc.input('1+2+3+4+556/23-23');
sc.setSplitedExpression();
sc.setInfixToPostFix();
console.log(sc.postfixExpression);
