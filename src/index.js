import './style.scss'
import Task from './task.js'
import Project from './project.js'
import ProjectHandler from './handler.js'

const handler = new ProjectHandler();
const todo = handler.createProject('To do');

const proj = handler.createProject('Fodase');
const proj1 = handler.createProject('Fuck');
const whtvr = handler.createTask('Fuck', 'Do whatever', false, '14/12/2023', 2, 'fdsfdsfds');
// handler.moveTask(proj.tasks[0], proj1)
// console.log(proj.tasks[0])
