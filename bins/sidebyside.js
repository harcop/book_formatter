const fs = require('fs');

const args = process.argv;
function processFile (args) {
    args.splice(0, 2)
    let _s = 0;
    let _c = 2;
    if (args.includes('-c')) {
        let idx = args.indexOf('-c');
        let _cs = idx + 1;
        _c = args[_cs];
        args.splice(idx, 2);
    }
    if (args.includes('-s')) {
        let idx = args.indexOf('-s');
        let _ss = idx + 1;
        _s = args[_ss];
        args.splice(idx, 2);
    }
    if (args.length === 0) {
        return;
    }
    let files = args;
    let f = [];
    let j = 0;
    let _space = [];
    for (let file of files) {
        const ctx = fs.readFileSync(file).toString().split('\n');
        let _maxW = _s;
        if (_s === 0) {
            for(let c of ctx) {
                _maxW = c.length > _maxW ? c.length : _maxW;
            }
        }
        _space.push(Number(_maxW) + Number(_c));
        let i = 0;
        for(let c of ctx) {
            if (f[i] === undefined) {
                let k = j*_maxW
                if (k > 0) {
                    // let _m = Number(k) + Number(_c);
                    // f.push(' '.repeat(_m));
                    let _j = j;
                    let _sp = 0;
                    while(_j > 0) {
                        _j -= 1;
                        _sp += _space[_j]
                    }
                    f.push(' '.repeat(_sp));
                } else {
                    f.push('');
                }
            }
            if (c.length === 0) {
                f[i] += ' '.repeat(_maxW);
                
                if (j !== files.length - 1) {
                    f[i] += ' '.repeat(_c);
                }
                i += 1;
            }
            while (c.length > 0) {
                let ch = c.substr(0, _maxW);
                c = c.substr(_maxW);
                if (ch.length < _maxW) {
                    ch += ' '.repeat(_maxW - ch.length);
                }
                if (j !== files.length - 1) {
                    ch += ' '.repeat(_c);
                }
                if (f[i] === undefined) {
                    let k = j*_maxW
                    if (k > 0) {
                        // let _m = Number(k) + Number(_c);
                        // f.push(' '.repeat(_m));
                        let _j = j;
                        let _sp = 0;
                        while(_j > 0) {
                            _j -= 1;
                            _sp += _space[_j]
                        }
                        f.push(' '.repeat(_sp));
                    } else {
                        f.push('');
                    }
                }
                f[i] += ch;
                i += 1;
            }
        }
        j += 1;
    }
    // console.log(f)
    let _f = '';
    let ttl = f[0].length;
    for(let ff of f) {
        let lng = ff.length;
        let pad = 0;
        if (lng < ttl) {
            pad = ttl - lng;
            console.log(pad, 'pad');
        }
        _f += `${ff}` + ' '.repeat(pad) + '\n';
    };
    console.log(_f.substring(0, _f.length-1))
    return _f
}

processFile(process.argv);