import './style.scss'
import Task from './task.js'
import Project from './project.js'
import ProjectHandler from './handler.js'
import domHandler from './dom.js'

const projectsHandler = new ProjectHandler();
const todo = projectsHandler.createProject('To do');
const proj = projectsHandler.createProject('Foo');
const whtvr = projectsHandler.createTask('Doo', 'Do whatever', false, '14/12/2023', 2, 'fdsfdsfds');

const handlerDOM = new domHandler();
handlerDOM.renderProjectsList();
handlerDOM.setListeners();


export { projectsHandler };
