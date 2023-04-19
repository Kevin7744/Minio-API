import { Test, TestingModule } from '@nestjs/testing';
import { FileDownloadController } from './file-download.controller';

describe('FileDownloadController', () => {
  let controller: FileDownloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileDownloadController],
    }).compile();

    controller = module.get<FileDownloadController>(FileDownloadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
