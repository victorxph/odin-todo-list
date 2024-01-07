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

	matchProject(input) {
		let matchedProject = null;

		if(input.project){
			const task = input;
			this.projects.forEach((project) => {
				if (task.project == project.name) {
					matchedProject = project
				}
			})
		}
		
		this.projects.forEach(project =>{
			if (input == project.name){
				matchedProject = project
			}
		})

		if(!matchedProject){
			matchedProject = this.projects[0]
		}

		return matchedProject
	}

	createTask(projectName, content, check, date, priority, notes) {
		const task = new Task(projectName, content, check, date, priority, notes);
		// const project = this.matchProject(task)
		
		return task
	}

	pushTask(task, projectName) {
		let project = this.matchProject(projectName);

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
