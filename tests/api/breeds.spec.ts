import { test, expect } from '@playwright/test';

test.describe('Dog API Tests', () => {
  
  test('GET request - retrieve all breeds with limit and page', async ({ request }) => {
    const response = await request.get('/v1/breeds?limit=10&page=0');
    
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeLessThanOrEqual(10);
    
    // Verify breed properties
    if (responseBody.length > 0) {
      expect(responseBody[0]).toHaveProperty('id');
      expect(responseBody[0]).toHaveProperty('name');
    }
  });

  test('GET request - retrieve all breeds without query params', async ({ request }) => {
    const response = await request.get('/v1/breeds');
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
  });
});

// ...existing code...