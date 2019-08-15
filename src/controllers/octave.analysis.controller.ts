import { Request, Response } from 'express'
import { OctaveAnalysisRunner } from '../analysis/octave/octave.runner';
import { join } from 'path';
import { env } from 'process';
import { BlobStorage } from '../storage/blob.service';
import { readdir } from 'fs';

export default class OctaveAnalysisController {
  public async index(req: Request, res: Response, next: Function): Promise<void> {
    const runner = new OctaveAnalysisRunner();
    const name = req.query.name ? req.query.name : "octave-output-" + Math.floor(Math.random() * 1000) + 1;
    const results = await runner.run(name);
    const storage = new BlobStorage();
    let storageResult;
    readdir(join(env.OCTAVE_WORKING_DIR, name), function (err, files) {
      if (err) {
          res.json('Unable to scan directory: ' + err);
      } 
      files.forEach(async function (file) {
        storageResult = await storage.save(name, file, join(env.OCTAVE_WORKING_DIR, name, file));
      });
  });

    res.json(storageResult);
  }
}

export const octaveAnalysisController = new OctaveAnalysisController()
