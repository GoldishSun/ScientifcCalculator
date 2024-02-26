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
    // 중위표기법을 후위표기법으로 변환
    let stack = [];
    for (let i = 0; i < this.splitedExpression.length; ++i) {
      let tmp = this.splitedExpression[i];
      if (typeof tmp === "number") {
        this.postfixExpression.push(tmp);
        continue;
      }
      if (tmp === "(") {
        stack.push(tmp);
        continue;
      }
      if (tmp === ")") {
        while (stack.length > 0 && stack[stack.length - 1] !== "(") {
          this.postfixExpression.push(stack.pop());
        }
        stack.pop();
        continue;
      }
      while (stack.length > 0 && this.getPriority(stack[stack.length - 1]) <= this.getPriority(tmp)) {
        const tmp = stack.pop();
        if (tmp !== "(") this.postfixExpression.push(tmp);
      }
      stack.push(tmp);
    }
    while (stack.length > 0) {
      this.postfixExpression.push(stack.pop());
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
