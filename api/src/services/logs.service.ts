import express from "express";
import fs from "fs";
import cp from "child_process";

export const getLogs = (req: express.Request, res: express.Response) => {
    
  const numOfLines = parseInt(req.query.limit as string) || 10;
  const filename = req.query.file || "system.log";
  const keyword = req.query.search || "";
  const pathToFile = `/var/log/${filename}`;
  

  if (!numOfLines || numOfLines < 1) {
    res.status(400).json({ message: "Enter valid number of lines" });
    return;
  }

  if (fs.existsSync(pathToFile)) {
    cp.exec(
      `grep --line-buffered '${keyword}' ${pathToFile} | tail -n ${numOfLines}`,
      (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Error reading file" });
        } else {
          const logs = String(data).split("\n");
          res.status(200).json({ message: "Success", data: logs });
        }
      }
    );
  } else res.status(400).json({ message: "File does't exist" });
};
