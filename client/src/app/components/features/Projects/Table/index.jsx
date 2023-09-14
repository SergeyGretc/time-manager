import React from "react";
import TableThead from "./TableThead";
import TableRow from "./TableRow";

const Table = ({
  getAllProjects,
  handleTaskEditor,

  handleRemoveTask,
}) => {
  return (
    <table class="table">
      <TableThead />
      <tbody>
        {getAllProjects.map((project, i) => (
          <TableRow
            project={project}
            handleTaskEditor={handleTaskEditor}
            i={i}
            handleRemoveTask={handleRemoveTask}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
