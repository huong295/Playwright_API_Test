// filepath: c:\Users\LUE9HC\Documents\Data-Huong\CODE\Playwright_Test\tests\helpers\api-utils.ts
import { APIRequestContext } from '@playwright/test';
import * as fs from "fs";
import * as path from "path";

export class DogApiHelper {
  constructor(private request: APIRequestContext) {}

  async getFirstBreedId(): Promise<number> {
    const resp = await this.request.get('v1/breeds?limit=10&page=0', { params: { limit: 1 } });
    const data = await resp.json();
    return data[0]?.id;
  }

 async uploadTestImage(breedId: number, subId: string): Promise<string> {
  const imagePath = path.join(__dirname, '../../test-data/sample_image.jpg');

  const resp = await this.request.post('/v1/images/upload', {
    multipart: {
      file: fs.createReadStream(imagePath),
      sub_id: subId,
      breed_ids: breedId.toString()
    }
  });

  if (!resp.ok()) {
    const body = await resp.text();
    throw new Error(`Image upload failed: ${resp.status()} - ${body}`);
  }

  const result: { id: string } = await resp.json();
  return result.id;
}

async cleanupImage(imageId: string): Promise<void> {
  const resp = await this.request.delete(`/images/${imageId}`);

  if (!resp.ok()) {
    console.warn(
      `Cleanup failed for image ${imageId}: ${resp.status()}`
    );
  }
}

async createTestImage(): Promise<string> {
  const dir = path.resolve(__dirname, '../../test-data');
  const filePath = path.join(dir, 'sample-image.jpg');

  await fs.promises.mkdir(dir, { recursive: true });

  if (!fs.existsSync(filePath)) {
    // Minimal valid JPEG (1x1 px) for API upload testing
    const minimalJpeg = Buffer.from([
      0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46,
      0x00, 0x01, 0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00,
      0xFF, 0xDB, 0x00, 0x43, 0x00, 0xFF, 0xC0, 0x00, 0x0B, 0x08,
      0x00, 0x01, 0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4,
      0x00, 0x14, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F, 0x00,
      0x7F, 0xFF, 0xD9
    ]);

    await fs.promises.writeFile(filePath, minimalJpeg);
  }

  return filePath;
}

  
}