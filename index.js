class ExecutionOrder {
	constructor() { }
	// Method for structured Input data
	getStructuredInput(inputDependency) {
		var dependency = [];
		inputDependency.forEach(el => {
			dependency.push(el.split(' => '));
		})
		return dependency;
	}
	// Method for checking cyclic dependency in execution order
	isCyclicDependency(dependency) {
		var checked = {};
		for (var i = 0; i < dependency.length; i++) {
			if (checked.hasOwnProperty(dependency[i][1])) {
				let isDependency = true;
				for (var j = i - 1; j >= 0; j--) {
					if (dependency[j][1] == dependency[j + 1][0] && dependency[j][0] == dependency[j - 1][1] && isDependency) {
						return true;  // cyclic dependency
					}
					(dependency[j][1] == dependency[j + 1][0] && isDependency) ? isDependency = true : isDependency = false;
					if((j == 0) && dependency[j][0] == dependency[i][1] && isDependency){
						return true;  // cyclic dependency
					}
				}
				return false;
			}
			checked[dependency[i][0]] = dependency[i][1];
		}
		return false; // open node
	}
	// traverse data
	traversal(inputTask, inputDependency) {
		var dependency = (inputDependency.length != 0) && this.getStructuredInput(inputDependency);
		var executionOrder = [];
		var linkedNode = {};
		for (var i = 0; i < dependency.length; i++) {
			if (linkedNode.hasOwnProperty(dependency[i][0])) {
				linkedNode[dependency[i][0]].push(dependency[i][1]);
			} else {
				linkedNode[dependency[i][0]] = [dependency[i][1]];
			}
		}

		if (this.isCyclicDependency(dependency)) {
			return ["Error - this is a cyclic dependency"];
		}

		var initialIndex = 0;
		var stack = inputTask.length>0?[inputTask[initialIndex]]:[];
		var checked = new Set();
		checked.add(inputTask[initialIndex]); //set first node as checked
		// continue check till stack gets empty
		while (stack.length != 0) {
			var currentnode = stack.pop();
			// searching nodes on which current node is connected
			if (linkedNode.hasOwnProperty(currentnode)) {
				linkedNode[currentnode].filter(n => !checked.has(n))
					.forEach(n => {
						!executionOrder.includes(n) && checked.add(n);
						stack.push(n);
					});
			} else {
				executionOrder = [...executionOrder, ...[...checked].reverse()];
				checked = new Set();
				(currentnode == inputTask[initialIndex + 1]) ? initialIndex = initialIndex + 2 : initialIndex++;
				if (inputTask[initialIndex] != undefined && executionOrder.length < inputTask.length) {
					stack.push(inputTask[initialIndex]);
					if ((!executionOrder.includes(inputTask[initialIndex]) && inputTask.indexOf(inputTask[initialIndex]) == initialIndex) || (initialIndex >= (executionOrder.length - 1) && inputTask.indexOf(inputTask[initialIndex]) != initialIndex)) {
						checked.add(inputTask[initialIndex]);
					}
				}
			}
		}
		return executionOrder;
	}
}
module.exports = ExecutionOrder;