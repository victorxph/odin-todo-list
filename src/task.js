export default class Task {
	constructor(projectName, content, completed, date, priority, notes) {
		this.projectName = projectName;
		this.content = content;
		this.completed = completed;
		this.date = date;
		this.priority = priority;
		this.notes = notes;
	}

	dom = {
		check: null,
		content: null,
		dueDate: null,
		edit: null,
		trash: null,
		card: {
			checkbox: null,
			span: null,
		}
	}
}
