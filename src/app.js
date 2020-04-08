const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  console.log('criar');
  const { title, url, techs} = request.body;
  const repository = { 
    id:uuid(), 
    title, 
    url,
    techs,
    likes : 0
   }
   repositories.push(repository);
   return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  const repository = repositories.find(rep => rep.id === id);
  if(!repository){
    return response.status(400).send();
  }else{
    const { title, url, techs} = request.body;
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
    return response.json(repository);
  }

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if(repositoryIndex < 0){
    return res.status(400).send();
  }else{
    repositories.splice(repositoryIndex, 1)
    return res.status(204).send();
  }

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;
  const repository = repositories.find(rep => rep.id === id);
  if(!repository){
    return response.status(400).send();
  }else{
    repository.likes += 1;
    return response.json(repository);
  }

});

module.exports = app;
