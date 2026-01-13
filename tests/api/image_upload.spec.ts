// filepath: c:\Users\LUE9HC\Documents\Data-Huong\CODE\Playwright_Test\tests\api\image-upload.spec.ts
import { test, expect } from '@playwright/test';
import { DogApiHelper } from '../helpers/api-utils';
import * as fs from 'fs';
import * as path from 'path';

test.describe('US3 & US4: Upload and Delete Images', () => {
  let helper: DogApiHelper;
  let breedId: number;
  const uploadedIds: string[] = [];

  test.beforeAll(async ({ request }) => {
    helper = new DogApiHelper(request);
    helper.createTestImage();
    breedId = await helper.getFirstBreedId();
  });

  test.afterEach(async () => {
    for (const id of uploadedIds) {
      await helper.cleanupImage(id);
    }
    uploadedIds.length = 0;
  });

  test('Happy Path: Should upload image successfully', async ({ request }) => {
    const imagePath = path.join(__dirname, '../../test-data/sample_image.jpg');
    const subId = `test-${Date.now()}`;
    
    const resp = await request.post('/v1/images/upload', {
      multipart: {
        file: fs.createReadStream(imagePath),
        sub_id: subId,
        breed_ids: breedId.toString()
      }
    });
    
    expect(resp.status()).toBe(201);
    
    const result = await resp.json();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('url');
    
    uploadedIds.push(result.id);
  });

  test('Happy Path: Should delete uploaded image', async ({ request }) => {
    const imageId = await helper.uploadTestImage(breedId, `del-test-${Date.now()}`);
    
    const delResp = await request.delete(`/v1/images/${imageId}`);
    expect(delResp.status()).toBe(200);
    
    const getResp = await request.get(`/v1/images/${imageId}`);
    expect(getResp.status()).toBe(404);
  });

  

  test('Negative: Should handle missing file in upload', async ({ request }) => {
    const resp = await request.post('/v1/images/upload', {
      multipart: {
        sub_id: 'missing-file-test'
      }
    });
    
    expect([400, 422]).toContain(resp.status());
  });

  test('Negative: Should return 404 when deleting non-existent image', async ({ request }) => {
    const resp = await request.delete('/v1/images/nonexistent123');
    
    expect(resp.status()).toBe(404);
  });
});