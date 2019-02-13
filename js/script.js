////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const students =        document.getElementsByClassName('student-item cf');//Total of studets
const ul =              document.createElement("ul");                      //Paginator: For creating the ul
let   startPage =       1;    //AppendPageLinks: This variable is set to 1 to start in the index [1] not [0]
const studentsPerPage = '10'; //GetNumberOfPages,FirstPage: Used to store the desire amount of users per page
const inputSearch=       document.createElement('input');   //Search:    For creating the input
const buttonSearch=      document.createElement('button');  //Search:    For creating the button 
const divPagination =   document.createElement("div");                  //Paginator: For creating the div

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Pagination: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pagination(){
const parent =          document.querySelector('.page');                // Paginator: Used at insertBefor as the parent
const reference =           document.querySelector('.student-list');    //Paginator: Used at insertBejore as the child
   divPagination.className = "pagination"; 
   divPagination.appendChild(ul);                                       //Using appendchild to insert ul inside pagination class
   parent.insertBefore(divPagination, reference.nextElementSibling);    // Using other method to insert divPagination
}

// AppendPageLinks: This function creates the Page numbers as well as the links
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function appendPageLinks(){
   for(i=0;i<getNumberOfPages();i++){
      var li = document.createElement('li');
      var a = document.createElement('a');
          a.href = '#';
         a.textContent = startPage.toString();
      startPage++;
      ul.appendChild(li);
      li.appendChild(a);
      }
   }
// getNumberOfPages: Used to know the number of pages deppending on the amount of students
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getNumberOfPages(){
   return Math.ceil(students.length / studentsPerPage);
} //console.log("Number of pages Students diveded by 10: " + getNumberOfPages());

// FirstPage: User to show the first 10 users every time the page gets refreshed
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function firstPage() {
   for (let i = 0; i < students.length; i++) {
       if (i < studentsPerPage) {
           students[i].style.display = 'block';
       } else {
           students[i].style.display = 'none';
       }
   }
}
// ShowArea: Used to show the users corresponding to the page pressed by the user, using eventListener
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showArea (){
const paginationButtons = document.querySelector('.pagination');
      paginationButtons.addEventListener('click',(event) =>{
      event.preventDefault();
let btnNumber = parseInt(event.target.textContent);
   //console.log("You Clicked the button number : "+btnNumber);
      let top = btnNumber*10;
      let bottom = top -10;
      for(let i=0 ;i <students.length; i++){ 
         if (i >= bottom && i<top){
            students[i].style.display = 'block';
         } else{
            students[i].style.display = 'none';
         }
      }      
   });
}
// InsertSearch: Used to insert search input and button, same process as pagination, but this time in a function
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function InsertSearch(){
   const pageHeader =      document.querySelector('.page-header');
   const divSearch=        document.createElement('div');     //Search:    For creating the div 
   
      pageHeader.appendChild(divSearch);
      divSearch.className="student-search";
      divSearch.appendChild(inputSearch);
      divSearch.appendChild(buttonSearch);
      inputSearch.placeholder ="Search for students...";
      buttonSearch.textContent="Search";
   }



// SarchStudents: Used to search the students name, eventlistener's for triggering the search
////////////////////////////////////////////////////////////////////////////////////////////////////////////  
inputSearch.addEventListener('keydown',(searchStudents)); //EventListener: Keydown at input search, triggers searchStudents
buttonSearch.addEventListener('click',(searchStudents));  //EventListener: Click on button search, triggers searchStudents

function searchStudents(){         
         let count=0; 
         let searchValue = inputSearch.value.toLowerCase();
         let studentsName = document.getElementsByTagName('h3');
         Array.from(studentsName).forEach(function(item){  
         let itemName = item.firstChild.textContent;
         let index = itemName.toLowerCase().indexOf(searchValue);
            if(index != -1){
               item.parentElement.parentElement.style.display = "block";
               document.querySelector('h2').textContent = "Students";
               divPagination.style.display = "block"; 
            }else{
               item.parentElement.parentElement.style.display = "none";
                  count++;
            }
         });
         if(count == students.length){
             document.querySelector('h2').textContent = "No results have been found";
             divPagination.style.display = "none";  
             //console.log(count+" equals "+ students.length)
          }
         
      };
   
// Calling the functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////   
firstPage();      //Loads the first 10 students
pagination();     //Adds pagination deppending on the number of students
showArea();       //Shows only 10 users at a time when li element its clicked
InsertSearch();   //Appends search input and button
appendPageLinks();//Appends li for the pagination
