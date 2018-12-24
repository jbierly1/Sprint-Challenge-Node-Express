##1 Mention two parts of Express that you learned about this week.
I learned how to access the request object, which is the information sent by the user, and how to return a response object, which is the API's response.

##2 Describe Middleware?
Middleware is like an assembly line of functions.  Each one takes in the result of the previous one, modifying it as it goes.  Routes are all middleware too, so the last middleware is the one that sends off the completed object as a response.
##3Describe a Resource?
 Resources are all separate modules with separate purposes, for example one may handle get requests and another may contain a contain a list of posts.

##4 What can the API return to help clients know if a request was successful?
The api can return a response object, with the status set to 200 and the json of the response set to whatever we want to send back.
##5How can we partition our application into sub-applications?
We make separate files for separate resources, and the user can access them by following new routes.  We don't need to put the full route in the new file, as the first part will be supplied by our main file, but we do need to fill in the rest of it.  This allows us, though, to make new "/" routes for example and set up many different easy to read CRUD sequences throughout the application.