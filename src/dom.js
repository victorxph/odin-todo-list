import Project from './project.js';

export default class domHandler {

	projectDiv = document.querySelector('.projects');
	projectList = document.querySelector('.project-list');

	addProjectBtn = document.querySelector('.add-project');

	main = document.querySelector('main')

	projectModal = document.querySelector('.project-modal');
	closePjModal = document.querySelector('.close-dialog');
	submitProjectBtn = document.querySelector('.add-pj-btn')
	projectNameInput = document.querySelector('.pj-name-input');

	setListeners(callCase) {
		this.addProjectBtn.addEventListener('click', this.openProjectModal.bind(this))
		this.closePjModal.addEventListener('click', this.closeProjectModal.bind(this))

		if (callCase == 'openModal') {
			this.submitProjectBtn.addEventListener('click', function() {
				console.log(this.projectNameInput)
				this.addProject(this.projectNameInput.value)
			}.bind(this))
		}
	}

	openProjectModal() {
		this.projectModal.style.display = 'flex';
		this.projectModal.style.flexDirection = 'column';
		this.projectModal.style.justifyContent = 'space-between';
		this.projectModal.showModal();
		this.closePjModal = document.querySelector('.close-dialog');
		this.projectModal.addEventListener('keydown', function(e) {
			if (e.key == 'Escape' || e.keyCode == 27) {
				this.projectModal.style.display = '';
				this.projectModal.style.flexDirection = '';
				this.projectModal.style.justifyContent = '';

				this.projectModal.close()
			} else if (e.key == 'Enter' && this.projectNameInput == '') {
				this.projectModal.style.display = '';
				this.projectModal.style.flexDirection = '';
				this.projectModal.style.justifyContent = '';

				this.projectModal.close()
			}
		}.bind(this))
		this.setListeners('openModal')
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
		projectCard.innerHTML = `<h2 class="project-name">${project.name}</h2>
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
	}
}
