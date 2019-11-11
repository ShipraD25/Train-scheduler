$(document).ready(function() {
    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyDGyw5EVesd6dOFMoJX2BK3CPCtBiY73Rk",
        authDomain: "train-scheduler-855e7.firebaseapp.com",
        databaseURL: "https://train-scheduler-855e7.firebaseio.com",
        projectId: "train-scheduler-855e7",
        storageBucket: "train-scheduler-855e7.appspot.com",
        messagingSenderId: "682219361871",
        appId: "1:682219361871:web:5415857271d2986448fc3a",
        measurementId: "G-WG2ZKHSM6W"
    };

    firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var trainTime = 0;
    var frequency = 0;

    // Capture Button Click
    $("#add-train").on("click", function(event) {
        event.preventDefault();

        // Grabbed values from text-boxes
        trainName = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        trainTime = $("#traintime-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        // Code for "pushing the values in the database"
        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        });

    });

    // Firebase watcher + initial loader
    database.ref().on("child_added", function(snapshot) {



        // next and minitues away
        // current time
        // var current = moment().format("HH:mm")

        var trainTimeM = moment(snapshot.val().trainTime, "HH:mm");

        // calculating minutes away and next train
        var minutesAway = snapshot.val().frequency - (moment().diff(trainTimeM, "minutes") % snapshot.val().frequency)
        var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm")


        $("#train-table > tbody").append(`
          <tr class="trains">
            <td scope="col">${snapshot.val().trainName}</td>
            <td scope="col">${snapshot.val().destination}</td>
            <td class="info" time=${snapshot.val().trainTime} freq=${snapshot.val().frequency} scope="col">${snapshot.val().frequency}</td>
            <td class="next" scope="col">${nextTrain}</td>
            <td class="minutes" scope="col">${minutesAway}</td>
         </tr>`)


    });

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
    // updating time every minute
    var timer = setInterval(updateTime, 60000);

});