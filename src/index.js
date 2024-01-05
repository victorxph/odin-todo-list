import './style.scss'
import Task from './task.js'
import Project from './project.js'
import ProjectHandler from './handler.js'
import domHandler from './dom.js'

const projectsHandler = new ProjectHandler();
const todo = projectsHandler.createProject('To do');
const proj = projectsHandler.createProject('Foo');
const task1 = projectsHandler.createTask(proj, 'Do whatever', false, '14/12/2023', 2, 'fdsfdsfds');
const task3 = projectsHandler.createTask(proj, 'Do this', true, '02/03/2024', 1, 'somesomesome');
const task2 = projectsHandler.createTask(proj, 'Do some', false, '24/11/2024', 1, 'somesomesome');

const task4 = projectsHandler.createTask(todo, 'Do some', false, '24/11/2024', 1, 'somesomesome');
const task5 = projectsHandler.createTask(todo, 'Do whatever', false, '14/12/2023', 2, 'fdsfdsfds');
const task6 = projectsHandler.createTask(todo, 'Do this', true, '02/03/2024', 1, 'somesomesome');

const handlerDOM = new domHandler();
handlerDOM.focusHome();
handlerDOM.renderProjectsList();
handlerDOM.setListeners();

export { projectsHandler };
