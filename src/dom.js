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

	submitTaskButton = document.querySelector('.submit-task-btn');
	taskInputs = {
		content: document.querySelector('.task-content-input'),
		project: document.querySelector('.task-project-input'),
		check: false,
		priority: document.querySelector('.task-priority-input'),
		date: document.querySelector('.task-due-date-input'),
		notes: document.querySelector('.task-notes-input'),
	}

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
					this.addListener(project.dom.card.addTaskBtn, 'click', this.openTaskModal.bind(this, project), this.mainPage.eventListenerMap)
				})
			return;

			case 'renderProjectsList':
				projectsHandler.projects.forEach((project) => {
					this.addListener(project.dom.listItem, 'click', this.focusProject.bind(this, project), this.mainPage.eventListenerMap)
				})
			return;

			case 'focusProject':
				// this.focusedProject.tasks.forEach(task => {
				// 	// this.addListener(task.dom.check)
				// 	// this.addListener(task.dom.edit)
				// 	// this.addListener(task.dom.trash)
				// 	console.log(task)
				// })

				console.log(this.focusedProject)
				this.addListener(this.focusedProject.dom.addTaskBtn, 'click', this.openTaskModal.bind(this, this.focusedProject), this.mainPage.eventListenerMap)
			return

			case 'addProject':
				projectsHandler.projects.forEach((project, index) => {
					// console.log(project, index)
					this.addListener(project.dom.card.addTaskBtn, 'click', this.openTaskModal.bind(this, project), this.mainPage.eventListenerMap)
				})
			return
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

		this.submitProjectBtn.addEventListener('click', function() {
			this.addProject(this.projectNameInput.value)
		}.bind(this))

		this.taskModal.addEventListener('keydown', function(e) {
			if (e.key == 'Escape' || e.keyCode == 27) {
				this.closeModal(e);
			}
		}.bind(this));

		this.submitTaskButton.addEventListener('click', () => {
			this.addTask(this.taskInputs.project, this.taskInputs.content, this.taskInputs.check, this.taskInputs.date, this.taskInputs.priority, this.taskInputs.notes)
		})

		//remove
		if (this.mainDiv.classList.contains('project-focused') && this.focusedProject != null) {
			this.focusedProject.tasks.forEach(task => {
				task.dom.edit.addEventListener('click', () => {
					console.log(task)
				})
			})
		}
	}

	addTask(project, content, check, date, priority, notes){
		console.log(project.value, content.value, check, date.value, priority.value, notes.value)
		const task = projectsHandler.createTask(project.value, content.value, check, date.value, priority.value, notes.value)
		projectsHandler.pushTask(task, project.value);
		const proj = projectsHandler.matchProject(project.value)
		console.log(proj, proj.dom.card.taskList)
		this.renderTaskList(proj, proj.dom.card.taskList)
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
		this.renderProjectsCards();
		this.setListeners('addProject');
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
		this.mainDiv.innerHTML = '';
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
			project.dom.card.taskList = taskList;
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
				listElement.innerHTML = ''
				console.log(project.tasks)
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

	openTaskModal(project) {
		this.taskInputs.project.innerHTML = '';
		projectsHandler.projects.forEach(project => {
			const option = document.createElement('option');
			option.value = project.name;
			option.textContent = project.name; 
			this.taskInputs.project.appendChild(option);
		})
		// console.log('btn from -', project.name)
		this.taskInputs.project.value = project.name;
		this.taskModal.classList.remove('closed-modal')
		this.taskModal.showModal();
	}

	focusProject(project) {
		this.focusedProject = project;

		if (!this.mainDiv.classList.contains('project-focused')) {
			this.mainDiv.classList.add('project-focused');
		}

		this.mainDiv.innerHTML = '';

		const container = document.createElement('div');
		container.classList.add('container');
		project.dom.container = container;
		this.mainDiv.appendChild(container);

		const projectTitle = document.createElement('h1');
		projectTitle.classList.add('project-title');
		projectTitle.textContent = project.name;
		container.appendChild(projectTitle);
		project.dom.title = projectTitle;

		const taskList = document.createElement('ul');
		taskList.classList.add('project-task-list');
		project.dom.taskList = taskList;
		container.appendChild(taskList);

		const addTaskBtn = document.createElement('button');
		addTaskBtn.classList.add('add-task-btn');
		addTaskBtn.type = 'button';
		addTaskBtn.innerHTML =`<img width="30" height="30" src="https://img.icons8.com/material-rounded/512/d4d4d4/plus-math--v1.png" alt="plus-math--v1" />`
		container.appendChild(addTaskBtn);
		project.dom.addTaskBtn = addTaskBtn;
		
		this.renderTasks(project);
		this.setListeners('focusProject');
	}

	renderTasks(project) {
		const taskList = document.querySelector('.project-task-list');

		project.tasks.forEach(task => {
			const todoItem = document.createElement('li');
			taskList.appendChild(todoItem);
			const taskDiv = document.createElement('div');
			taskDiv.classList.add('task');
			project.dom.tasks.push(todoItem);
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
