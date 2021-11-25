/* 
var allArrays = [
  ['1', '2', '3'],
  ['4', '5', '6'],
]

function allPossibleCases(arr) {
  if (arr.length == 1) {
    return arr[0];
  } else {
    const result = [];
    const allCasesOfRest = allPossibleCases(arr.slice(-1)); // recur with the rest of array

    for (let i = 0; i < allCasesOfRest.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        result.push(allCasesOfRest[i] + arr[0][j]);
      }
    }

    return result;
  }

}

console.log(allPossibleCases(allArrays.reverse()))
 */

/* 
var getNodeVisibleState = node => {
    return {
        id: node.id,
        name: node.name,
        visible: node.visible
    };
};
​
var getNodeRecursiveVisibleState = node => {
    var { id, name, visible } = getNodeVisibleState(node);
​
    if(!node.children) {
        return;
    }
    
    return {
        id,
        name,
        visible,
        children: node.children.filter(node => node.visible === true).map(getNodeVisibleState)
    };
}
*/
