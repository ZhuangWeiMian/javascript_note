/**
 * 词法分析器 `let a = 1 + 12- 2 * 4+6`
 */

/**
 * 关键词
 */
const KEY_WORD = [
    'const',
    'let',
];

const EQ = '=';

class TokenResult {
    constructor() {
        this.result = [];
    }
}

class Token {
    constructor(input) {
        this.input = input;
        this.currentIndex = -1;
        this.currentChar = null;
        this.lastToken = null;
        this.result = [];
    }

    advance() {
        this.currentIndex++;
        this.currentChar = this.input[this.currentIndex];
    }

    parse() {
        if (this.currentIndex >= this.input.length - 1) {
            return this.result;
        }

        this.advance();
        let code = this.currentChar.charCodeAt();
        if (code <= 57 && code >= 48) {
            let numberData = '';
            while (this.currentChar && code <= 57 && code >= 48) {
                numberData += this.currentChar;

                this.advance();
                code = this.currentChar && this.currentChar.charCodeAt() || 0;
            }

            this.result.push({
                type: 'number',
                value: numberData,
            });
        }

        if (code === 42 || code === 47 || code === 45 || code === 43) {
            this.result.push({
                type: 'operator',
                value: this.currentChar,
            })
        }

        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90)) {
            // 解析字符串
            let stringData = '';
            while (this.currentChar !== ' ') {
                stringData += this.currentChar;

                this.advance();
            }

            if (KEY_WORD.includes(stringData)) {
                this.result.push({
                    type: stringData,
                });
            } else {
                this.result.push({
                    type: 'variable',
                    value: stringData,
                });
            }
        }

        if (code === 61) {
            this.result.push({
                type: EQ,
            });
        }
        return this.parse();
    }
}
const a = new Token('let a = 1 + 12*12- 2 * 4+6');
console.log(a.parse(), '=result');