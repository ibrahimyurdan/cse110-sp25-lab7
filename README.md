# CSE 110 Lab 7 - End-to-End Testing

## Team Members
- Ibrahim Yurdan
- Emily Nguyen
  
## Check Your Understanding Questions

### Question 1
**Where would you fit your automated tests in your Recipe project development pipeline?**

Within a Github action that runs whenever code is pushed this helps catch bugs earlyy and ensures code quality is maintained automatically with each change. Running tests after each code push prevents broken code from being merged and keeps the main branch stable.

### Question 2
**Would you use an end to end test to check if a function is returning the correct output?**

No. End to end tests are better for testng user workflows and complete features across the application not individual function outputs. For checking function outputs, unit tests are more appropriate since theyre faster and more focused.

### Question 3
**What is the difference between navigation and snapshot mode?**

Navigation mode analyzes a page right after it loads and provides an overall performance metric. It evaluates the initial page load experience and measures metrics like First Contentful Paint (0.3s in the shop site) and Largest Contentful Paint (1.1s). It can't analyze interactions that happen after the page loads.

Snapshot mode analyzes a page in its current state after user interactions. It's best for finding accessibility issues after the user has interacted with the page. Unlike Navigation mode, it can't measure loading performance metrics or evaluate the initial rendering process.

### Question 4
**Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.**

1. Properly size and optimize images - The Lighthouse report shows potential savings of 864 KB, and recommends serving images in next-gen formats for additional savings of 165 KB
2. Add a proper viewport meta tag - The site is missing the `<meta name="viewport">` tag, which is crucial for responsive design and mobile compatibility
3. Add a meta description and language attribute - The HTML lacks a meta description (affecting SEO) and is missing the lang attribute (affecting accessibility
