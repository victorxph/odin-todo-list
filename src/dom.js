import { projectsHandler } from './index.js'

export default class domHandler {

	projectsDiv = document.querySelector('.projects');
	projectList = document.querySelector('.project-list');

	addProjectBtn = document.querySelector('.add-project');

	mainDiv = document.querySelector('main');

	projectModal = document.querySelector('.project-modal');
	closeModalBtn = Array.from(document.querySelectorAll('.close-dialog'));
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

		this.closeModalBtn.forEach((button) => {
			button.addEventListener('click', function(e) {
				this.closeModal(e)
			}.bind(this))
		})

		this.projectModal.addEventListener('keydown', function(e) {
			if (e.key == 'Escape' || e.keyCode == 27) {
				this.closeModal(e);
			} else if (!this.projectNameInput.value && (e.key == 'Enter' || e.keyCode == 13)) {
				e.preventDefault();
				this.closeModal(e);
			} else if (this.projectNameInput.value && (e.key == 'Enter' || e.keyCode == 13)) {
				e.preventDefault();
				this.addProject(this.projectNameInput.value)
			}
		}.bind(this))

		this.addTaskBtns.forEach((button) => {
			button.addEventListener('click', function() {
				this.openTaskModal();
			}.bind(this))
		})

		this.taskModal.addEventListener('keydown', function(e) {
			if (e.key == 'Escape' || e.keyCode == 27) {
				this.closeModal(e);
			}
		}.bind(this));

		this.submitProjectBtn.addEventListener('click', function() {
			console.log(this.projectNameInput)
			this.addProject(this.projectNameInput.value)
		}.bind(this))

		projectsHandler.projects.forEach((project) => {
			project.listItem.addEventListener('click', this.focusProject.bind(this, project))
		})
	}

	openProjectModal() {
		this.projectModal.classList.remove('closed-modal')
		this.projectModal.showModal();
	}

	closeModal(e, modal) {
		let dialog;
		if (e.target) {
			dialog = e.target.closest('dialog')
		} else {
			dialog = modal
		}
		dialog.classList.add('closed-modal');
		dialog.close()
	}

	addProject(name) {
		const project = projectsHandler.createProject(name);
		console.log(projectsHandler.projects);
		this.addTaskBtns = Array.from(document.querySelectorAll('.add-task-btn'));
		this.projectList.innerHTML = ''
		this.renderProjectsList();
		this.setListeners();
		this.projectNameInput.value = '';
		this.closeModal(false, this.projectModal);
	}

	renderProjectsList() {
		projectsHandler.projects.forEach((project) => {
			const listItem = document.createElement('li');
			listItem.innerHTML = `${this.capitalize(project.name)}`
			project.listItem = listItem;
			this.projectList.appendChild(listItem);
		})
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
		this.taskModal.classList.remove('closed-modal')
		this.taskModal.showModal();
	}

	focusHome() {
		this.mainDiv.innerHTML = '';
		projectsHandler.projects.forEach()
	}

	focusProject(project) {
		if (!this.mainDiv.classList.contains('project-focused')) {
			this.mainDiv.classList.add('project-focused');
		}
		this.mainDiv.innerHTML = `
		<div class="container">
			<h1 class="project-title">${project.name}</h1>

			<ul class="project-task-list">
			</ul>

			<button class="add-task-btn" type="button"><img width="30" height="30"
					src="https://img.icons8.com/material-rounded/512/d4d4d4/plus-math--v1.png" alt="plus-math--v1" />
			</button>
		</div>`
		this.renderTasks(project);
	}

	renderTasks(project) {
		const taskList = document.querySelector('.project-task-list');

		project.tasks.forEach(task => {
			const todoItem = document.createElement('li');
			taskList.appendChild(todoItem);
			const taskDiv = document.createElement('div');
			taskDiv.classList.add('task');
			todoItem.appendChild(taskDiv);

			const taskCheck = document.createElement('input');
			task.dom.check = taskCheck;
			taskCheck.setAttribute('type', 'checkbox');
			taskCheck.setAttribute('name', 'task-check');
			taskCheck.classList.add('task-check');
			taskDiv.appendChild(taskCheck);

			const taskContent = document.createElement('label');
			taskContent.setAttribute('for', 'task-check');
			taskContent.classList.add('task-content');
			taskContent.innerText = task.content
			task.dom.content = taskContent;
			taskDiv.appendChild(taskContent);

			const dueDate = document.createElement('span');
			dueDate.classList.add('due-date');
			dueDate.innerText = task.date
			task.dom.dueDate = dueDate;
			todoItem.appendChild(dueDate);

			const editBtn = document.createElement('img');
			editBtn.src = 'images/square-edit-outline.svg';
			editBtn.setAttribute('alt', 'Edit task button');
			task.dom.edit = editBtn;
			todoItem.appendChild(editBtn);

			const deleteBtn = document.createElement('img');
			deleteBtn.src = 'images/delete.svg';
			deleteBtn.setAttribute('alt', 'Edit task button');
			task.dom.trash = deleteBtn;
			todoItem.appendChild(deleteBtn);
		});
	}

}
