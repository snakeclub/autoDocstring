
export function getFunctionName(functionDefinition: string): string {
    //let pattern = /(?:def|class)\s+(\w+)\s*\(/;
    let pattern = /(?:def|class)\s+(\w+)\s*[\(:]/;  //应对类没有值的情况

    let match = pattern.exec(functionDefinition);

    if (match == undefined || match[1] == undefined) {
        // TODO : 再判断一次是否变量，后续应该优化为正则表达式的做法
        let tempArray: string[] = functionDefinition.split("\n");
        for (let i = tempArray.length - 1; i >= 0; i--) {
            let tempstring = tempArray[i].trim();
            if (tempstring == "") {
                continue;
            }
            else if (tempstring[0] == "'" || tempstring[0] == '"' || tempstring[0] == "#") {
                continue;
            }
            else {
                // 找等号
                let index = tempstring.indexOf("=");
                if (index > 0) {
                    return tempstring.substring(0, index).trim();
                }
                return "";
            }
        }
        return "";
    };

    return match[1]
}
