import { PythonShell, Options } from 'python-shell';
import { Runner } from 'analysis/runner';
import { env } from 'process';

export class PythonAnalysisRunner implements Runner {
  async run(outputFile: string): Promise<any> {
    const options: Options = {
      mode: "text",
      pythonPath: env.PYTHON_PATH,
      pythonOptions: ['-u'],
      scriptPath: env.PYTHON_WORKING_DIR,
      cwd: env.PYTHON_WORKING_DIR,
      args: [env.PYTHON_SCRIPT_ARG1, env.PYTHON_SCRIPT_ARG2, outputFile + ".csv", outputFile + ".html"],
    };
    
    return new Promise<any[]>((resolve, reject) => {
      PythonShell.run(env.PYTHON_SCRIPT_FILE, options, function (err, results) {
        if (err) {
          reject(err);
        }
        console.log('Python Analysis Results: %j', results);
        resolve(results);
      });  
    });
  }
}

