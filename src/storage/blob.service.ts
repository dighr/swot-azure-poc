import * as azure  from 'azure-storage';

export class BlobStorage {

  constructor() { }

  async save(containerName: string, blobName: string, filePath: string): Promise<any> {
    const blobService = azure.createBlobService();
    return new Promise<any>((resolve, reject) => {
      blobService.createContainerIfNotExists(containerName, {
        publicAccessLevel: 'blob'
      }, function(error, result, response) {
        if (!error) {
          blobService.createBlockBlobFromLocalFile(containerName, blobName, filePath, function(error, result, response) {
            if (!error) {
              resolve(true);
            } else {
              reject(error);
            }
          });
        } else {
          reject(error);
        }
      });
    });
  }
}