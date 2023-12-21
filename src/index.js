import './style.scss'
import Task from './task.js'
import Project from './project.js'
import ProjectHandler from './handler.js'
import domHandler from './dom.js'

const handler = new ProjectHandler();
const todo = handler.createProject('To do');

const proj = handler.createProject('Foo');
const whtvr = handler.createTask('Doo', 'Do whatever', false, '14/12/2023', 2, 'fdsfdsfds');

const handlerDOM = new domHandler();
handlerDOM.addProject('Foo');
handlerDOM.addProject('Baa');
