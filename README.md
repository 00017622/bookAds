The ShareBook website is the project where users should register or login to create their first book ad in case they have to share it or sell it, they view all the books ads from other people too, but they can in addition, view only their book ads, delete, edit or create new which will be connected to their specific account. Apart from logging in and registering, the users can also view their profile data and update it. Plus, the other thing I did was filtering the book ads by category. To run the app pls install these dependecies: express ejs body-parser nodemon jsonwebtoken bcrypt dotenv cookie-parser. The project follows the common structure with 3 main logic layers, routes, controllers and service. The routes files, just set up the routes and lonk up the controllers to them, the controllers on the other hand call the service methods and continue sending the data to html template rendering page, if it is get request, for example, while service files mainly perform database retreival logic, insertion logic, updating data logic. The views folder is for storing the html templates. The public is for static files such as css or javascript. Also I used middleware to first of all, redirect users if the for example access the login/ route when they are already logged in, while there was also a middleware that was used to set the user object to the request, to make it accessible for html templates. The link to github repo:https://github.com/00017622/bookAds. The link to public domain of the website on render.com cloud, for some reason could not upload to glitch: https://bookads.onrender.com/. 
