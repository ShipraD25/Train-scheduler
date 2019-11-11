# Train-scheduler

## Summary


In this assignment, we were asked to create a train schedule application that incorporates Firebase to host arrival and departure data. This application will retrieve and manipulate this information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.
To achieve this after creating a basic train schedule form layout with the help of bootstrap, firebase was initialized.
Initial variables were declared to hold the values submitted from the form.
Event listener was added to listen to the clicks of submit button.
Values were pushed to database.
Time remaining for the next train is caluculated with the help of moment.js
Time is updated every minute.

This page is fully responsive.

Pseudocode put throughout to understand the functionality of code.

## Tech Used
* HTML
* Javascript
* Jquery
* Firebase
* moment.js
* Bootstrap
* Css 
## code snippet
```jquery
function updateTime() {
        $(".trains").each(function() {

            var frequency = $(this).children(".info").attr("freq");
            var trainTime = $(this).children(".info").attr("time");
            var trainTimeM = moment(trainTime, "HH:mm");
            var minutesAway = frequency - (moment().diff(trainTimeM, "minutes") % frequency);
            var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm");
            $(this).children(".next").text(nextTrain);
            $(this).children(".minutes").text(minutesAway);
        })
    }

```

## App Demo

![Train-schedule Demo!](https://media.giphy.com/media/LoCaJcftgK5pdYN1CY/giphy.gif)