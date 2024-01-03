export default class Project {
	constructor(name) {
		this.name = name
	}

	tasks = []

	dom = {
		listItem: null,
		card: null,
		title: null,
		taskList: null,
		addTaskBtn: null,
	}
}
