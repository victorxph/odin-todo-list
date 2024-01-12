import './style.scss'
import Task from './task.js'
import Project from './project.js'
import ProjectHandler from './handler.js'
import domHandler from './dom.js'

const projectsHandler = new ProjectHandler();
const handlerDOM = new domHandler();

const todo = projectsHandler.createProject('To do');
const proj = projectsHandler.createProject('Foo');
const task1 = projectsHandler.createTask('Foo', 'Do whatever', false, '2023-12-14', 2, 'fdsfdsfds');
projectsHandler.pushTask(task1, task1.project)
const task3 = projectsHandler.createTask('Foo', 'Do this', true, '2023-12-14', 1, 'somesomesome');
projectsHandler.pushTask(task3, task3.project)
const task2 = projectsHandler.createTask('Foo', 'Do some', false, '2024-11-24', 1, 'somesomesome');
projectsHandler.pushTask(task2, task2.project)

const task4 = projectsHandler.createTask('To do', 'Do some', false, '2024-11-24', 1, 'somesomesome');
projectsHandler.pushTask(task4, task4.project)
const task5 = projectsHandler.createTask('To do', 'Do whatever', false, '2023-12-14', 2, 'fdsfdsfds');
projectsHandler.pushTask(task5, task5.project)
const task6 = projectsHandler.createTask('To do', 'Do this', true, '2024-03-02', 1, 'somesomesome');
projectsHandler.pushTask(task6, task6.project)

handlerDOM.renderProjectsList();
handlerDOM.focusHome();
handlerDOM.setListeners();

export { projectsHandler };
