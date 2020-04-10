const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const likes = 0;

  const repository = { id: uuid(), title, techs, url, likes };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex((rep) => rep.id === id);

  if (repositoryIndex < 0) {
    return response.status("400").json({ error: "Invalid repository ID." });
  }
  const { likes } = repositories[repositoryIndex];

  const repository = { id, title, url, techs, likes };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status("400").json({ error: "Invalid repository ID." });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status("204").send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status("400").json({ error: "Invalid repository ID." });
  }

  const { title, url, techs, likes: like } = repositories[repositoryIndex];
  const likes = like + 1;

  const repository = { id, title, url, techs, likes };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

module.exports = app;
