import { Controller, Get, Injectable, Req, Post, Body } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

var Minio = require('minio');

@Controller('')
export class MinioController {
    constructor(private readonly minioService: MinioService) {
    console.log("Minio service reached");
  }
  // list all buckets
  @Get('listBuckets')
  async listAllBuckets(@Req() req) {  
    return this.minioService.client.listBuckets();
  }
  // create a bucket
  @Get('createBucket')
  async createBucket(@Req() req) {
    return this.minioService.client.makeBucket('', '');
  }
  //Delete a bucket
  @Get('deleteBucket')
  async deleteBucket(@Req() req) {
    return this.minioService.client.removeBucket('kevin');
  }

  // list objects in a bucket
  @Get('listObjects')
  async listObjects(@Req() req) {
    return this.minioService.client.listObjects('kevin', '', true);
  }

  // upload an object to a bucket
  @Post('uploadObject')
  async create(@Body() createObjectDto: CreateObjectDto) {
    const { bucketName, fileName, filePath } = createObjectDto;
  
    const metaData = {
      'Content-Type': 'application/octet-stream',
      'X-Amz-Meta-Testing': 1234,
      example: 5678,
    };
  
    // Read the file from disk
    const file = await fs.promises.readFile(filePath);
  
    return this.minioService.client.putObject(bucketName, fileName, file, metaData);
  }
  

  // download an object as url from a bucket
  @Get('downloadObject')
  async downloadObject(@Req() req) {
    return this.minioService.client.presignedGetObject('kevin', 'test.txt', 24 * 60 * 60);
  }

  // delete an object from a bucket
  @Get('deleteObject')  
  async deleteObject(@Req() req) {
    return this.minioService.client.removeObject('kevin', 'test.txt');
  }
}
