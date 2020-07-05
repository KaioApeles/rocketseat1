const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs, likes } = request.body;
  const project = {id: uuid(), title, url, techs, likes};

  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const projectIndex = repositories.findIndex( project => project.id === id );

  if( projectIndex < 0 ){
    return response.status(400).json({error: "Project not found"})
  }

  const project = {
    id: repositories[projectIndex].id,
    title: (title) ? title : repositories[projectIndex].title,
    url: (url) ? url : repositories[projectIndex].url,
    techs: (techs) ? techs : repositories[projectIndex].techs,
    likes: repositories[projectIndex].likes
  }  

  repositories[projectIndex] = project;

  return response.status(200).json(project);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const projectIndex = repositories.findIndex( project => project.id === id);

  if(projectIndex < 0){
    return response.status(400).json({error: "Project not Found"})
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const projectIndex = repositories.findIndex( project => project.id === id );

  if( projectIndex < 0 ){
    return response.status(400).json({error: "Project not found"});
  }

  // const { likes } = repositories[projectIndex];
  
  // const project = {...repositories[projectIndex], 
  //   likes: likes + 1
  // }    
  
  // const project = {
  //   id: id,
  //   title: repositories[projectIndex].title,
  //   url:   repositories[projectIndex].url,
  //   techs: repositories[projectIndex].techs,
  //   likes: likes + 1
  // }  

  // repositories[projectIndex] = project;

  repositories[projectIndex] = {
    ...repositories[projectIndex],
    likes: (repositories[projectIndex].likes + 1)
  }

  return response.status(200).json({likes: repositories[projectIndex].likes});
});

module.exports = app;
