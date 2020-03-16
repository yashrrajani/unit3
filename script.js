//*** initial statements ***

$("#other-title").hide(); //hide the other job description box initially


//*** commands for when the page is reloaded ***

$("#name").focus(); //puts the cursor in the name box and scrolls to the top of the page after the page is reloaded
$(document).ready(function(){ //scrolls to top of page after the page reloads
    $(this).scrollTop(0);
});


//*** job role portion ***

$('#title').change(function(){ //if the job title changes
    if($(this).val()=== "other") //and the selected job title is other
    $('#other-title').show(); //then make the input box available to user 
});


//*** t-shirt portion ***

$("#colors-js-puns").hide(); //initially hide the color label and dropdown

$("#design").change(function(){ //when the design dropdown is triggered
    $("#colors-js-puns").show();
    $("#color").children().hide() //rehide all of the color options
        if ($(this).val() == "js puns") { //if js puns is selected
            $("#color").children().each(function(x){
                if (x == 1) {
                    $(this).prop("selected",true);
                }
                if (x < 3) {
                    $(this).show(); //display js puns color options
                }
            });
        }
        else if ($(this).val() == "heart js"){ //if heart js is selected
            $("#color").children().each(function(x) {
                if (x == 3) {
                    $(this).prop("selected",true); //get rid of preliminary display and show third
                }
                if (x >= 3 && x < 6) { //exlude the last "please select" option
                    $(this).show(); //show the heart js color options
                }
            });
        }
});


//*** activities portion ***

var tot = 0; //total cost variable
var cnt = 0; //count variable

$('input[type = "checkbox"]').click(function() { //checkbox function for conflicting times
    if ($(this).prop("checked") == true) { //if the checkbox is checked
        if ($(this).prop("name") == "all") {
            tot += 200; //add 200 for main conference being checked
        }
        if ($(this).prop("name") == "js-frameworks") {
            tot += 100; //add 100 for js frameworks workshop
            $("input[name='express']").prop("disabled", true); //disable ability to select express
            $("input[name='express']").parent().css("text-decoration", "line-through"); //put a line through express
        }
        if ($(this).prop("name") == "js-libs") {
            tot += 100; //add 100 for js libs workshop
            $("input[name='node']").prop("disabled", true); //disable ability to select node
            $("input[name='node']").parent().css("text-decoration", "line-through"); //put a line through node
        }
        if ($(this).prop("name") == "express") {
            tot += 100; //add 100 for express
            $("input[name='js-frameworks']").prop("disabled", true); //disable ability to select js frameworks
            $("input[name='js-frameworks']").parent().css("text-decoration", "line-through"); //put a line through js frameworks
            
        }
        if ($(this).prop("name") == "node") {
            tot += 100; //add 100 for node
            $("input[name='js-libs']").prop("disabled", true); //disable ability to select js libs
            $("input[name='js-libs']").parent().css("text-decoration", "line-through"); //put a line through js libs
        }
        if ($(this).prop("name") == "build-tools") {
            tot += 100; //add 100 for build tools. no conflicting times
        }
        if ($(this).prop("name") == "npm") {
            tot += 100; //add 100 for npm. no conflicting times
        }
    }
    if ($(this).prop("checked") == false) {
        if ($(this).prop("name") == "all") {
            tot -= 200; //take away 200 for main conference being unselected
        }
        if ($(this).prop("name") == "js-frameworks") {
            tot -= 100; //subtract 100 for unselecting js frameworks
            $("input[name='express']").prop("disabled", false); //allow user to select express
            $("input[name='express']").parent().css("text-decoration", ""); //remove line through express
        }
        if ($(this).prop("name") == "js-libs") {
            tot -= 100; //subtract 100 for unselecting js libs
            $("input[name='node']").prop("disabled", false); //allow user to select node
            $("input[name='node']").parent().css("text-decoration", ""); //remove line through node
        }
        if ($(this).prop("name") == "express") {
            tot -= 100; //subtract 100 for unselecting express
            $("input[name='js-frameworks']").prop("disabled", false); //allow user to select js frameworks
            $("input[name='js-frameworks']").parent().css("text-decoration", ""); //remove line through js frameworks
        }
        if ($(this).prop("name") == "node") {
            tot -= 100; //subtract 100 for unselecting node
            $("input[name='js-libs']").prop("disabled", false); //allow user to select js libs
            $("input[name='js-libs']").parent().css("text-decoration", ""); //remove line through js libs
        }
        if ($(this).prop("name") == "build-tools") {
            tot -= 100; //subtract 100 for unselecting build tools. no conflicts
        }
        if ($(this).prop("name") == "npm") {
            tot -= 100; //subtract 100 for unselecting npm. no conflicts
        }
    }
    cnt++; //add one to the count of total checked boxes
    $(".activities").append("<p class = total" + cnt + "> Total = $" + tot + "</p>"); //calculate phrase to display at bottom
    var x = "." + "total" + (cnt-1);
    $(x).hide(); //hide the old appended version and display new
});


//*** payment portion ***

$("#paypal").hide(); //initially hide paypal div
$("#bitcoin").hide(); //initially hide bitcoin div

$("#payment").val("Credit Card").prop("selected", true); //auto select credit card as payment option

$("#payment").change(function() { //function for selection of payment option
    if ($("#payment").val() === "Credit Card") { //if credit card is selected
        $("#credit-card").show() //show credit card
        $("#paypal").hide(); //hide paypal
        $("#bitcoin").hide(); //hide bitcoin
    }
    else if ($("#payment").val() === "PayPal") { //if paypal is selected
        $("#paypal").show() //show paypal
        $("#credit-card").hide(); //hide credit card
        $("#bitcoin").hide(); //hide bitcoin
    }
    else if ($("#payment").val() === "Bitcoin") { //if bitcoin is selected
        $("#bitcoin").show() //show bitcoin
        $("#credit-card").hide(); //hide credit card
        $("#paypal").hide(); //hide paypal
    }
});


// *** form validation ***

var formValid = false; //set all validation variables to false since form is empty
var nameValid = false;
var emailValid = false;
var activitiesValid = false;
var ccnumValid = false;
var zipValid = false;
var cvvValid = false;

$("form").append("<p class = error>Please fill out all required fields.</p>"); //message for user to fill out all slots

//validate to ensure name input is not blank

$("#namewrong").hide(); //hide name error message initially

$("#name").keyup(function() { 
    if ($(this).val() != "") {
        nameValid = true;
        $("#namewrong").hide(); //hide error message if correct
    }
    else {
        nameValid = false;
        $("#namewrong").show(); //alert user to follow proper name format
    }
});

//validate to ensure email spot has proper regex

function isValidEmail(address) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(address); //email regex. returns true or false
}

$("#mailwrong").hide(); //hide wrong email format message

$("#mail").keyup(function() {
    if (isValidEmail($(this).val())) {
        emailValid = true; //set var to true if function is true
        $("#mailwrong").hide(); //hide message if format is correct
    }
    else {
        emailValid = false;
        $("#mailwrong").show(); //tell user to fix format with message
    }
});


// validate to ensure activities section is checked

$("#activitieswrong").show();

$('input[type="checkbox"]').change(function() {
    if (tot == 0) {
        activitiesValid = false; //if nothing is checked, set var to false
        $("#activitieswrong").show();
    }
    else {
        activitiesValid = true;
        $("#activitieswrong").hide();
    }
});


// validate to ensure cc num is correct format

$("#ccnumwrong").hide(); //hides error message initially

function isValidCCNum(num) {
    return /^[0-9]{13,16}$/g.test(num); //ccnum regex for 13-16 digit numbers. returns true or false
}

$("#cc-num").on('input', function() {
    if ($('#payment option[value = "Credit Card"]').prop("selected") == true) { //only checks if credit card option is selected
        if (isValidCCNum($("#cc-num").val()) == false) { 
            ccnumValid = false; //if not 13-16 digits, then set var to false
            $("#ccnumwrong").show(); //hide message if proper format
        }
        else {
            ccnumValid = true;
            $("#ccnumwrong").show(); //show message if inproper format
        }
    }
});

//validate to ensure zipcode input is correct format

$("#zipwrong").hide(); //initially hide error message

function isValidZipcode(zip) { 
    return /^[0-9]{5}$/g.test(zip); //zip code regex for 5 digit number. returns true or false
}

$("#zip").keyup(function() {
    if ($('#payment option[value = "Credit Card"]').prop("selected") == true) { //only checks if credit card is selected
        if (isValidZipcode($("#zip").val()) == false) {
            zipValid = false; //if not 5 digits, then set var to false
            $("#zipwrong").show();
        }
        else {
            zipValid = true;
            $("#zipwrong").hide();
        }
    }
});

//validates to ensure cvv is proper format

$("#cvvwrong").hide(); //initially hide cvv error message

function isValidCVV(cvv) {
    return /^[0-9]{3}$/g.test(cvv); //regex for 3 digit cvv. returns true or false
}

$("#cvv").keyup(function() {
    if ($('#payment option[value = "Credit Card"]').prop("selected") == true) { //only checks if credit card option is selected
        if (isValidCVV($("#cvv").val()) == false) {
            cvvValid = false; //if not 3 digits, then set var to false
            $("#cvvwrong").show();
        }
        else {
            cvvValid = true;
            $("#cvvwrong").hide();
        }
    }
});

$("button").click(function() { //on click of the submit button...
    if ($('#payment option[value = "Credit Card"]').prop("selected") == true) { //if credit card is selected
        if (nameValid && emailValid && activitiesValid && ccnumValid && zipValid && cvvValid) //make sure EVERYTHING is true
            formValid = true; //set var to true
    }
    else if (nameValid && emailValid && activitiesValid) //if its not credit card, then only check name, email, and activities
        formValid = true; //set var to true
    if (formValid == false) 
        event.preventDefault(); //prevent default behavior
    if (nameValid === false)
        $("#name").css("border-color", "red"); //if name var is false, set name box border to red
    else
        $("#name").css("border-color", "green"); //otherwise name box border is green
    if (emailValid === false)
        $("#mail").css("border-color", "red"); //if email var is false, set email box border to red
    else
        $("#mail").css("border-color", "green"); //otherwise email box border is green
    if (activitiesValid === false)
        $(".activities").css("border-color", "red"); //if activities var is false, set activities border to red
    else
        $(".activities").css("border-color", "green"); //otherwise activities box border is green
    if (($('#payment option[value = "Credit Card"]').prop("selected") == true)) { //if credit card option is selected
            if (ccnumValid === false)
                $("#cc-num").css("border-color", "red"); //and cc regex is not right, then cc num border color is red
            else
                $("#cc-num").css("border-color", "green"); //otherwise cc num border is green
            if (zipValid === false)
                $("#zip").css("border-color", "red"); //if zip code regex is false, then zip code border color is red
            else
                $("#zip").css("border-color", "green"); //otherwise zip code border is green
            if (cvvValid === false)
                $("#cvv").css("border-color", "red"); //if cvv regex is false, then cvv border color is red
            else
                $("#cvv").css("border-color", "green"); //otherwise cvv border color is green
    }
});


