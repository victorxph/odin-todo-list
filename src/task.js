export default class Task {
	constructor(project, content, date, priority, notes) {
		this.project = project;
		this.content = content;
		this.date = date;
		this.priority = priority;
		this.notes = notes;
	}

	setProject(project) {
		this.project = project;
		console.log(project)
	}
}
