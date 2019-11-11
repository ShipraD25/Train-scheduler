// START CODING BELOW!!
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
        console.log("->", trainName, destination, trainTime, frequency)
            // Code for "Setting values in the database"
        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(snapshot) {

        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().trainName);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().trainTime);
        console.log(snapshot.val().frequency);

        // next and minitues away
        // current time
        // var current = moment().format("HH:mm")
        //  console.log(current)
        var trainTimeM = moment(snapshot.val().trainTime, "HH:mm");

        // 8:00    9:50   30    9:50 - 8:00 110 minutes  / 30 90   110 - 90 
        var minutesAway = snapshot.val().frequency - (moment().diff(trainTimeM, "minutes") % snapshot.val().frequency)
        var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm")

        console.log("---->", minutesAway, nextTrain);
        // Change the HTML to reflect
        //$("#name-display").text(snapshot.val().name);
        //$("#destination-display").text(snapshot.val().email);
        //$("#traintime-display").text(snapshot.val().age);
        //$("#comment-display").text(snapshot.val().comment);
        /////
        $("#train-table > tbody").append(`
                                <tr class="trains">
                                    <td scope="col">${snapshot.val().trainName}</td>
                                    <td scope="col">${snapshot.val().destination}</td>
                                    <td class="info" time=${snapshot.val().trainTime} freq=${snapshot.val().frequency} scope="col">${snapshot.val().frequency}</td>
                                    <td class="next" scope="col">${nextTrain}</td>
                                    <td class="minutes" scope="col">${minutesAway}</td>
                                </tr>`)



        /////



        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    function updateTime() {
        console.log("update time");
        $(".trains").each(function() {
            console.log("inside");
            var frequency = $(this).children(".info").attr("freq");
            var trainTime = $(this).children(".info").attr("time");
            var trainTimeM = moment(trainTime, "HH:mm");
            var minutesAway = frequency - (moment().diff(trainTimeM, "minutes") % frequency);
            var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm");
            $(this).children(".next").text(nextTrain);
            $(this).children(".minutes").text(minutesAway);
        })
    }

    var timer = setInterval(updateTime, 60000);

});