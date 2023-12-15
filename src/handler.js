import Project from './project';
import Task from './task';

export default class ProjectHandler {
	constructor() {
		this.projects = []
	}

	createProject(name) {
		const project = new Project(name);
		this.projects.push(project);
		return project
	}

	createTask(project, content, date, priority, notes) {
		const task = new Task(project, content, date, priority, notes);
	}

	pushTask(task, project) {
		project.tasks.push(task)
		console.log(`${task} added to ${project}`)
	}
};
