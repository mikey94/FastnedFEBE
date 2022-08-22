
      To Run the server please follow below procedure.

1. CD into BE directory. ex:- CD BE/
2. Check whether environment file (.env) is exists for not.
3. if file not exists create .env file inside the src folder.
4. ``(DATABASE_URL=mongodb+srv://Buwaneka:19940111BS@cluster0.wol6mk1.mongodb.net/?retryWrites=true&w=majority)`` add to the .env file.
5. If everything is okay run "npm install" inside the BE directory.
6. If all above steps okay then run "npm start" inside BE directory.
7. Then you can see server started on port 8000 and if DB connection is okay it will also show "connected to mongoDB".

P.S - You don't have to run "npm start" and again to restart server for changes. "Nodemon" all ready added to script.
      Also CORS issues handled.
      
      
      To Run the client please follow below procedure.

1. CD into FE directory and then CD into fastned directory.
2. Run 'npm install' to install required dependencies.
3. Run 'npm start' from inside the fastned directory.
4. if everything above went well client will start on port 3000.
