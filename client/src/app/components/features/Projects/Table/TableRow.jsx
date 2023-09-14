import React from "react";
import iconTrash from "../../../../assets/icons/trash.svg";
import iconRedact from "../../../../assets/icons/redact.svg";
const TableRow = ({ project, handleRemoveTask, handleTaskEditor, i }) => {
  return (
    <tr className="align-middle">
      <th scope="row">{i + 1}</th>
      <td>{project.projectName}</td>
      <td>{project.level}</td>
      <td>
        {project.priority === "no"
          ? "Можно отложить на потом"
          : "Нужно выполнить пораньше"}
      </td>
      <td className="text-end">
        <button
          className="btn btn-primary me-3"
          onClick={() => handleTaskEditor(project._id)}
        >
          <div className="d-flex justify-content-center">
            <img src={iconRedact} alt="trash" />
            Редактировать
          </div>
        </button>
        <button
          className=" btn btn-outline-danger"
          onClick={() => handleRemoveTask(project._id)}
        >
          <div className="d-flex justify-content-center">
            <img src={iconTrash} alt="trash" />
            Удалить
          </div>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
