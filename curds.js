//get total


let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood ='create';  // default mood
let tmp; // global variable

function getTotal(){
    if(price.value != ''){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value ;
        total.innerHTML=result;
        total.style.backgroundColor="#040"
    }else{
        total.innerHTML=' ';
        total.style.backgroundColor="#a00d02"

    }
}

// create product


let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product) //هنا بقا برجعها لاصلها
}else{
    dataPro=[]
}


submit.onclick=function(){
    
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value

    }
    clear();

       
if(mood==='create'){
    // هنا بحدد هضيف كام عنصر بناءا على قيمة ال count
    if(newPro.count>1){
        for(i=0;i<newPro.count;i++){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }
}else{
    dataPro[tmp]=newPro;
    mood='create'
    count.style.display='inline'
    submit.innerHTML='create'
}
localStorage.setItem('product',JSON.stringify(dataPro))  //عشان هي مش بتقبل غير string فعملت كده
    showData();

}

    
    


// clear input.value


function clear(){
    title.value='';
    price.value='';
     taxes.value='';
     ads.value='';
     discount.value='';
     total.innerHTML='';
     count.value='';
     category.value='';

}
//read product in table

function showData(){
    getTotal();
    let table='';
    for(i=0;i<dataPro.length;i++){
        table+=`
        
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updProduct(${i})' id="update" >update</button></td>
        <td><button onclick='dleProduct(${i})' id="delete">delete</button></td>
    </tr>
        `
        
    }
    
    document.getElementById('tbody').innerHTML=table;
    
    // create all delete button

    let all =document.getElementById('all');
    if (dataPro.length>0 ){
        all.innerHTML=`<button onclick=(deleteAllProducts()) >Delete all (${dataPro.length})</button>`;
    }
    else{
        all.innerHTML='';
    }
    

}
showData();//نديت عليها بره عشان الداتا تظهر مجرد مااعمل ريلوود


// delete product

function dleProduct(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData(); //عشان كل ماامسح يعمل ريلود لوحده واشوف العناصر تاني من غير العنصر الممسوح
}

// delete all



function deleteAllProducts(){
    localStorage.clear();
    dataPro.splice(0)
    showData()
}

//update product
function updProduct(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
 
    count.style.display='none';
    submit.innerHTML='update'
    category.value=dataPro[i].category
    mood='update'
    tmp=i;
    scroll(
        {
            top:0,
            behavior:'smooth'
        }
    )

}

//search button mood
let searchMood='title';
function getSearchMood(id){
    let search=document.getElementById('search');
    if(id=='title'){
        searchMood='title'
        search.placeholder='search by title'
    }
    else{
        searchMood='category'
        search.placeholder='search by category'
    }
    search.focus();
}

//search product

function searchPro(value){
    let table=' ';
   

        if(searchMood =='title'){
            for(let i=0;i<dataPro.length;i++){

          
               if(dataPro[i].title.includes(value)){
              
                   table+=`
               
               <tr>
               <td>${i}</td>
               <td>${dataPro[i].title}</td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].ads}</td>
               <td>${dataPro[i].discount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].category}</td>
               <td><button onclick='updProduct(${i})' id="update" >update</button></td>
               <td><button onclick='dleProduct(${i})' id="delete">delete</button></td>
           </tr>
               `;
            }} }
               
        else{
                for(let i=0;i<dataPro.length;i++){
                       if(dataPro[i].category.includes(value)){
                           table+=`
                       
                       <tr>
                       <td>${i}</td>
                       <td>${dataPro[i].title}</td>
                       <td>${dataPro[i].price}</td>
                       <td>${dataPro[i].taxes}</td>
                       <td>${dataPro[i].ads}</td>
                       <td>${dataPro[i].discount}</td>
                       <td>${dataPro[i].total}</td>
                       <td>${dataPro[i].category}</td>
                       <td><button onclick='updProduct(${i})' id="update" >update</button></td>
                       <td><button onclick='dleProduct(${i})' id="delete">delete</button></td>
                   </tr>
                       `;
       
               }}}
               document.getElementById('tbody').innerHTML=table;
               
            

   
        
        
}