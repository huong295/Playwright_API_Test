// filepath: c:\Users\LUE9HC\Documents\Data-Huong\CODE\Playwright_Test\tests\helpers\api-utils.ts
import { APIRequestContext } from '@playwright/test';

export class DogApiHelper {
  constructor(private request: APIRequestContext) {}

  async getFirstBreedId(): Promise<number> {
    const resp = await this.request.get('https://api.thedogapi.com/v1/breeds?limit=10&page=0', { params: { limit: 1 } });
    const data = await resp.json();
    return data[0]?.id;
  }


  
}