# Performance test findings 

Tests:
- loading the login page
- logging in
- loading the task view

In this test scenario, the app was running locally while the database was remote (Amazon RDS, Frankfurt server).
All three tests were done with Apache Bench, 3 times 250 requests with concurrency at 20 and keep-alive enabled.  
The profiling was done with Node.js's inbuilt profiler.

1. Loading the login page `GET /login`  
Average time needed: 0.852s  
This is the least demanding test since the server just checks if the user is already logged in
and renders the login view. The profile shows no special bottlenecks.

2. Logging in `POST /login`
Average ime needed: 51.921s  
This is the most demanding test. Every request goes through a login procedure (which involves checking the database if the 
user exists and comparing the hashed passwords). From the profile, we can clearly see that the bottleneck in this case
is the bCrypt library (I use the plain JS implementation).
The salting and hashing is computationally intensive and the main cause of the slow speed. 
Attempting to actually use the page during this test resulted in very poor responsiveness.

3. Loading the task view `GET /tasks`
Average time needed: 8.952s  
This test involves invoking some business logic (fetching data from database, loading tasks for a user and choosing 
which to display based on their profile settings). Since data needed to be fetched from a remote database, it is
reasonable that the load times are not instant in this test scenario. The profile shows no clear bottleneck.
