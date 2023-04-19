import { Test, TestingModule } from '@nestjs/testing';
import { FileDownloadService } from './file-download.service';

describe('FileDownloadService', () => {
  let service: FileDownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileDownloadService],
    }).compile();

    service = module.get<FileDownloadService>(FileDownloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
