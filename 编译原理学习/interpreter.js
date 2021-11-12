/**
 * 这里有点前面的验证的意味了
 * 
 * 主要需要注意是解析的顺序。比如 算数，应该是用左边的总和与右边进行计算。这种的树结构就很重要。
 * @param {} tree 
 * @returns 
 */
function interpreter(tree) {
    const operator = tree.operator;

    if (!operator) { return tree.value; }
    const left = tree.left;
    const right = tree.right;


    const leftValue = Number(interpreter(left));
    const rightValue = Number(interpreter(right));
    if (operator.value === '+') {
        console.log(leftValue, '+', rightValue);
        return leftValue + rightValue;
    } else if (operator.value === '-') {
        console.log(leftValue, '-', rightValue);
        return leftValue - rightValue;
    } else if (operator.value === '*') {
        console.log(leftValue, '*', rightValue);
        return leftValue * rightValue;
    } else if (operator.value === '/') {
        console.log(leftValue, '/', rightValue);
        return leftValue / rightValue;
    }
}

const demo = {"left":{"left":{"left":{"type":"number","value":"1"},"operator":{"type":"opetator","value":"+"},"right":{"left":{"type":"number","value":"12"},"operator":{"type":"opetator","value":"*"},"right":{"type":"number","value":"12"}}},"operator":{"type":"opetator","value":"-"},"right":{"left":{"type":"number","value":"2"},"operator":{"type":"opetator","value":"*"},"right":{"type":"number","value":"4"}}},"operator":{"type":"opetator","value":"+"},"right":{"type":"number","value":"6"}};
const res = interpreter(demo);
console.log(res);