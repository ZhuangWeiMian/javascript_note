/**
 * 抽象语法树最重要是要找出最小的对应关系，层层之间的对应关系
 * expression     → equality ;
 * equality       → comparison ( ( "!=" | "==" ) comparison )* ;
 * comparison     → addition ( ( ">" | ">=" | "<" | "<=" ) addition )* ;
 * addition       → multiplication ( ( "-" | "+" ) multiplication )* ;
 * multiplication → unary ( ( "/" | "*" ) unary )* ;
 * unary          → ( "!" | "-" ) unary
 *                | primary ;
 * primary        → NUMBER | STRING | "false" | "true" | "nil"
 *                | "(" expression ")" ;
 */
class AddOperator {
    constructor(left, operator, right) {
        console.log(left, '====left');
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}

class DiverseOperator {
    constructor(left, operator, right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}

// const a = 1+1*3
class Parser {
    constructor(tokens) {
        this.tokens = tokens;

        this.currentIndex = tokens.length - 1;
        this.currentTok = tokens[this.currentIndex];
    }

    advance() {
        if (this.currentIndex < this.tokens.length) {
            this.currentIndex -= 1;
            this.currentTok = this.tokens[this.currentIndex];
        }
    }

    parse() {
        const res = this.expr();

        return res;
    }

    expr() {//145-8+6
        // 1+12*12-2*4+6
        const right = this.currentTok;

        this.advance();
        const type = this.currentTok.value;
        if (type === '+' || type === '-') {
            const operatorTok = this.currentTok;
            const left = this.expr();

            return new AddOperator(left, operatorTok, right);
        } else if (type === '/' || type === '*') {
            const operatorTok = this.currentTok;
            this.advance();
            const left = this.currentTok;

            this.currentTok = new DiverseOperator(left, operatorTok, right);

            return this.expr();
        } else {
            if (this.currentIndex === 0) {
                return this.currentTok;
            }

            return this.expr();
        }

    }
}


const testNumber = [
    { type: 'number', value: '1' },
    { type: 'opetator', value: '+' },
    { type: 'number', value: '12' },
    { type: 'opetator', value: '*' },
    { type: 'number', value: '12' },
    { type: 'opetator', value: '-' },
    { type: 'number', value: '2' },
    { type: 'opetator', value: '*' },
    { type: 'number', value: '4' },
    { type: 'opetator', value: '+' },
    { type: 'number', value: '6' }
];

const a = new Parser(testNumber);
const b = a.parse();
console.log(JSON.stringify(b));