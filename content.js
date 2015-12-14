//my variabales
var CPNN_data;
var match_data;
var projects = [];
var goback;
var tag;

//the spreadsheet where I am getting the data
var url = 'https://docs.google.com/spreadsheets/d/1AW-1RVY9xTH04iqrVlmojtlBfpDOCFHUulGVbvReNRo/pubhtml?gid=1759587475&single=true';
//var connect_url = 'https://docs.google.com/spreadsheets/d/1KbzS2b5cTt1QXSh416Nd1WYxSLCJ_R5tO-PXMm16ra4/pubhtml?gid=1253544198&single=true';

//Initializing Tabletop (https://github.com/jsoma/tabletop) and the settings to get the data
var settings = {
  key: url,
  callback: gotData,
  simpleSheet: true
}

Tabletop.init(settings);


//Defining the data and calling the function that populates it within the constructor function
function gotData(data) {
  CPNN_data = data;
  dataLength = CPNN_data.length
    // print(data[0].Topics);
    // Look at the data in the console
  loadThem();
}

/*var match_settings = {
  key: connect_url,
  callback: connectData,
  simpleSheet: true
}

Tabletop.init(match_settings);


//Defining the data and calling the function that populates it within the constructor function
function connectData(data) {
  match_data = data;
  match_dataLength = match_data.length;
  //thisMatch();
}*/





/*function thisMatch(){
    for (var i=0; i < match_dataLength; i++){
    if (match_data[i].Engagement === match_data[i].Engagement2 && match_data[i].Topic === match_data[i].Topic2){
    alert(connected);
    } else {
    alert(not);  
    }
  }
}*/



function setup() {
  noCanvas();
}

//Getting all the data into the constructor function
function loadThem() {

  for (var i = 0; i < dataLength; i++) {

    var p = new Project(CPNN_data[i].Image, CPNN_data[i].Project, CPNN_data[i].URL, CPNN_data[i].Description, CPNN_data[i].Topics, CPNN_data[i].Type, CPNN_data[i].Organization);
    projects[i] = p;
  }


}

//Calling the functions from the constructor function
function selection() {
  for (var i = 0; i < projects.length; i++) {
    projects[i].display();
    projects[i].category();
  }

  //Initializing Isotope AFTER loading the data in the page (so it recognizes it)
  initiso();
}

//Some new info to appear in the page after the intro
function next() {
  selection();
  document.getElementById("filters").style.display = "block";
  document.getElementById("head").style.display = "block";
  document.getElementById("intro").style.display = "none";
  goback = createButton("Get involved!");
  goback.parent('buttons');
  goback.mousePressed(again);
}

//Idea form. Inspiration: http://ilivehere.latimes.com/koreatown/
function ideas() {
  document.getElementById("ideas").style.display = "block";
  document.getElementById("head").style.display = "block";
  document.getElementById("intro").style.display = "none";
  goback = createButton("Get involved!");
  goback.parent('buttons');
  goback.mousePressed(again);
}

//where I have the form to submit what members want to offer to others in the community
function connection() {
  document.getElementById("match").style.display = "block";
  document.getElementById("head").style.display = "block";
  document.getElementById("intro").style.display = "none";
  goback = createButton("Get involved!");
  goback.parent('buttons');
  goback.mousePressed(again);
}

//Allows to go back to the project page
function again() {
  location.reload();
}


//Constructor function (where the magic happens)
function Project(tempI, tempN, tempU, tempP, tempT, tempY, tempO) {
  this.img = tempI;
  this.tag = [];
  var tag = this.tag;
  this.url = tempU;
  this.graph = tempP;
  this.name = tempN;
  this.org = tempO;
  this.type = [];
  var category = this.type;

  //split Topics into 
  var topics = tempT;
  topic = split(topics, ",");
  
  var types = tempY;
  type = split(types, ",");

  //now push each element into the "topic" array
  for (var i = 0; i < topic.length; i++) {
    this.tag.push(topic[i]);
  }
  
  for (var j = 0; j < type.length; j++) {
    this.type.push(type[j]);
  }

  //Constructor function that creates select options
  this.category = function() {
    //var topic_selections;
    var string = ".";
    //topic_selections = createSelect();
    //topic_selections.parent('filters');
    //var topic_option = topic_selections.option;
    //topic_option("Topic");

    //Buttons are created from each separate Topic
    for (var i = 0; i < this.tag.length; i++) {
      var res = this.tag[i];
      var other = string.concat(res);
      $('<option>').val(other).text(this.tag[i]).appendTo('#topic_selector');
      //topic_option.attribute("value", other);
    }

    //getting rid of buttons that repeat themselves: http://stackoverflow.com/a/2822974
    var seen = {};
    $('#topic_selector option').each(function() {
      var txt = $(this).text();
      if (seen[txt])
        $(this).remove();
      else
        seen[txt] = true;
    });
    
  for (var j = 0; j < this.type.length; j++) {
      var res2 = this.type[j];
      var other2 = string.concat(res2);
      $('<option>').val(other2).text(this.type[j]).appendTo('#type_selector');
      //topic_option.attribute("value", other);
    }

    //getting rid of buttons that repeat themselves: http://stackoverflow.com/a/2822974
    var seen2 = {};
    $('#type_selector option').each(function() {
      var txt = $(this).text();
      if (seen2[txt])
        $(this).remove();
      else
        seen2[txt] = true;
    });


  }

  //Constructor function that displays the images, other info from the data
  this.display = function() {
    var eldiv = createDiv(this.org);
    eldiv.parent('tata');
    eldiv.addClass('item');
    var linx = createA(this.url, '', '_blank');
    linx.parent(eldiv);
    linx.addClass('looks');
    var other_div = createDiv(this.name);
    other_div.parent(linx);
    other_div.addClass('this_div');
    var description = createP(this.graph);
    description.parent(other_div);
    description.addClass('other_div');
    var ask_button = createButton(this.name);
    ask_button.parent(eldiv);
    ask_button.addClass('ask');
    ask_button.mousePressed(pop_it);
    var visual = createImg(this.img);
    visual.parent(other_div);
    visual.addClass('visual');
    var pop_up = createDiv(this.name);
    pop_up.parent(eldiv);
    pop_up.addClass('pop');
    var button_div = createDiv('');
    button_div.parent(pop_up);
    button_div.addClass('button_div');
    var close_button = createButton("x");
    close_button.parent(button_div);
    close_button.addClass('close');
    close_button.mousePressed(close_it);
    var tags = createElement("form", "Choose a question:");
    tags.parent(pop_up);
    //tags.attribute("onsubmit", "javascript: postTagsToGoogle()");
    //tags.attribute("action", "javascript: postTagsToGoogle()");
    tags.attribute("target", "_self");
    tags.addClass('tags');
    var your_tag = createSelect();
    your_tag.parent(tags);
    your_tag.option("How much time did it take?");
    your_tag.option("What were the steps to implement the project?");
    your_tag.option("What worked well and why?");
    your_tag.option("What didn't work well and why?");
    your_tag.option("What would you change if you had to do it again?");
    your_tag.attribute("name", this.name);
    var tag_id = this.name;
    var noSpaceId = tag_id.replace(/ /g, '');
    your_tag.attribute("id", noSpaceId);
    var your_project = createInput(this.name);
    your_project.parent(tags);
    your_project.attribute("type", "text");
    your_project.attribute("name", this.org);
    var project_id = this.org;
    var noSpaceId2 = project_id.replace(/ /g, '');
    your_project.attribute("id", noSpaceId2);
    //your_project.attribute("id", this.project);
    your_project.hide();
    var tag_button = createButton("Submit");
    tag_button.parent(tags);
    tag_button.addClass('tagButton');
    tag_button.attribute("type", "submit");
    tag_button.mousePressed(postTagsToGoogle);
  //tag_button.mousePRessed(postTagsToGoogle(tag_id);

    function pop_it() {
      pop_up.show();
    }

    function close_it() {
      pop_up.hide();
    }
    

    //other_div.addClass('other_div');
    //other_div.hide();
    //description.hide();

    //Hover that calls functions to replace divs with each other
    eldiv.mouseOver(rollover);
    eldiv.mouseOut(rollout);

    //Adding classes to topics so they correspond to the buttons
    for (var i = 0; i < this.tag.length; i++) {
      eldiv.addClass(this.tag[i]);
    }
    
    for (var j = 0; j < this.type.length; j++) {
      eldiv.addClass(this.type[j]);
    }

    /*for (var j = 0; j < other_div.length; j++) {
      ask_button.parent(other_div[j]);
    }*/


    //Tried to make all elements consistent
    /*for (var j = 0; j < visual.length; j++) {
    var imgheight = visual[j].height;
    console.log(imgheight);
    other_div[j].style('height',imgheight);
    visual_div[j].style('height',imgheight);
    eldiv[j].style('height',imgheight);
    var imgwidth = visual[j].width;
    other_div[j].style('width',imgwidth);
    visual_div[j].style('width',imgwidth);
    eldiv[j].style('width',imgwidth);
    }*/

    //Functions that replace the image div with the paragraph one
    function rollover() {
      visual.style('opacity', '0');
      description.style('opacity', '1');
      eldiv.style('color', 'transparent');
      other_div.style('color', 'transparent');
      ask_button.html('Ask a question');
      ask_button.style('opacity', '1');
    }

    function rollout() {
      visual.style('opacity', '1');
      description.style('opacity', '0');
      eldiv.style('color', 'black');
      other_div.style('color', 'black');
      ask_button.style('opacity', '0');
    }
   
   //Reference to push form submissions to google sheets: https://wiki.base22.com/pages/viewpage.action?pageId=72942000
    function postTagsToGoogle() {
      var id_tag = "#";
      var tag_id2 = id_tag.concat(noSpaceId);
      var project_id2 = id_tag.concat(noSpaceId2);
      var projectz = $(project_id2).val();
      var tagz = $(tag_id2).val();
      alert(tagz);
      if ((projectz !== null) && (tagz !== null)) {
        $.ajax({
          url: "https://docs.google.com/forms/d/1sNRfJ9wcA_UzR5BzTOuH80QL83267K2MiRwUNhz_IDk/formResponse",
          data: {
            "entry.844101404": projectz,
            "entry.750469736": tagz
          },
          type: "POST",
          dataType: "xml",
          statusCode: {
            0: function() {
              $(tag_id2).val("");
              $(project_id2).val(tag_id);
              close_it();
              //Success message
            },
            200: function() {
              $(tag_id2).val("");
              $(project_id2).val(tag_id);
              //Success message
            }
          }
        });
      } else {
        //Error message
        alert("error");
      }
    }

  };


}

//Calls the idea madlibs
function awesomeIdea() {
  document.getElementById("ideas").style.display = "none";
  document.getElementById("this_idea").style.display = "block";
  var brief = document.getElementById("brief").value;
  var community = document.getElementById("community").value;
  var location = document.getElementById("location").value;
  var engagement_type = document.getElementById("engagement-type").value;
  var example = document.getElementById("example").value;
  var other_comment = document.getElementById("comment").value;
  var words = "My idea involves " + brief + " with " + community + " in " + location 
  + ". My community will be able to " + engagement_type + ", like how it was done in " + example + ".";

  //Alerts users if they haven't filled all the fields
  if (!brief || !community || !location || !engagement_type || !example) {
    document.getElementById("this_idea").style.display = "none";
    document.getElementById("ideas").style.display = "block";
    alert("You are not done yet!");
  } else {
    document.getElementById('show-idea').innerHTML = words;
    document.getElementById('more-idea').innerHTML = other_comment;
  }
}

//Function to resets the form
function resetform() {
  document.getElementById("CPNN-form").reset();
}

//Functions that are called to open pop-up windows
function share() {
  window.open("https://groups.google.com/a/propublica.org/forum/#!newtopic/crowd-powered", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
}

function apply() {
  window.open("http://propub.ca/crowdpowered", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
}

function QA() {
  window.open("https://docs.google.com/forms/d/1i1TR64IQHUVa_dLMqYtj8G7xHn-vxvzipI3K-jBaVA4/viewform", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
}

function nomination() {
  window.open("https://twitter.com/hashtag/CPNN", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
}

//Reference to post form submissions to a google sheet: https://wiki.base22.com/pages/viewpage.action?pageId=72942000
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function postOfferToGoogle() {
  var help = $('#help').val();
  var engagement = $('#engagement').val();
  var topic = $('#topic').val();
  var name = $('#your_name').val();
  var email = $('#email').val();

  if ((help !== null) && (engagement !== null) && (topic !== null) && (name !== null) && (email !== null) && (validateEmail(email))) {
    $.ajax({
      url: "https://docs.google.com/forms/d/1WPgvX2I7DWU__bLRgB2lEdMGb0CAn8rFcDoVTEQgRLM/formResponse",
      data: {
        "entry.1610230995": help,
        "entry.743980922": engagement,
        "entry.483413932": name,
        "entry.2110360915": email,
        "entry.667103439": topic
      },
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function() {
          $('#help').val("");
          $('#engagement').val("");
          $('#topic').val("");
          $('#your_name').val("");
          $('#email').val("");
          //Success message
          message();

        },
        200: function() {
          $('#help').val("");
          $('#engagement').val("");
          $('#topic').val("");
          $('#your_name').val("");
          $('#email').val("");
          //Success Message
        }
      }
    });
  } else {
    //Error message
    alert("E-mail submitted was not recognized.");
  }
}




function message() {
  document.getElementById("helping").style.display = "none";
  var thanks = createP("Thank you for participating. You can get help from other members through the directory.");
  thanks.parent('match');
  thanks.style('text-align', 'center');
}
