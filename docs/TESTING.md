# Performance test findings 

Tests:
- loading the login page
- logging in
- loading the task view
- editing user profile
- loading the productivity data

In this test scenario, the app was running locally while the database was remote (Amazon RDS, Frankfurt server).
All tests were done with Apache Bench, each performed 250 requests with concurrency at 20 and keep-alive enabled.  
The profiling was done with Node.js's inbuilt profiler.

1. __Loading the login page__ `GET /login`  
Average time needed: 70.124 ms  
Request per second: 285.21  
This is the least demanding test since the server just checks if the user is already logged in
and renders the login view. The profile shows no special bottlenecks.

2. __Logging in__ `POST /login`  
Average time needed: 4153.679 ms  
Requests per second: 4.82  
This is the most demanding test. Every request goes through a login procedure (which involves checking the database if the 
user exists and comparing the hashed passwords). From the profile, we can clearly see that the bottleneck in this case
is the bCrypt library (I use the plain JS implementation).
The salting and hashing is computationally intensive and the main cause of the slow speed. 
Attempting to actually use the page during this test resulted in very poor responsiveness.

3. __Loading the task view__ `GET /tasks`  
Average time needed: 636.182 ms  
Requests per second: 31.44  
This test involves invoking some business logic (fetching data from database, loading tasks for a user and choosing 
which to display based on their profile settings). Since data needed to be fetched from a remote database, it is
reasonable that the load times are not instant in this test scenario. The profile shows no clear bottleneck.

4. __Editing user profile__ `POST /profile`
Average time needed: 737.255 ms  
Requests per second: 27.13  
This test involves form validation on the server along with a request to the database to update the user's profile. 
It is a bit slower than loading the task view, but there is still no bottleneck visible from the profile.

5. __Loading the productivity data__ `GET /productivityData`  
Average time needed: 314.294 ms  
Requests per second: 63.63  
This test involves receiving JSON data, no view loading at all. It is faster than the task view despite having more business
logic behind it. The profile still shows no clear bottleneck.

