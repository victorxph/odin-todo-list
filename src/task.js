export default class Task {
	constructor(projectName, content, completed, date, priority, notes) {
		this.projectName = projectName;
		this.content = content;
		this.completed = completed;
		this.date = date;
		this.priority = priority;
		this.notes = notes;
	}
}
