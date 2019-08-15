import { Request, Response } from 'express'
import { PythonAnalysisRunner } from '../analysis/python/python.runner';
import { BlobStorage } from '../storage/blob.service';
import { env } from 'process';
import { join } from 'path';

export default class PythonAnalysisController {
  public async index(req: Request, res: Response, next: Function): Promise<void> {
    const runner = new PythonAnalysisRunner();
    const name = req.query.name ? req.query.name : "python-output-" + Math.floor(Math.random() * 1000) + 1;
    const nameCSV = name  + ".csv";
    const nameHTML = name  + ".html";
    const results = await runner.run(name);
    const storage = new BlobStorage();
    const storageResultCSV = await storage.save("swot-analysis-python", nameCSV, join(env.PYTHON_WORKING_DIR, nameCSV));
    const storageResultHTML = await storage.save("swot-analysis-python", nameHTML, join(env.PYTHON_WORKING_DIR, nameHTML));
    res.send(storageResultHTML);
  }
}

export const pythonAnalysisController = new PythonAnalysisController()
