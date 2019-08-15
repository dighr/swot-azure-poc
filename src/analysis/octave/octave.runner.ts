import { Runner } from 'analysis/runner';
import { env } from 'process';
import { spawn } from 'child-process-promise';
import { format } from 'util';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export class OctaveAnalysisRunner implements Runner {
  async run(output: string): Promise<any> {
    
    return new Promise<any>((resolve, reject) => {

      if (!existsSync(join(env.OCTAVE_WORKING_DIR, output))){
        mkdirSync(join(env.OCTAVE_WORKING_DIR, output));
      }

      const name = format(env.OCTAVE_PARAM2, output);
      spawn(env.OCTAVE_SCRIPT_FILE, [env.OCTAVE_PARAM1, name], { 
        capture: [ 'stdout', 'stderr' ],
        cwd: env.OCTAVE_WORKING_DIR
      })
      .then(function (result) {
        resolve(result.stdout.toString());
      })
      .catch(function (err) {
        reject(err.stderr);
      });
    });
  }
}

