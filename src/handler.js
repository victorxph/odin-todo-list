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

	matchProject(task) {
		let matchedProject = null;
		this.projects.forEach((project) => {
			if (task.project == project.name) {
				matchedProject = project
			}
		})

		return matchedProject
	}

	createTask(project, content, completed, date, priority, notes) {
		const task = new Task(project, content, completed, date, priority, notes);
		// const project = this.matchProject(task)
		project ? this.pushTask(task, project) : this.pushTask(task, this.projects[0])

		return task
	}

	pushTask(task, project) {
		project.tasks.push(task)
	}

	removeTask(task, project) {
		const index = project.tasks.indexOf(task);
		project.tasks.splice(index, 1)
	}

	moveTask(task, project) {
		const currentProject = this.matchProject(task);
		this.removeTask(task, currentProject);
		project.tasks.push(task)
	}
};
