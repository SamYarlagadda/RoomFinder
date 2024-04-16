<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" content="width=device-width, initial-scale=1">
    <style>
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
    }
    
    .topnav {
      overflow: hidden;
      background-color: red;
    }
    
    .topnav a {
      float: left;      
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
    }
    
    .topnav a:hover {
      background-color: black;
      color: white;
    }
    
    .topnav a.active {
      background-color: red;
      color: white;
    }
    /* Dropdown Button */
.dropbtn {
  background-color: red;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* Dropdown button on hover & focus */
.dropbtn:hover, .dropbtn:focus {
  background-color: black;
}

/* The search field */
#myInput {
  box-sizing: border-box;
  background-image: url('searchicon.png');
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 14px 20px 12px 45px;
  border: none;
  border-bottom: 1px solid #ddd;
}

#myInput:focus {outline: 3px solid #ddd;}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  min-width: 230px;
  border: 1px solid #ddd;
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.show {display:block;}
    </style>
    </head>
    <body>
    
    <div class="topnav">
      <a class="active" href="#home">Home</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
      <a class style="float:right">NJIT Room Search</a>
    </div>
    
    <div style="padding-left:16px">
      <h2>NJIT Room Search</h2>
      <p>Welcome to NJIT Room Searcher, this program can be used to find empty classrooms around the NJIT Campus</p>
      <p>Hello World</p>
    </div>
    <div class="dropdown">
      <button onclick="myFunction()" class="dropbtn">Pick Building Name</button>
      <div id="myDropdown" class="dropdown-content">
        <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">
        <a href="#CKB">Central King Building (CKB)</a>
        <a href="#CTR">Campus Center (CTR)</a>
        <a href="#KUPF">Kupfrian Hall (KUPF)</a>
        <a href="#GITC">Guttenberg Information Technologies Center (GITC)</a>
        <a href="#TIER">Tiernan Hall (TIER)</a>
        <a href="#FENS">Fenster Hall (FENS)</a>
        <a href="#CULM">Cullimore Hall (CULM)</a>
      </div>
    </div>
    <script>
      /* When the user clicks on the button,
      toggle between hiding and showing the dropdown content */
      function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
      function filterFunction() {
        var input, filter, ul, li, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("myDropdown");
        a = div.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
          txtValue = a[i].textContent || a[i].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
          } else {
            a[i].style.display = "none";
          }
        }
      }
      </script>
      
    </body>
    </html>
    
