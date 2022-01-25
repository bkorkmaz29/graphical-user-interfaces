import { v4 as uuid } from 'uuid';
import { writeFile, readFile } from 'fs';

let projects = {projects: []};
const path = './projects.json';

readFile(path, function (err, data) {
    var json = JSON.parse(data)
   projects = json;
})

const writeProjects = () => {

    writeFile(path, JSON.stringify(projects, null, 2), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

}

export const getProjects = (req, res) => {
  
    res.send(projects);
}

export const createProject = (req, res) => {   
    const project = req.body;
    projects.projects.push({...project, id: uuid()});
    
    writeProjects();
};

export const getProject = (req, res) => {
    res.send(req.params.id)
};

export const deleteProject = (req, res) => { 
    projects = projects.filter((project) => project.id !== req.params.id);
    writeProjects();
};

export const updateProject =  (req,res) => {
    const project = projects.find((project) => project.id === req.params.id);
    
    project.code = req.body.code;
    project.name = req.body.name;
    project.manager = req.body.manager;
    project.budget = req.body.budget;  

    writeProjects();
};

