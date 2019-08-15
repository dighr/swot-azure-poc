import { Express } from 'express'
import { pythonAnalysisController } from '../controllers/python.analysis.controller'
import { octaveAnalysisController } from '../controllers/octave.analysis.controller';

export default class IndexRoute {
  constructor(app: Express) {
    app.route('/python').get(pythonAnalysisController.index);
    app.route('/octave').get(octaveAnalysisController.index);
  }
}
