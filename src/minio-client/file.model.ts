export interface BufferFile 
{
    fieldname: string;
    originalname: string;
    encodinmg: string;
    mimetype: string;
    size: number;
    buffer: Buffer | string;
}

export interface StoredFile extends HasFile, StoredFileMetadata {}

export interface HasFile
{
    file: Buffer | string;
}

export interface StoredFileMetadata
{
    id: string;
    name: string;
    encoding: string;
    mimetype: string;
    size: number;
    uploadedAt: Date;
    fileSrc: string;
}

export type AppMimeType = 
| 'Image/png'
| 'Image/jpeg';