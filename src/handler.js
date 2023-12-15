import Project from './project';
import Task from './task';

export default class ProjectHandler {
	constructor() {
		this.projects = []
	}

	matchProject(task) {
		let matchedProject = null;
		this.projects.forEach((project) => {
			// console.log(task.projectName)
			// console.log(project)
			if (task.projectName == project.name) {
				matchedProject = project
			}
		})
		return matchedProject
	}

	createProject(name) {
		const project = new Project(name);
		this.projects.push(project);
		return project
	}

	createTask(projectName, content, completed, date, priority, notes) {
		const task = new Task(projectName, content, completed, date, priority, notes);
		const project = this.matchProject(task)
		project ? this.pushTask(task, project) : this.pushTask(task, this.projects[0])
		console.log(project)

		return task
	}

	pushTask(task, project) {
		project.tasks.push(task)
	}

	moveTask(task, project) {
		const currentProject = task.project;
		console.log(currentProject)
		// const index = currentProject.tasks.indexOf(task)
		// project.tasks.push(task)
		// currentProject.tasks.splice(index, 1);
	}
};
