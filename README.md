# AWS_Employee_Information_Bank
AWS_Employee_Information_Bank

### Initial Wire Frame ###

![ScreenShot](aws_employee_information_bank-supporting-files/AWS_Employee_Information_Bank-wireframe.png)


# Initial Set-Up of GitHub & VS-Code
#1 Created the repository on GitHub webpage

#2 Linked the GitHub-repo to my local environment on my computer. There is a 'main' folder of Projects on my local computer. Git-Bashed into Projects-Folder then Git-Cloned with the link provided from GitHub webpage where the repository was created.

# Created the Front-End & Back-End Folders
#1 On the front-end created the REACT APP with the installation line "npx create-react-app aws_employee_information_bank-front-end". The last part of the installation line is actually the name of the folder that will be created where the React Install files will be.

#2 Install 'npm-init' to install Node.js on the back-end. Ensure the "entry point" is indicated as 'server.js' in the prompts during installation 

#3 In the package.json file ensure you add the 'scripts' of "start": "node server.js" and to the main section add "type": "module" to be able to use ES6 notation.

#4 Make sure there is a .gitignore file of the back-end as well. (Copy it from the front end).

#5 Install Express on the back-end

# Created the AWS Storage/Database using AWS S3

#1 Created the bucket that will store all the objects pushed from the front-end of the application. Each object will have the information of the employee being stored.

# Overall Flow of the creation of the App

#1 Started work on the front-end first. Created two main components (Data Entry and Data View/Edit).

#2 The Data Entry component will have all the input fields that the user enters the respective information of the employee. The Data Entry component also has a submit-button that is activated onClick and sends the object-stored-information to the database for storate.

#3 After completing the basic layout and inputs of the Data Entry component ... set-up the AWS S3 bucket to store the information in the cloud.

#4 Created the option to add a file on the front-end in the main component. Since the user will be entering all the information, thought maybe it would be usefull to attach a picture of ... something.

# AWS Set-Up

#1 First created a bucket in S3 that will be the database where all the objects will be stored. The information coming from the front-end will be an object with all the data of the employee.

#2 After the bucket is created, ensure you grant it the right permissions so it is accessible ... i.e. public, private, etc

#3 You also have to set-up the CORS permissions in the bucket. This is an ARRAY. This will give the permission of GET, PUT, POST, etc.

#4 Having alot of difficulty with the AWS set-up. Here is a general run-down of what I have discovered and tried.

#5 First you have to actually create the S3 bucket. The bucket itself can be controlled on what kind of access is granted to it. "Higher up" you have users that are also granted certain rights to different functionality within the S3 space or ALL AWS functions.

#6 Once the S3 bucket is created and granted the right type of permissions, an access point to the bucket itself can be created. Somehow there is a discrepancy between the types of permissions the bucket has, and the type of permissions the access-point has.

#7 To actually access the S3-Bucket I am trying to use AWS Lambda ... which is simply a function that when called it will returned a signed-url that can be used to upload data to the bucket. The AWS Lambda function also has to be tied to the right bucket and also given the right permissions.

#8 An API Gateway is created to call-up the AWS Lambda function. The API Gateway is an API endpoint to which GET-Request can be made .. it then activates the AWS Lambda function and returns an "upLoad URL" as the response. That upLoad URL is what SHOULD work to perform a PUT-Request to load the object-file into the S3 Bucket.

#9 And this is where I'm stuck currently. The GET-Request through the API Gateway is working. I do get a response from the Lambda function with the upLoadURL ... however, when I try to use the upLoadURL to actually make the PUT-Request ... it does not work.

#10 Going to try a different path now ... going to try to work with the backend/server in order to upload the data from that side.

# Back End Set-Up

#1 Need to install a middleware (multer) that can handle the different type of media files that might be submitted to the S3 bucket.

#2 Created first the Policy on how to access the S3 bucket on AWS

#3 Then create a User ... a User can either be a real person that will access the resource on AWS or an App that will be accessing the resource on AWS. (i.e. the resource is the bucket)

#4 Make sure to install library @aws-sdk/client-s3 in order to be able to interact with the AWS s3 bucket.

#5 First create the S3Client that will be able to access the S3 bucket.

#6 Then create the PutObjectCommand that will actually be sending the data to the S3 bucket

#7 Also installed npm sharp which is a way to re-size images down to smaller sizes.

#8 It now works! Images are sent to the S3 bucket.

#9 To get the images back from S3 bucket ... need to install library @aws-sdk/s3-request-presigner on server side
