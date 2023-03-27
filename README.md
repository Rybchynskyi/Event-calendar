# Event-calendar
Application with CRUD and without refreshing

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Bootstrap5](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## For deploying:
1. Download the project
2. Install Node.js on your computer if you haven't already
3. Run the command "npm install"
4. Import [database.sql](https://github.com/Rybchynskyi/Event-calendar/blob/master/database.sql) into your local database
5. Write your database settings into modules/config_db.js

## About the project
The main business purpose was in creating a simply and understandable calendar, where administrators can add, change and delete events, and other users (clients) can view them.

Based on the purpose, I focused on the main business tasks:
Simply surfing: Events will be paid. That's why clients must have all opportunities for finding events, that can be interesting for them. Otherwise, the company will lose money (because users will not pay for the events)
Calendar have to be single paged. And all actions have to be without redirecting and refreshing page
Easy administrating: Administrators are people without some particular knowledge about the system. That's why administrating process have to be safe and understandable
Flexibility: Overwhelming majority of users will surf this page with the phone

Based on the tasks, I started the development

### __1.Simply surfing__

Each event can be just in one type:
- Meeting with an expert
- Question-answer
- Conference
- Webinar


For a better selection was implemented a filter:

<p align="center">
   <img src="https://github.com/Rybchynskyi/Images-for-readme/blob/main/Events/01_events.png" width="600">
 </p>
<br>

Each type of event have their particular color. And after pressing one of the filter buttons, the client can see just a particular type of events in calendar:

<p align="center">
   <img src="https://github.com/Rybchynskyi/Images-for-readme/blob/main/Events/02_events_gif.gif" width="600">
 </p>
<br>

Pressed button will have border, that mean that filter is in active statement.
Each day on the calendar, that has at least one of the event in the chosen type - has a dot in the particular color of the event.

### __2. Single paged calendar__
Nowadays, users are very annoyed when they have to wait for some actions on the page, or when web-page makes a redirecting or flicking after that. That's why all requests to the server were developed by using global FETCH method for catching information from the servers without refreshing and redirecting.
Server was created using Node.js - it's the better way for having fast and establish connection.


All requests to the server are going through the API page, and the answers from the server depend on the request method:
- GET - getting event list
- POST - adding new event
- PUT - edit some particular event
- DELETE - deleting some particular event

After successful action, server response status 200 and result of the request. After that, using global FETCH method, page refreshes event list, updates color of dots and shows the message about successfully action.

<p align="center">
   <img src="https://github.com/Rybchynskyi/Images-for-readme/blob/main/Events/03_items.png" width="600">
 </p>
<br>

### __3. Easy administrating__
I could have made a particular page for the administrators. But a better way will be making the possibility for creating, editing and deleting events using the same page as for users. If you are administrator - you can make CRUD actions with the events. If you are a client - then you have just filter buttons. All CRUD requests are based on a single-page rule (2), like for clients.
Based on the understanding, that administrator can delete the event by mistake - I created confirmation of deleting. It appears near the deleting button. Ant if you really want to delete this event - you have to move your mouse a little to the right for confirmation your action:
<table border="0" align="center">
 <tr>
    <td>
      <p align="center">
        Desktop<br>
        <img src="https://github.com/Rybchynskyi/Images-for-readme/blob/main/Events/04_deleting_01.png" height="400">
      </p>
    </td>
    <td>
      <p align="center">
        Mobile<br>
        <img src="https://github.com/Rybchynskyi/Images-for-readme/blob/main/Events/05_deleting_02.png" height="400">
      </p>
    </td>
 </tr>
</table>

### __4. Flexibility__
Considering that users mostly use mobile phones, I decided to use the bootstrap framework. It helps to improve the user experience and save time for the development of other features of the application:

<table border="0" align="center">
 <tr>
    <td>
      <p align="center">
        Desktop<br>
        <img src="https://github.com/Rybchynskyi/Images-for-readme/blob/main/Events/06_full_desktop.png" height="400">
      </p>
    </td>
    <td>
      <p align="center">
        Mobile<br>
        <img src="https://github.com/Rybchynskyi/Images-for-readme/blob/main/Events/07_full_mobile.png" height="400">
      </p>
    </td>
 </tr>
 <tr>
    <td>
      <p align="center">
        Desktop<br>
        <img src="https://github.com/Rybchynskyi/Images-for-readme/blob/main/Events/08_events_desktop.png" height="400">
      </p>
    </td>
    <td>
      <p align="center">
        Mobile<br>
        <img src="https://github.com/Rybchynskyi/Images-for-readme/blob/main/Events/09_events_mobile.png" height="400">
      </p>
    </td>
 </tr>
</table>
