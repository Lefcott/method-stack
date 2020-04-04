const pathLastNDirs = (path, nDirs) => {
  const pathSplit = path.split('/');
  return (pathSplit.length > nDirs ? pathSplit.splice(pathSplit.length - nDirs) : pathSplit).join('/');
};

const get = () => {
  let firstOnlyPath = { line: null, col: null };

  return new Error().stack
    .split('\n')
    .map((line, index) => {
      if (index <= 2) {
        return { method: '<ignoreThis>' };
      }
      const cutted = line.substring(line.indexOf('at') + 3);
      const splitted = cutted.split(':');
      let methodOrFile = cutted.substring(
        0,
        cutted.includes(' ') ? cutted.indexOf(' ') : cutted.indexOf(':')
      );
      let lineNum = parseInt(splitted[splitted.length - 2], 10) || 'Unknown';
      let colNum = parseInt(splitted[splitted.length - 1], 10) || 'Unknown';
      if (methodOrFile.includes('/')) {
        methodOrFile = '<ignoreThis>';
        firstOnlyPath.line = firstOnlyPath.line || lineNum;
        firstOnlyPath.col = firstOnlyPath.col || colNum;
      } else {
        lineNum = firstOnlyPath.line || lineNum;
        colNum = firstOnlyPath.col || colNum;
        firstOnlyPath = { line: null, col: null };
      }
      const splittedMethod = methodOrFile.split('.');
      return {
        file: /\(|\)/.test(line)
          ? pathLastNDirs(
              line.substring(line.indexOf('(') + 1, line.lastIndexOf(')')).replace(/:[0-9]+:[0-9]+$/, ''),
              2
            )
          : 'Unknown',
        method: splittedMethod[splittedMethod.length - 1],
        line: lineNum,
        col: colNum
      };
    })
    .filter(obj => !/<ignoreThis>|\//.test(obj.method));
};

const getCaller = (offset = 0) => get()[offset + 1];

module.exports = { get, getCaller };
