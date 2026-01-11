**TEST_PLAN.md**
markdown
# Test Strategy - Dog API

## Scope

Validate all user stories via API automation:
1. Retrieve breeds
2. Get breed details
3. Upload images
4. Delete images
5. Retrieve images
6. Display images
7. Random image lists

## Approach

- API-level testing using Playwright
- Happy path + negative scenarios
- Data-driven where applicable
- Proper setup/cleanup

## Test Types

- Functional: Core API behavior
- Negative: Error handling, invalid inputs
- Security: API key validation
- Data Validation: Response structure/types

## Risks

- API rate limits
- Network instability
- API key exposure

## Mitigation

- Sequential execution
- Retry logic
- Cleanup hooks
- Environment variables for secrets

## CI/CD Integration

Tests designed for:
- Single command execution
- JUnit XML output
- HTML reporting
- Failure screenshots-> format with Readme.md file

## Assumptions 
- API key has upload/delete permissions 
- Network connectivity to api.thedogapi.com 
- Tests run sequentially to avoid conflicts 
- Uploaded images are cleaned up after tests Limitations Rate limiting not explicitly tested Large file uploads not covered Concurrent upload scenarios not tested 

## AI Usage 
- AI assisted with: Test structure organization 
- Negative test case generation 
- Documentation formatting

