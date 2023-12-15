import './style.scss'
import Task from './task.js'
import Project from './project.js'
import ProjectHandler from './handler.js'

const handler = new ProjectHandler();
const proj = handler.createProject('Fodase');
const whtvr = new Task('Fodase', 'Do whatever', '14/12/2023', 2, 'fdsfdsfds');

