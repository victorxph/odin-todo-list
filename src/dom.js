import Project from './project.js';
import ProjectHandler from './handler.js';
import { projectsHandler } from './index.js'

export default class domHandler {

	projectDiv = document.querySelector('.projects');
	projectList = document.querySelector('.project-list');

	addProjectBtn = document.querySelector('.add-project');

	mainDiv = document.querySelector('main');

	projectsDiv = document.querySelector('.projects');

	projectModal = document.querySelector('.project-modal');
	closePjModal = document.querySelector('.close-dialog');
	submitProjectBtn = document.querySelector('.add-pj-btn')
	projectNameInput = document.querySelector('.pj-name-input');

	addTaskBtns = Array.from(document.querySelectorAll('.add-task-btn'));

	taskModal = document.querySelector('.task-modal');

	capitalize(str) {
		if (typeof str !== 'string' || str.length == 0) {
			throw new Error("Invalid value for capitalization.")
		}

		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	setListeners() {
		this.addProjectBtn.addEventListener('click', this.openProjectModal.bind(this))
		this.closePjModal.addEventListener('click', this.closeProjectModal.bind(this))
		this.projectModal.addEventListener('keydown', function(e) {
			if (e.key == 'Escape' || e.keyCode == 27) {
				this.closeProjectModal();
			} else if (!this.projectNameInput.value && (e.key == 'Enter' || e.keyCode == 13)) {
				e.preventDefault();
				this.closeProjectModal();
			} else if (this.projectNameInput.value && (e.key == 'Enter' || e.keyCode == 13)) {
				e.preventDefault();
				this.addProject(this.projectNameInput.value)
			}
		}.bind(this))
		this.addTaskBtns.forEach((button) => {
			button.addEventListener('click', function() {
				// console.log(this)
				this.openTaskModal();
			}.bind(this))
		})

		this.submitProjectBtn.addEventListener('click', function() {
			console.log(this.projectNameInput)
			this.addProject(this.projectNameInput.value)
		}.bind(this))
	}

	openProjectModal() {
		this.projectModal.classList.remove('closed-modal')
		this.projectModal.showModal();
	}

	closeProjectModal() {
		this.projectModal.classList.add('closed-modal');
		this.projectModal.close()
	}

	addProject(name) {
		const project = projectsHandler.createProject(name);
		console.log(projectsHandler.projects);
		this.addTaskBtns = Array.from(document.querySelectorAll('.add-task-btn'));
		this.setListeners();
		this.projectNameInput.value = '';
		this.closeProjectModal();
	}

	renderProjects() {
		projectsHandler.projects.forEach((project) => {
			const projectCard = document.createElement('div');
			// const taskList = document.querySelector('.card-task-list');

			projectCard.classList.add('project-card');
			projectCard.innerHTML = `<h2 class="project-name">${this.capitalize(project.name)}</h2>
			<ul class="card-task-list">
			</ul>
			<button class="add-task-btn" type="button"><img width="30" height="30"
				src="https://img.icons8.com/material-rounded/512/d4d4d4/plus-math--v1.png"
				alt="plus-math--v1" />
			</button>`
			this.mainDiv.appendChild(projectCard);
		});
	}

	openTaskModal() {
		this.taskModal.classList.remove('closedModal')
		this.taskModal.showModal();
	}

	closeTaskModal() {
		this.taskModal.classList.add('closedModal');
		this.taskModal.close()
	}

	focusHome() {
		this.mainDiv.innerHTML = '';
		projectsHandler.projects.forEach()
	}

}
