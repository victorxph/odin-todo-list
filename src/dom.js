import Project from './project.js';

export default class domHandler {

	projectDiv = document.querySelector('.projects');
	projectList = document.querySelector('.project-list');

	addProjectBtn = document.querySelector('.add-project');

	main = document.querySelector('main')

	setListeners() {
		this.addProjectBtn.addEventListener('click',)
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
