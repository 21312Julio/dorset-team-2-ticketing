# Mobile Development CA2 - Group ![ionic](https://img.shields.io/badge/ionic-ng-green) ![firebase](https://img.shields.io/badge/-firebase-red)
## Table of Contents
* [Introduction](#introduction)
* [Walkthrough](#walkthrough)
* [Setting Up](#setting-up)
## Introduction
For this project our task was to created an app using a technology of our choice that could perform actions similar to a ticket booking service. The type of event was up to our
choice, but the application was intended to choose a date, time, pick seats, tickets and get the information sent to you along with a reference number. The name of our project
was CinePlex. In order to retrieve the information, we were also required to have it come from a storage mechanism, therefore we also used Firebase to store the movie information, along with ticket ID.
- Figma | https://www.figma.com/file/Rs0AzuwNQxQuMmFh7XanGa/CinePlex?node-id=0%3A1
- Information Storage | FIREBASE
## Walkthrough
The flow of the project is as follows:
### Login Page
Here the user will be prompted to enter their login information. The app uses Ionic form verification, so the user must enter a valid format for both fields, using '@' and 
a password of at least 6 characters.

![](/cineplexpages/login.PNG)

### Registration Page
In case the user doesn't have an account, they can create one following the rules mentioned previously. Once they registrate, they will be taken back to the login page
where they can enter using their credentials.

![](/cineplexpages/register.PNG)

### Landing Page

Here is where the user will land upon login. They can see which movies are currently being shown on today's date and their times. From here they can also access the profile
page and a callendar to change the date for the movies shown.

![](/cineplexpages/landing.PNG)
![](/cineplexpages/callendar.PNG)

### Profile Page

Here the user can logout from their account.

![](/cineplexpages/profile.PNG)

### Seat Picking Page

In this page, the user will be prompted to choose the amount of seats to be booked. There is a limit of 6 seats per booking, and there are currently no rules that the
seats must be besides each other.

![](/cineplexpages/seats.PNG)

### Ticket Page

Here the user can choose the types of tickets they wish to buy, with rules in place for children tickets and family ones. They can buy as many tickets as the amount
of seats they chose in the previous page.

![](/cineplexpages/ticket.PNG)

### Confirmation Prompt

Once the user confirms their tickets, they will be shown a code that is emailed to their registration email with information pertinent to their booking. This will be user
to identify them once they get to the cinema. After this, the landing page will be shown again.

![](/cineplexpages/confirmation.PNG)

## Setting Up
In order to set up the project in your machine, you can download the ZIP code by clicking on the green button besides ABOUT. Once you have it on your machine, you must enter
the following command in your terminal due to compilation issues `npm install --save-dev @angular-devkit/build-angular`. Once angular is finished building, go ahead and type `ionic serve`. This will load the app in a local host server. **All commands shown must be entered inside the project folder in your terminal.**
This github repository contains a PPTX presentation as request by the lecturer and a PDF file with a walkthrough. 
