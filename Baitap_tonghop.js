let listStudent=[
    ["Sv001","rikkei","rikkei@gmail.com","0823868888","Hà Nội","Nam"]
];
let action="create";
let tbody=document.getElementById("content");
function renderData(){
    tbody.innerHTML="";
    for (let index = 0; index <listStudent.length; index++) {
  tbody.innerHTML+=` <tr>
                <td>${[index+1]}</td>
                <td>${listStudent[index][0]}</td>
                <td>${listStudent[index][1]}</td>
                <td>${listStudent[index][2]}</td>
                <td>${listStudent[index][3]}</td>
                <td>${listStudent[index][4]}</td>
                <td>${listStudent[index][5]}</td>
                <td>
                <button onclick="editStudent('${listStudent[index][0]}')">Edit</button>
                <button onclick="deleteStudent('${listStudent[index][0]}')">Delete</button>
                </td>
            </tr>
  `
        
    }
}
function validateForm(){
    let studentId=document.getElementById("studentId").value;
    let Name=document.getElementById("Name").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;
    let address=document.getElementById("address").value;
    let sex = document.querySelector("input[name='sex']:checked").value
    if(studentId==""){
        alert("Vui lòng nhập mã sinh viên");
        return false;
    }
    let emailPattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailPattern){
        alert("Vui lòng nhập email đúng định dạng");
        return false;
    }
    let phonePattern = /^\d{10}$/;
    if(!phone.match(phonePattern)){
        alert("Vui lòng  nhập phone đúng định dạng");
        return false;
    }
    if(address==""){
        alert("Vui lòng nhập địa chỉ");
        return false;
    }
    if(Name==""){
        alert("Vui lòng nhập vào họ và tên");
        return false;
    }
    return true;

}

function createOrEdit(){
    if(validateForm()){
  if(action="create"){
    let studentId=document.getElementById("studentId").value;
    let Name=document.getElementById("Name").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;
    let address=document.getElementById("address").value;
    let sex = document.querySelector("input[name='sex']:checked").value
    listStudent.push([studentId,Name,email,phone,address,sex]);

  }else{
     let index=getStudentByStudentId(studentId);
     listStudent[index][1]=studentName;
     listStudent[index][2]=email;
     listStudent[index][3]=phone;
     listStudent[index][4]=address;
     listStudent[index][5]=sex;
     document.getElementById("studentId").readOnly=false;

    }
    document.getElementById("studentId").value="";
    document.getElementById("Name").value="";
    document.getElementById("email").value="";
    document.getElementById("phone").value="";
    document.getElementById("address").value="";
    document.getElementById("male").checked=true;
    renderData();
  }
}

function getStudentByStudentId(studentId){
    for (let index = 0; index <listStudent.length; index++) {
        if(studentId==listStudent[index][0]){
            return index;
        }
        
    }
    return -1;
}
function editStudent(studentId){
    let index=getStudentByStudentId(studentId)
    if(index>=0){
        document.getElementById("studentId").value=listStudent[index][0];
        document.getElementById("Name").value=listStudent[index][1];
        document.getElementById("email").value=listStudent[index][2];
        document.getElementById("phone").value=listStudent[index][3];
        document.getElementById("address").value=listStudent[index][4];
        if (listStudent[index][5]=="Male") {
            document.getElementById("male").checked=true;   
        }else{
            document.getElementById("female").checked=true; 
        }
        action="edit"; 
        document.getElementById("studentId").readOnly=true;
    }
}
function deleteStudent(studentId){
    let index=getStudentByStudentId(studentId);
    listStudent.splice(index,1);
    renderData();
}

document.onload=renderData();

let btnButton=document.getElementById("btnButton");
btnButton.addEventListener("click",function(event){
    event.preventDefault();
    createOrEdit();
});
