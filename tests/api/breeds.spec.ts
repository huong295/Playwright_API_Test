
import { test, expect } from '@playwright/test';

test.describe('US1: Retrieve All Breeds', () => {
  
  test('Happy Path: Should return list of breeds', async ({ request }) => {
    const resp = await request.get('/breeds');
    
    expect(resp.status()).toBe(200);
    
    const body = await resp.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    
    const first = body[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(typeof first.id).toBe('number');
    expect(typeof first.name).toBe('string');
  });

  test('Negative: Should handle negative limit', async ({ request }) => {
    const resp = await request.get('/breeds', {
      params: { limit: -10 }
    });
    
    expect(resp.status()).toBe(200);
  });

});