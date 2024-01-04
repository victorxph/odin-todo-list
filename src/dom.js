import { projectsHandler } from './index.js'

class Page {
	constructor(name) {
		this.name = name;
	}

	eventListenerMap = new WeakMap();

	showMap() {
		console.log(this.eventListenerMap);
	}
}

export default class domHandler {
	mainPage = new Page('mainPage');

	focusedProject = null;

	homeBtn = document.querySelector('.home-btn');

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

	addListener(element, type, listener, map) {
		if (!map.has(element)) {
			map.set(element, new Map());
		}

		if (!map.get(element).has(type)) {
			element.addEventListener(type, listener);
			map.get(element).set(type, listener);
		}
	}

	removeListener(element, type, map) {
		if (map.has(element)) {
			const listener = map.get(element).get(type);
			if (listener) {
				element.removeEventListener(type, listener);
				map.get(element).delete(type);
			}
		}
	}

	setListeners(callCase) {
		switch (callCase) {
			case 'renderProjectsCards':
				projectsHandler.projects.forEach((project, index) => {
					// console.log(project, index)
					this.addListener(project.dom.card.addTaskBtn, 'click', this.openTaskModal.bind(this), this.mainPage.eventListenerMap)
				})
			return;
			case 'renderProjectsList':
				projectsHandler.projects.forEach((project) => {
					this.addListener(project.dom.listItem, 'click', this.focusProject.bind(this, project), this.mainPage.eventListenerMap)
					// project.dom.listItem.addEventListener('click', this.focusProject.bind(this, project))
				})
			return;
		}
		console.log('well well well')
		this.homeBtn.addEventListener('click', this.focusHome.bind(this))

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

		if (this.mainDiv.classList.contains('project-focused') && this.focusedProject != null) {
			this.focusedProject.tasks.forEach(task => {
				task.dom.edit.addEventListener('click', () => {
					console.log(task)
				})
			})
		}
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
			project.dom.listItem = listItem;
			this.projectList.appendChild(listItem);
		})
		this.setListeners('renderProjectsList')
	}

	focusHome() {
		this.mainDiv.classList.remove('project-focused')
		this.mainDiv.innerHTML = '';
		this.renderProjectsCards();
	}

	renderProjectsCards() {
		projectsHandler.projects.forEach((project) => {
			const quoteless = project.name.replace(/["']/g, '');

			const projectCard = document.createElement('div');
			projectCard.classList.add('project-card');
			project.dom.card.container = projectCard;
			this.mainDiv.appendChild(projectCard);

			const projectTitle = document.createElement('h2');
			projectTitle.classList.add('project-name');
			projectTitle.textContent = `${quoteless}`
			project.dom.title = projectTitle;
			projectCard.appendChild(projectTitle);

			const taskList = document.createElement('ul');
			taskList.classList.add('card-task-list');
			taskList.id = project.name;
			project.dom.taskList = taskList;
			projectCard.appendChild(taskList);

			const addTaskBtn = document.createElement('button');
			addTaskBtn.classList.add('add-task-btn');
			addTaskBtn.type = 'button';
			addTaskBtn.innerHTML = `<img width="30" height="30"
			src = "https://img.icons8.com/material-rounded/512/d4d4d4/plus-math--v1.png"
			alt = "plus-math--v1" />`
			project.dom.card.addTaskBtn = addTaskBtn;
			projectCard.appendChild(addTaskBtn);

			this.mainDiv.appendChild(projectCard);
			this.renderTaskList(project, taskList);
		});
		this.setListeners('renderProjectsCards')
	}

	renderTaskList(passedProject, listElement) {
		projectsHandler.projects.forEach(project => {
			if (passedProject.name == project.name) {
				project.tasks.forEach((task, index) => {
					const taskLi = document.createElement('li');
					listElement.appendChild(taskLi);
					project.dom.card.tasks.push(taskLi);

					const taskCheck = document.createElement('input');
					taskCheck.type = 'checkbox';
					taskCheck.name = 'task-check';
					const checkId = 'check' + index;
					taskCheck.id = checkId;
					taskLi.appendChild(taskCheck);
					task.dom.card.checkbox = taskCheck;

					const taskLabel = document.createElement('label');
					taskLabel.classList.add('task-content');
					taskLabel.textContent = task.content;
					taskLabel.setAttribute('for', `${checkId}`);
					taskLi.appendChild(taskLabel);
					task.dom.card.span = taskLabel;
				})
			}
		})
	}

	openTaskModal() {
		this.taskModal.classList.remove('closed-modal')
		this.taskModal.showModal();
	}

	focusProject(project) {
		this.focusedProject = project;

		if (!this.mainDiv.classList.contains('project-focused')) {
			this.mainDiv.classList.add('project-focused');
		}
		this.mainDiv.innerHTML = `<div class= "container">
			<h1 class="project-title">${project.name}</h1>

			<ul class="project-task-list">
			</ul>

			<button class="add-task-btn" type="button"><img width="30" height="30"
				src="https://img.icons8.com/material-rounded/512/d4d4d4/plus-math--v1.png" alt="plus-math--v1" />
			</button>
		</div >`
		this.renderTasks(project);
		this.setListeners();
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
