import React from "react";

interface TableProps {
  data: Array<string>;
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Response</th>
        </tr>
      </thead>
      <tbody>
        {data.map((log, indx) => (
          <tr key={indx}>
            <td>{log}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
