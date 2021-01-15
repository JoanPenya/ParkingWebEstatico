let listaUsuarios =
[
    //DNI, nombre, apellido, nacimiento, Direccion, contraseña
    ['53178962T','Jason','Borja','1975-01-12','Calle Enea n3','Hola123']
];

let listaParking =
[
    //id, Nombre, Plazas
    ['1','Calle Justiciera','200'],
    ['2','Plaza Pasionaria','510'],
    ['3','Corte Ingles A','890']
];

let listaCoches =
[
    //Matricula, nombre, Modelo, Marca, Asientos, consumo, Propietario
    ['6597TPD','JaguarBlack','Black','Jaguar','5','gasolina', '53178962T'],
    ['7983RDB','SeatPrincesa','Panda','Seat','4','diesel', '75314892O']
];

let listaReservas =
[
    //id, id_parking, DNI_reservante, dia, hora, ID_Coche
    ['1','Calle Justiciera','53178962T','2020-02-14','12:30:00','6597TPD'],
    ['2','Corte Ingles A','53178962T','2020-02-20','12:30:00','6597TPD']
];


function getUserFromStorage(){
    // Recupera l'item del storage i el transforma a un objecte JSON.
	let userObjStorage = JSON.parse(localStorage.getItem("usuario"));
	console.log(userObjStorage);
	let container = document.getElementById("bienvenidoUser");
	container.innerHTML = userObjStorage.name + " " +
    userObjStorage.mobile;

}

function validarCredenciales(pDNI, pContrasena){
    var bAcceso = false;

    for(var i = 0; i < listaUsuarios.length; i++){
        if(pDNI == listaUsuarios[i][0] && pContrasena == listaUsuarios[i][5]){
            bAcceso = true;
            sessionStorage.setItem('usuarioActivo', listaUsuarios[i][1] + ' ' + 
            listaUsuarios[i][2]);
        }
    }

    return bAcceso;
}

function iniciarSesion(){
    var sDNI = '';
    var sContrasena = '';
    var bAcceso = false;

    sDNI = document.querySelector('#UserDNI').value;
    sContrasena = document.querySelector('#UserPassword').value;

    bAcceso = validarCredenciales(sDNI, sContrasena);
    //console.log(bAcceso);

    if(bAcceso == true){
        window.location.href = 'menu.html';
    }
    else{
        alert("Tus credenciales que has introducido, son completamente "
         + "erroneas. Vuelve a intentar");
    }
}

function createListReserva(ID, contenedor){

    for(let i=0; i < ID.length; i++){
        let reserva = ID[i];

        contenedor.innerHTML+="<div class='col-md-12 row'>" + "<div class='col-md-3'>"  + reserva[1] + 
                    "</div>" +
                    "<div class='col-md-3'>" + reserva[4] + "</div>" + "<div class='col-md-3'>" + reserva[3] +
                    "</div>" +

                    "<div class='col-md-3'>" + reserva[5] + "</div>" +

                    "<div class='col-md-6'>" +
                        "<button class='btn btn-primary'>modificar</button>" +
                    "</div>" +
                    "<div class='col-md-6'>" +
                        "<button class='btn btn-danger'>Eliminar</button>" +
                    "</div>" +
                "</div>" +

                "<hr>";

    }

}

function revisarUser(ID, contenedor){

    for(let i=0; i < ID.length; i++){
        let usuario = ID[i];

        contenedor.innerHTML+=
        "<form action='#' >" +
        "<div class='form-group'>" +
            "<label for=''>" + 'DNI:' + "</label>" +
            "<input type='text' value='"+ (usuario[0]) +"'>" +
        "</div>" +

        "<div class='form-group'>" +
            "<label for=''>" + 'Nombre:' + "</label>" +
            "<input type='text' value='"+ (usuario[1]) +"'>" +
        "</div>" +

        "<div class='form-group'>" +
            "<label for=''>" + 'Apellido:' + "</label>" +
            "<input type='text' value='"+ (usuario[2]) +"'>" +
        "</div>" +

        "<div class='form-group'>" +
            "<label for=''>" + 'nacimiento:' + "</label>" +
            "<input type='text' value='"+ (usuario[3]) +"'>" +
        "</div>" +

        "<div class='form-group'>" +
            "<label for=''>" + 'direccion:' + "</label>" +
            "<input type='text' value='"+ (usuario[4]) +"'>" +
        "</div>" +

        "<div class='form-group'>" +
            "<label for=''>" + 'contraseña:' + "</label>" +
            "<input type='pass' value='"+ (usuario[5]) +"'>" +
        "</div>" +
        "<button>Guardar cambios</button>" +
                        "</form>"   
        ;

    }

}

function createListCoche(ID, contenedor){
    
    for(let i=0; i < ID.length; i++){
        let coche = ID[i];

        contenedor.innerHTML+=
        "<div class='col-md-12 row'>" +
                            "<div class='col-md-3'>" + coche[0] + "</div>" +
                            "<div class='col-md-3'>" + coche[1] + "</div>" +
                            "<div class='col-md-2'>" + coche[5] + "</div>" +
                            "<div class='col-md-2'>" + coche[4] + "</div>" +
                            "<div class='col-md-2'>" + "<button class='btn btn-danger'>Eliminar</button>" + "</div>" +
                        "</div>" + "<br>";

    }

}

function checkReservas(){

     // Recuperar los campos del formulario.
  let camp_parking = document.getElementById("parking");
  let camp_dia = document.getElementById("dia");
  let camp_hora = document.getElementById("hora");
  let camp_cocheName = document.getElementById("cocheName");
  let camp_pasajeros = document.getElementById("pasajeros");
  let camp_totalPreu = document.getElementById("totalPreu");

  if(camp_dia.value != "" && camp_hora.value != ""){
    
    listaReservas.push([camp_pasajeros.value, camp_parking.value, camp_totalPreu.value, camp_dia.value, camp_hora.value, camp_cocheName.value]);

    let containerReservas= document.getElementById("pReservas");
    this.createListReserva(listaReservas, containerReservas);

  }else{
    alert("Te falta datos por poner");
    return false;
  }

}

function checkCoches(){
    
     // Recuperar los campos del formulario.
  let camp_nom = document.getElementById("nom");
  let camp_llinatge = document.getElementById("llinatge");
  let camp_nif = document.getElementById("NIF");
  let camp_DataNaixament = document.getElementById("DatNa");
  let camp_telefon = document.getElementById("telefon");
  let camp_email = document.getElementById("email");
  let camp_quota = document.getElementById("quota");
  let camp_typ = document.getElementById("typeplayer");
  //Para recuperar los valores de los campos necesarios.
  let txtData = camp_DataNaixament.value;
  let txtTel = camp_telefon.value;
  let txtEmail = camp_email.value;
  
  if(camp_nom.value != "" && camp_llinatge.value != "" && camp_nif.value != ""  && camp_quota.value != ""){
    
  }else{
      alert("Te falta datos por poner");
  }

}

window.onload=function(){
    console.log("Cargado correctamente");
    //alert("Cargado correctamente");
  
    //div contenedor de las reserva
    let containerReservas= document.getElementById("pReservas");
    this.createListReserva(listaReservas, containerReservas);
  
    //div contenedor de los coches
    let containerCoche= document.getElementById("pCoches");
    this.createListCoche(listaCoches, containerCoche);
    
    //div contenedor del usuario
    let containerUser= document.getElementById("usuare");
    this.createListCoche(listaUsuarios, containerUser);
  
  }