import {
    injectable,
    BindingScope,
    Provider,
    inject,
  } from '@loopback/core';
  import path from 'path';
  import * as fs from 'fs';
  import {ILogger, LOGGER} from '@sourceloop/core';
  import { ExportHandlerFn } from '@sourceloop/audit-service';
  
  // export type FileProcessing = unknown;
  // export type FileProcessingFn = (fileBuffer: any) => Promise<void>;
  
  @injectable({scope: BindingScope.TRANSIENT})
  export class FileProcessingProvider implements Provider<ExportHandlerFn> {
    constructor(
      @inject(LOGGER.LOGGER_INJECT)
      public logger: ILogger,
    ) {}
  
    value(): ExportHandlerFn {
      return async (fileBuffer: any) => {
        return this.excelProcessing(fileBuffer);
      };
    }
    async excelProcessing(fileBuffer: any) {
      const targetDirectoryPath = process.env.PATH_TO_EXPORT_FILES_FOLDER;
      if (!targetDirectoryPath) {
        throw new Error(
          'Path to the target directory to export the file is not defined.',
        );
      }
      const targetDirectory = path.join(targetDirectoryPath, '/export-logs/');
      try {
        fs.mkdirSync(targetDirectory, {recursive: true});
        this.logger.info('Target Directory Created!');
      } catch (error) {
        if (error.code !== 'EEXIST') {
          const errorMessage = `An error occurred while creating export logs directory: ${error.toString()}`;
          this.logger.error(errorMessage);
          throw new Error(errorMessage);
        }
        this.logger.info('Target Directory Already Exists!');
      }
      const fileName = `audit-logs-${new Date().toISOString()}.xlsx`;
      const filepath = path.join(targetDirectory, fileName);
      fs.writeFile(filepath, fileBuffer, error => {
        if (error) {
          console.error('An error occurred while writing the Excel file:', error);
        } else {
          console.log('Excel file created successfully:', filepath);
        }
      });
    }
  }