export default class Project {
	constructor(name) {
		this.name = name
	}

	tasks = []

	dom = {
		listItem: null,
		title: null,
		tasks: [],
		taskList: null,
		addTaskBtn: null,
		card: {
			container: null,
			title: null,
			tasks: [],
			addTaskBtn: null,
		}
	}
}
