# URLShortener

Hi<br>
URL Shortener services.

Inside you will find two projects representing two services.<br>
<b>Follow the instructions on how to get the project up and running.</b><br>
<b>I would recommend testing it on MacOS also, in case rabbitmq causes some problems on Windows</b><br>

1. Clone the project in some folder on your machine
2. Navigate to Shortify.Management using command line tools and run:<br>
    - <b>npm install</b><br>
   This will restore node dependencies
3. <b>Repeat step 2 for Shortify.Redirection</b><br>
4. Navigate to Shortify.Management using command line tools
5. After you're inside the Shortify.Management run the following command:
    - <b>docker-compose -f docker-compose.yml up</b><br>
6. If it is all successfull , check the following ports: 
    -localhost:8080 (phpmyadmin)
    -localhost:15672 (rabbitmq management)
7. Credentials for phpmyadmin :
    - Username: <b>root</b><br>
    - Password: <b>root</b><br>
8. Credentials for rabbitmq management :
    - Username: <b>guest</b><br>
    - Password: <b>guest</b><br>
9. Navigate to both Shortify.Management and Shortify.Redirection and type the following in terminal:
    - <b>npm start</b> <br>
    This should start both of the applications with some basic information in the console
    
    
If it's all working, you should now have all your containers and services up and running 
and you should be able to access admin panels for mysql and rabbitmq.

<b>Following are instructions on how to test the application itself.</b><br>
<b>All requests are made using Postman </b>

1. Open Postman and in the request window select the request type as POST and in the url bar paste the following URL
    - http://localhost:3000/management
2. Underneath the url bar there is a Body tab for sending the data withing the request
   Select the "raw" content format and on the left dropdown select "application/json" as content type and send followin json:
   - { 
        "url": "https://www.nsoft.com/job-application/?job_id=7661"
     }
3. After you click the Send button, you will get formatted response containing Id, URL that you sent, and short representation of the url
4. ShortURL contains the url of the Redirection service so you can click on the link from response, and it will open new tab in postman
   Example: http://localhost:4000/redirection/A1a3
5. You can click Send button again and the request will be sent to the Redirection service

For the response you will get the page itself because of the redirection from the application, you can see it in the preview 
section of the body response, or just paste the short url in the browser and send the request again.

<b>Testing the DELETE method on the management service</b><br>
1. Repeat step 1 for the POST request on management service, just instead of POST type select DELETE from dropdown 
2. For the body of request, please send following json:
    - { "id": take_Id_from_db} 
   You can check the records in the database on phpmyadmin on localhost:8080 
3. Send the request 

As response of the DELETE request, you will get the Id, Hash, and property which indicates that the record has been deleted.
Hash part is important for Redis, since we're deleting values by the key which is hash part of the URL.

As you're sending these requests, you can notice info messages in the console of both running services. 

<b>Rate limiter</b><br>
Our Redirection API has been limited to 10 requests for 120 seconds window time.
Try repeating request and when it passes 10th request, you will get the 429 response from the API.<br>

<b> As in POST request for the management service, please try to send url with https, since redirection is going outside of our domain.<b><br>


   
