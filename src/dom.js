import Project from './project.js';

export default class domHandler {

	projectDiv = document.querySelector('.projects');
	projectList = document.querySelector('.project-list');

	addProjectBtn = document.querySelector('.add-project');

	main = document.querySelector('main');

	projectModal = document.querySelector('.project-modal');
	closePjModal = document.querySelector('.close-dialog');
	submitProjectBtn = document.querySelector('.add-pj-btn')
	projectNameInput = document.querySelector('.pj-name-input');

	capitalize(str) {
		if (typeof str !== 'string' || str.length == 0) {
			return str
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

		this.submitProjectBtn.addEventListener('click', function() {
			console.log(this.projectNameInput)
			this.addProject(this.projectNameInput.value)
		}.bind(this))
	}

	openProjectModal() {
		this.projectModal.style.display = 'flex';
		this.projectModal.style.flexDirection = 'column';
		this.projectModal.style.justifyContent = 'space-between';
		this.projectModal.showModal();
		this.closePjModal = document.querySelector('.close-dialog');
	}

	closeProjectModal() {
		this.projectModal.style.display = '';
		this.projectModal.style.flexDirection = '';
		this.projectModal.style.justifyContent = '';
		this.projectModal.close()
	}

	addProject(name) {
		const project = new Project(name);
		const projectCard = document.createElement('div');
		projectCard.classList.add('project-card');
		projectCard.innerHTML = `<h2 class="project-name">${this.capitalize(project.name)}</h2>
					<ul class="card-task-list">
						<li>
							<input type="checkbox" name="task-check" id="task-check">
							<span class="task-content">Lorem ipsum dolor sit amet consectetur adipisicing elit..</span>
						</li>
						<li>
							<input type="checkbox" name="task-check" id="task-check">
							<span class="task-content">Lorem ipsum dolor sit amet consectetur adipisicing elit..</span>
						</li>
						<li>
							<input type="checkbox" name="task-check" id="task-check">
							<span class="task-content">Lorem ipsum dolor sit amet consectetur adipisicing elit..</span>
						</li>
						<li>
							<input type="checkbox" name="task-check" id="task-check">
							<span class="task-content">Lorem ipsum dolor sit amet consectetur adipisicing elit..</span>
						</li>
					</ul>
				<button type="button"><img width="30" height="30"
					src="https://img.icons8.com/material-rounded/512/d4d4d4/plus-math--v1.png"
					alt="plus-math--v1" /></button>`
		this.main.appendChild(projectCard);
		this.projectNameInput.value = '';
		this.closeProjectModal();
	}
}
