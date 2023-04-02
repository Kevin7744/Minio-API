import { Injectable, Get, Post } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Request, Response } from 'express';

var Minio = require('minio');

@Injectable()
export class ServicesService {  
    constructor(private readonly minioService: MinioService) {
    console.log("Minio service reached");
    }   
}
// POST service to minio to upload file

// GET service to minio to download file
