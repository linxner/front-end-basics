
//    [{ value: '0', label: '吃饭' },
//     { value: '1', label: '上班' },
//     { value: '2', label: '回家' },
//     { value: '3', label: '睡觉' }]

//     转换为：

//    {'0': '吃饭',
//     '1': '上班',
//     '2': '回家',
//     '3': '睡觉'}

function transformOptionListToObject(data, keyStr, valStr) {
    data.reduce((p, n) => {
        if (n) {
            return {
                ...p,
                [n[keyStr]]: n[valStr],
            };
        }
        return p;
    }, {});
}