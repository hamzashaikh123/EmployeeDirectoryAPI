//global variables
let employees=[];
const urlAPI='https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture&noinfo';
const gridContainer=document.querySelector(".grid-container");
const overlay=document.querySelector('.overlay');
let modalClose=document.querySelector(".modal-close");


//fetch API 

fetch(urlAPI)
    .then(res=>res.json())
    .then(res=>res.results)
    .then(displayEmployees)
    .catch(err=>console.log(err));

//displayEmployees Fucntion
function displayEmployees(empData){
    employees=empData;
    let employeeHTML ='';

    employees.forEach((employee,index)=>{
        let name=employee.name;
        let email= employee.email;
        let city = employee.location.city;
        let picture= employee.picture;
        
        employeeHTML+=`
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}"/>
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email"> ${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        `
    });
    gridContainer.innerHTML=employeeHTML;
}


//display modal function
function displayModal(index){
   //use object destructuring make our template literal cleaner 
   let{
        name,
        dob,
        phone,
        email,
        location:{
                city,
                street, 
                state,
                postcode},
            picture
    }=employees[index];
    
    const modalContainer=document.querySelector(".modal-content");
   let date = new Date(dob.date);

   let modalHTML=`
    <img class ="avatar" src="${picture.large}"/>
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email"> ${email}</p>
        <p class="address">${city}</p>
        </hr>
        <p> ${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p> Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
        </p>
    </div>
   `;
   overlay.classList.remove('hidden');
   modalContainer.innerHTML=modalHTML;
   
}

gridContainer.addEventListener('click', e=>{
    //make sure the click is not on the gridContainer itself
    if(e.target !==gridContainer){
        const card=e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

modalClose.addEventListener('click',()=>{
    overlay.classList.add("hidden");
});

