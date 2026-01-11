import { test, expect } from '@playwright/test';
import { DogApiHelper } from "../helpers/api-utils"

test.describe('US2: Retrieve Specific Breed Information', () => {
  let helper: DogApiHelper;
  let testBreedId: number;

  test.beforeAll(async ({ request }) => {
    helper = new DogApiHelper(request);
    testBreedId = await helper.getFirstBreedId();
  });

  test('Happy Path: Should retrieve breed by valid ID', async ({ request }) => {
    const resp = await request.get(`https://api.thedogapi.com/v1/breeds/${testBreedId}`);
    
    expect(resp.status()).toBe(200);
    
    const breed = await resp.json();
    expect(breed.id).toBe(testBreedId);
    expect(breed).toHaveProperty('name');
  });

  test('Negative: Should return 404 for non-existent breed', async ({ request }) => {
    const resp = await request.get('https://api.thedogapi.com/v1/breeds/999999');
    
    expect(resp.status()).toBe(400);
  })
})