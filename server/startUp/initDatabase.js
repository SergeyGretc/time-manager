const Projects = require("../models/projects");
const projectsMock = require("../mock/projects.json");

module.exports = async () => {
  const projects = await Projects.find();

  if (projects.length !== projectsMock.length) {
    await createInitialEntity(Projects, projectsMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
