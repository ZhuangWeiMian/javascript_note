/**
 * 词法分析器 `1 + 12- 2 * 4+6`
 */
function generateToken(str) {
    let last = {
        value: '',
        type: null,
        next: null,
    };
    const res = [];
    const arr = str.split('');
    while (true) {
        const j = arr.shift();
        if (j === undefined) {
            res.push({
                type: last.type,
                value: last.value,
            });
            res.shift();
            return res;
        }

        const code = j.charCodeAt();
        if (code <= 57 && code >= 48) {
            if (last.type === 'number') {
                last.value += j;
            } else {
                res.push({
                    type: last.type,
                    value: last.value,
                });
                last.type = 'number';
                last.value = j;
            }
        }

        if (code === 42 || code === 47 || code === 45 || code === 43) {
            res.push({
                type: last.type,
                value: last.value,
            });
            last.type = 'opetator';
            last.value = j;
        }
    }
}

const a = generateToken('1 + 12*12- 2 * 4+6');
console.log(a, '=result');