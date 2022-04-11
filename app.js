let calcular = document.getElementById("calcular");

let IntComp= [];
let myChart;
let mes;
let año;
let mesEscrito;
let Reporte=[];
let tamaño;
let beneficioMes=0;
let ContadorRep=1;
let InversionMes=[];
let BeneficioMes=[];
let InvVencidasMes=[];
let PorcRecuperado=[];
let BeneficioAcumulado=[];
let mesAño=[];
let Principal=[];
let InversionAcum=[];

calcular.onclick = Calculo;


function Calculo(){
    IntComp= [];
    Reporte=[];
    InversionMes=[];
    BeneficioMes=[];
    InvVencidasMes=[];
    mesAño=[];
    PorcRecuperado=[];
    BeneficioAcumulado=[];
    InversionAcum=[];
    eliminar_tabla()
    const cadenaFecha = document.querySelector("#FechaDeposito").value;
    let MontoInicial = document.getElementById("MontoInicial").value;
    let DiasReinversion = document.querySelector("#DiasReinversion").value;
    scriptsPrincipal(MontoInicial, DiasReinversion, cadenaFecha,367,CargarGrafico,CrearReporte);
    //Principal =[{MesAno:"a",Inversion:1,Beneficio:1,InversionesVencidas:1},{MesAno:"c",Inversion:2,Beneficio:1,InversionesVencidas:1},{MesAno:"b",Inversion:3,Beneficio:1,InversionesVencidas:1},{MesAno:"b",Inversion:4,Beneficio:1,InversionesVencidas:1},{MesAno:"a",Inversion:3,Beneficio:1,InversionesVencidas:1}]
    
    
}
function CrearReporte(genera_tabla){
    for(let index in Principal){
        let indice=0;
    
       if (mesAño.indexOf(Principal[index].MesAno)==-1){
        mesAño.push(Principal[index].MesAno);
        InversionMes.push(Principal[index].Inversion);
        BeneficioMes.push(Principal[index].Beneficio);
        InvVencidasMes.push(Principal[index].InversionesVencidas);
        PorcRecuperado.push(0);
        BeneficioAcumulado.push(0);
       
       } else {
        indice=mesAño.indexOf(Principal[index].MesAno);
        let r=InversionMes[indice];
        let r1=BeneficioMes[indice];
        let r2=InvVencidasMes[indice];
        let r3=PorcRecuperado[indice];
        InversionMes[indice]=r+parseFloat(Principal[index].Inversion);
        BeneficioMes[indice]=r1+parseFloat(Principal[index].Beneficio);
        InvVencidasMes[indice]=r2+parseFloat(Principal[index].InversionesVencidas);
       }
    }
   
    for(let index in mesAño){

     if (BeneficioMes[index]>0){
        //var bene= (BeneficioMes[index]*100)/MontoInicial;
        if (index==0){
            PorcRecuperado[index]=(BeneficioMes[index])/parseFloat(IntComp[1][1]);
            BeneficioAcumulado[index]=(BeneficioMes[index]);
        }else{
            PorcRecuperado[index]=(BeneficioMes[index])/parseFloat(IntComp[1][1])+PorcRecuperado[index-1];
            BeneficioAcumulado[index]=(BeneficioMes[index])+BeneficioAcumulado[index-1];
        }
     }
    

     if (BeneficioMes[index]==0 & index>0){
        PorcRecuperado[index]=PorcRecuperado[index-1];
        BeneficioAcumulado[index]=BeneficioAcumulado[index-1];
     }
     
    }

    genera_tabla();
}

document.getElementById("FechaDeposito").addEventListener("change", function() {
    var input = this.value;
    var dateEntered = new Date(input);
});

function EventOnload(){
    var fecha = new Date();
    document.getElementById("FechaDeposito").value = fecha.toJSON().slice(0,10);
}

function SumarDias(fecha, dias,depositoInicial,Seleccion){
    let r= new Date(fecha);

    //if (Seleccion==0){
    r.setDate(r.getDate() + 1);
    //}
    
    //alert(r.getDay());
    if (dias>0){
        r.setDate(r.getDate() + dias);
    }
    if (r.getDay()==6){
        //alert(6);
         if (depositoInicial==true){
            r.setDate(r.getDate() + 3);
         }else{
            r.setDate(r.getDate() + 2);
         }
    }
    if (r.getDay()==0){
        //alert(5);
        if (depositoInicial==true){
            r.setDate(r.getDate() + 2);
         }else{
            r.setDate(r.getDate() + 1);
         }
    }
    if (r.getDay()==5){
        if (depositoInicial==true){
            r.setDate(r.getDate() + 3);
        }
    }
    
    let dia= r.getDate();
    mes= r.getMonth()+1;
    año= r.getFullYear();
    //let Concatenado= mes + "-" + dia + "-" + año;
    let Concatenado= año + "/" + mes + "/" + dia;
    switch (mes) { 
        case 1: 
        mesEscrito="Enero";
           break 
        case 2: 
        mesEscrito="Febrero";
           break 
        case 3: 
        mesEscrito="Marzo"; 
           break 
        case 4:  
        mesEscrito="Abril";
           break 
        case 5:  
        mesEscrito="Mayo";
           break   
        case 6: 
        mesEscrito="Junio"; 
            break 
        case 7:  
        mesEscrito="Julio";
            break 
        case 8:  
        mesEscrito="Agosto";
            break   
        case 9:  
        mesEscrito="Septiembre";
            break   
        case 10:  
        mesEscrito="Obtubre";
            break   
        case 11:  
        mesEscrito="Noviembre";
            break   
        case 12:  
        mesEscrito="Diciembre";
            break   
    }
    return Concatenado;
}

function genera_tabla(){
    for(let index in mesAño){
        let cuenta= parseInt(index)+1
       //console.log(mesAño[index]);
       addRow("table",mesAño[index],InversionMes[index],BeneficioMes[index],InvVencidasMes[index],cuenta,PorcRecuperado[index],BeneficioAcumulado[index],InversionAcum[index]);
    }
  
}

function addRow(tableID,mes,inversiones,beneficios,inverVencidas,indice,PorcRecuperado,BeneficioAcumulad,InversionAcuml) {
    
    var number = inversiones;
    var myNumeral = numeral (number);
    var InverString = myNumeral.format('$0,0.00');

    var number1 = beneficios;
    var myNumeral1 = numeral (number1);
    var BeneficioString = myNumeral1.format('$0,0.00');
    //console.log(currencyString)

    var number2 = inverVencidas;
    var myNumeral2 = numeral (number2);
    var InverVencString = myNumeral2.format('$0,0.00');

    var number3 = PorcRecuperado;
    var myNumeral3 = numeral (number3);
    var PorcString = myNumeral3.format('%0,0.00');
    
    var number4 = BeneficioAcumulad;
    var myNumeral4 = numeral (number4);
    var BeneficioAcumuladString = myNumeral4.format('$0,0.00');

    var number5 = InversionAcuml;
    var myNumeral5 = numeral (number5);
    var InversionAcumlString = myNumeral5.format('$0,0.00');

    // Obtiene una referencia a la tabla
    var tableRef = document.getElementById(tableID);
    //var tbody = document.getElementById("tbody");
    // Inserta una fila en la tabla, en el índice 0
    var newRow   = tableRef.insertRow(indice)
  
    // Inserta una celda en la fila, en el índice 0

    var newCellmes  = newRow.insertCell(0);
    var newCellInverAcuml  = newRow.insertCell(1);
    
    //var newCellBeneficio  = newRow.insertCell(2);
    //var newCellInverVenc  = newRow.insertCell(3);
    var newCellPorc  = newRow.insertCell(2);
    var newCellBenefAcum  = newRow.insertCell(3);
    //var newCellInver  = newRow.insertCell(4);
   
    
    
  
    // Añade un nodo de texto a la celda
    var newTextmes  = document.createTextNode(mes);
    //var newTextInver  = document.createTextNode(InverString);
    var newTextInverAcuml  = document.createTextNode(InversionAcumlString);
    //var newTextBeneficio  = document.createTextNode(BeneficioString);
    //var newTextInverVenc  = document.createTextNode(InverVencString);
    var newTextPorc  = document.createTextNode(PorcString);
    var newTextBenefAcum  = document.createTextNode(BeneficioAcumuladString);
    newCellmes.appendChild(newTextmes);
    //newCellInver.appendChild(newTextInver);
    newCellInverAcuml.appendChild(newTextInverAcuml);
    //newCellBeneficio.appendChild(newTextBeneficio);
    //newCellInverVenc.appendChild(newTextInverVenc);
    newCellPorc.appendChild(newTextPorc);
    newCellBenefAcum.appendChild(newTextBenefAcum);
  }
  
  function eliminar_tabla(){
      var tabla=document.getElementById("table");
      for (var i=1; i=tabla.rows.length-1; i++) {
        document.getElementById("table").deleteRow(i);
        myChart.destroy();
      }
  }
  

function scriptsPrincipal(CapitalInic, DiasDeReinversion, FechaDepositoInicial, DiasDeCalculo, CargarGrafico){
    let InversionActual=0;
    let Retiro=0;
    let RetiroAcum=0;
    let BeneficioInvertido=0;
    let BeneficioAcum=0;
    let InversVencida=0;
    let FechaInicio;
    let FechaPost;
    let decimal=10;
    let Reinversion="NO";
    
    
    FechaInicio=SumarDias(FechaDepositoInicial, 1,true);
    
    for (var i=1; i<DiasDeCalculo; i++) {
      
if(i>=1 & i<=DiasDeReinversion & DiasDeReinversion>0){
//Reinversion sin retiro DIA 1___________________________________________________________________
if(i==1){
       BeneficioInvertido=parseFloat(CapitalInic);
       InversionActual= parseFloat(CapitalInic);
       IntComp[i]=[i,BeneficioInvertido, InversionActual, InversVencida,Retiro,RetiroAcum,BeneficioAcum, FechaInicio, Reinversion,mesEscrito + " " + año];
       Principal[i]={MesAno:IntComp[i][9],Inversion:BeneficioInvertido,Beneficio:Retiro,InversionesVencidas:InversVencida};
//Reinversion sin retiro DIA 1___________________________________________________________________
}

//_______________________________________________________________________________________________________________________________

//Reinversion sin retiro DIA 2____________________________________________________________________          
if(i==2){
             BeneficioInvertido=parseFloat(CapitalInic)*0.015;
             if(parseFloat(BeneficioInvertido)+parseFloat(BeneficioAcum)>=5){
               InversionActual= parseFloat(CapitalInic) + parseFloat(BeneficioInvertido) + parseFloat(BeneficioAcum);
               BeneficioInvertido=parseFloat(BeneficioInvertido) + parseFloat(BeneficioAcum);
               BeneficioAcum=0;
               Reinversion="SI";
            }
             else{
               InversionActual= CapitalInic;
               BeneficioAcum=parseFloat(BeneficioAcum) + parseFloat(BeneficioInvertido);
               BeneficioInvertido=0;
               Reinversion="NO";
             }
           
    FechaPost=SumarDias(FechaInicio, 0, false);
    FechaInicio=FechaPost;
    IntComp[i]=[i,BeneficioInvertido, InversionActual, InversVencida,Retiro,RetiroAcum,BeneficioAcum, FechaInicio, Reinversion,mesEscrito + " " + año];
    Principal[i]={MesAno:IntComp[i][9],Inversion:BeneficioInvertido,Beneficio:Retiro,InversionesVencidas:InversVencida};
     
    if (IntComp[i][9]!=IntComp[i-1][9]){
        //console.log(IntComp[i-1][9])
        InversionAcum.push(IntComp[i-1][2]);
    }
    if (i==DiasDeCalculo-1){
        //console.log(IntComp[i][9])
        InversionAcum.push(IntComp[i-1][2]);
    }

//Reinversion sin retiro DIA 2______________________________________________________________________ 
}

//__________________________________________________________________________________________________

//Reinversion sin retiro DIA 3 HASTA 134______________________________________________________________________ 
if(i>=3 & i<=135){
            BeneficioInvertido= parseFloat(IntComp[i-1][2])*0.015;
            
             if(parseFloat(BeneficioInvertido)+parseFloat(BeneficioAcum)>=5){
               InversionActual= parseFloat(IntComp[i-1][2]) + parseFloat(BeneficioInvertido) + parseFloat(BeneficioAcum);
               BeneficioInvertido=parseFloat(BeneficioInvertido) + parseFloat(BeneficioAcum);
               BeneficioAcum=0;
               Reinversion="SI";
            }
             else{
               InversionActual= parseFloat(IntComp[i-1][2]);
               BeneficioAcum=parseFloat(BeneficioAcum) + parseFloat(BeneficioInvertido);
               BeneficioInvertido=0;
               Reinversion="NO";
             }
    FechaPost=SumarDias(FechaInicio, 0, false);
    FechaInicio=FechaPost;
    IntComp[i]=[i,BeneficioInvertido, InversionActual, InversVencida,Retiro,RetiroAcum,BeneficioAcum, FechaInicio, Reinversion,mesEscrito + " " + año];
    Principal[i]={MesAno:IntComp[i][9],Inversion:BeneficioInvertido,Beneficio:Retiro,InversionesVencidas:InversVencida};
    
    if (IntComp[i][9]!=IntComp[i-1][9]){
       // console.log(IntComp[i-1][9])
        InversionAcum.push(IntComp[i-1][2]);
    }
    if (i==DiasDeCalculo-1){
        //console.log(IntComp[i][9])
        InversionAcum.push(IntComp[i-1][2]);
    }
    //Reinversion sin retiro DIA 3 HASTA 134______________________________________________________________________ 
}
//_________________________________________________________________________________________________________

//Reinversion sin retiro DIA 135____________________________________________________________________________ 
if(i==136 & DiasDeReinversion>=136){
            InversVencida=CapitalInic;
            BeneficioInvertido= (parseFloat(IntComp[i-1][2])-parseFloat(InversVencida))*0.015;
            
             if(parseFloat(BeneficioInvertido)+parseFloat(BeneficioAcum)>=5){
               InversionActual= parseFloat(IntComp[i-1][2])-parseFloat(InversVencida) + parseFloat(BeneficioInvertido) + parseFloat(BeneficioAcum);
               BeneficioInvertido=parseFloat(BeneficioInvertido) + parseFloat(BeneficioAcum);
               BeneficioAcum=0;
               Reinversion="SI";
            }
             else{
               InversionActual= parseFloat(IntComp[i-1][2])-parseFloat(InversVencida);
               BeneficioAcum=parseFloat(BeneficioAcum)+(BeneficioInvertido);
               BeneficioInvertido=0;
               Reinversion="NO";
             }

    FechaPost=SumarDias(FechaInicio, 0, false);
    FechaInicio=FechaPost;
    IntComp[i]=[i,BeneficioInvertido, InversionActual, InversVencida,Retiro,RetiroAcum,BeneficioAcum,FechaInicio,Reinversion,mesEscrito + " " + año];
    Principal[i]={MesAno:IntComp[i][9],Inversion:BeneficioInvertido,Beneficio:Retiro,InversionesVencidas:InversVencida};
    
    if (IntComp[i][9]!=IntComp[i-1][9]){
        //console.log(IntComp[i-1][9])
        InversionAcum.push(IntComp[i-1][2]);
    }
    if (i==DiasDeCalculo-1){
        //console.log(IntComp[i][9])
        InversionAcum.push(IntComp[i-1][2]);
    }
    //Reinversion sin retiro DIA 135______________________________________________________________________________ 
}
//____________________________________________________________________________________________________________


//Reinversion sin retiro DIA 136 en adelante____________________________________________________________________________ 
if(i>136 & DiasDeReinversion>=136){
            InversVencida=parseFloat(IntComp[i-135][1]);
            BeneficioInvertido= (parseFloat(IntComp[i-1][2])-parseFloat(InversVencida))*0.015;
    
            if(parseFloat(BeneficioInvertido)+parseFloat(BeneficioAcum)>=5){
               InversionActual= parseFloat(IntComp[i-1][2])-parseFloat(InversVencida) + parseFloat(BeneficioInvertido) + parseFloat(BeneficioAcum);
               BeneficioInvertido=parseFloat(BeneficioInvertido)+parseFloat(BeneficioAcum);
               BeneficioAcum=0;
               Reinversion="SI";
            }
             else{
               InversionActual= parseFloat(IntComp[i-1][2])-parseFloat(InversVencida);
               BeneficioAcum=parseFloat(BeneficioAcum)+parseFloat(BeneficioInvertido);
               BeneficioInvertido=0;
               Reinversion="NO";
             }
    FechaPost=SumarDias(FechaInicio, 0, false);
    FechaInicio=FechaPost;
    IntComp[i]=[i,BeneficioInvertido, InversionActual, InversVencida,Retiro,RetiroAcum,BeneficioAcum,FechaInicio, Reinversion,mesEscrito + " " + año];
    Principal[i]={MesAno:IntComp[i][9],Inversion:BeneficioInvertido,Beneficio:Retiro,InversionesVencidas:InversVencida};
    
    if (IntComp[i][9]!=IntComp[i-1][9]){
        //console.log(IntComp[i-1][9])
        InversionAcum.push(IntComp[i-1][2]);
    }
    if (i==DiasDeCalculo-1){
        //console.log(IntComp[i][9])
        InversionAcum.push(IntComp[i-1][2]);
    }
    //Reinversion sin retiro DIA 136 en adelante____________________________________________________________________________ 
}
//______________________________________________________________________________________________________________________
}

if(i>DiasDeReinversion || DiasDeReinversion==0){
//_____________________________________________________________________________________________________________________________________________________
        if(i==1 & DiasDeReinversion==0){
            BeneficioInvertido=parseFloat(CapitalInic);
            InversionActual= parseFloat(CapitalInic);
            IntComp[i]=[i,BeneficioInvertido, InversionActual, InversVencida,Retiro,RetiroAcum,BeneficioAcum, FechaInicio, Reinversion,mesEscrito + " " + año];
            Principal[i]={MesAno:IntComp[i][9],Inversion:BeneficioInvertido,Beneficio:Retiro,InversionesVencidas:InversVencida};
            if (IntComp[i][9]!=IntComp[i-1][9]){
                //console.log(IntComp[i-1][9])
                InversionAcum.push(IntComp[i-1][2]);
            }
            if (i==DiasDeCalculo){
                //console.log(IntComp[i][9]);
                InversionAcum.push(IntComp[i-1][2]);
            }
        }  
//_____________________________________________________________________________________________________________________________________________________
        if(i>135){
              InversVencida=parseFloat(IntComp[i-135][1]);
              Retiro=(parseFloat(IntComp[i-1][2])-parseFloat(InversVencida))*0.015;
    
        if(parseFloat(Retiro)+parseFloat(BeneficioAcum)>=15){
              Retiro=(((parseFloat(IntComp[i-1][2])-parseFloat(InversVencida))*0.015)+parseFloat(BeneficioAcum))*0.8;
              BeneficioInvertido= (((parseFloat(IntComp[i-1][2])-parseFloat(InversVencida))*0.015)+parseFloat(BeneficioAcum))*0.2;
              InversionActual= parseFloat(IntComp[i-1][2])-parseFloat(InversVencida) + parseFloat(BeneficioInvertido);
              BeneficioAcum=0;
              RetiroAcum=parseFloat(RetiroAcum)+parseFloat(Retiro);
              Reinversion="20%";
            }
        else{
               InversionActual= parseFloat(IntComp[i-1][2])-parseFloat(InversVencida);
               BeneficioAcum=parseFloat(BeneficioAcum)+parseFloat(Retiro);
               Retiro=0;
               BeneficioInvertido=0;
               Reinversion="NO";
            }
        }
//_____________________________________________________________________________________________________________________________________________________
        if(i<=135 & i>1){
              Retiro=(parseFloat(IntComp[i-1][2]))*0.015;
           if(parseFloat(Retiro)+parseFloat(BeneficioAcum)>=15){
              Retiro=(((IntComp[i-1][2])*0.015)+BeneficioAcum)*0.8;
              BeneficioInvertido= (((parseFloat(IntComp[i-1][2]))*0.015)+parseFloat(BeneficioAcum))*0.2;
              InversionActual= parseFloat(IntComp[i-1][2]) + parseFloat(BeneficioInvertido);
              BeneficioAcum=0;
              RetiroAcum=parseFloat(RetiroAcum)+parseFloat(Retiro);
              Reinversion="20%";
            }
           else{
               InversionActual= parseFloat(IntComp[i-1][2]);
               BeneficioAcum=parseFloat(BeneficioAcum)+parseFloat(Retiro);
               Retiro=0;
               BeneficioInvertido=0;
               Reinversion="NO";
              }
        }
//_____________________________________________________________________________________________________________________________________________________
    
    FechaPost=SumarDias(FechaInicio, 0, false);
    FechaInicio=FechaPost;
    IntComp[i]=[i,BeneficioInvertido, InversionActual, InversVencida,Retiro,RetiroAcum,BeneficioAcum,FechaInicio, Reinversion,mesEscrito + " " + año];
    tamaño=i;
    Principal[i]={MesAno:IntComp[i][9],Inversion:BeneficioInvertido,Beneficio:Retiro,InversionesVencidas:InversVencida};
    if (IntComp[i][9]!=IntComp[i-1][9]){
        //console.log(IntComp[i-1][9])
        InversionAcum.push(IntComp[i-1][2]);
    }
    if (i==DiasDeCalculo-1){
        //console.log(IntComp[i][9])
        InversionAcum.push(IntComp[i-1][2]);
    }

}
//_____________________________________________________________________________________________________________________________________________________
         //Logger.log(IntComp[i]);
         //alert(IntComp[i])
         console.log(IntComp[i])
      } 
      CargarGrafico();
      CrearReporte(genera_tabla);
}

const labels = [
    1,
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    55,
    60,
    65,
    70,
    75,
    80,
    85,
    90,
    95,
    100,
    105,
    110,
    115,
    120,
    125,
    130,
    135,
    140,
    145,
    150,
    155,
    160,
    165,
    170,
    175,
    180,
    185,
    190,
    195,
    200,
    205,
    210,
    215,
    220,
    225,
    230,
    235,
    240,
    245,
    250,
    255,
    260,
    265,
    270,
    275,
    280,
    285,
    290,
    295,
    300,
    305,
    310,
    315,
    320,
    325,
    330,
    335,
    340,
    345,
    350,
    355,
    360,
    365.
  ];


 
  function CargarGrafico(){
    // Podemos tener varios conjuntos de datos
const Inversiones = {
    label: "Inversiones",
    data: [IntComp[1][2], IntComp[5][2], IntComp[10][2], IntComp[15][2],IntComp[20][2],IntComp[25][2],IntComp[30][2],IntComp[35][2],IntComp[40][2],IntComp[45][2],IntComp[50][2],
    IntComp[55][2], IntComp[60][2], IntComp[65][2], IntComp[70][2], IntComp[75][2], IntComp[80][2], IntComp[85][2], IntComp[90][2], IntComp[95][2], IntComp[100][2], IntComp[105][2],
    IntComp[110][2], IntComp[115][2], IntComp[120][2], IntComp[125][2], IntComp[130][2], IntComp[135][2], IntComp[140][2], IntComp[145][2], IntComp[150][2], IntComp[155][2],
    IntComp[160][2], IntComp[165][2], IntComp[170][2], IntComp[175][2], IntComp[180][2], IntComp[185][2], IntComp[190][2], IntComp[195][2], IntComp[200][2],
    IntComp[205][2], IntComp[210][2], IntComp[215][2], IntComp[220][2], IntComp[225][2], IntComp[230][2], IntComp[235][2], IntComp[240][2], IntComp[245][2], IntComp[250][2], IntComp[255][2],
    IntComp[260][2], IntComp[265][2], IntComp[270][2], IntComp[275][2], IntComp[280][2], IntComp[285][2], IntComp[290][2], IntComp[295][2], IntComp[300][2], IntComp[305][2],
    IntComp[310][2], IntComp[315][2], IntComp[320][2], IntComp[325][2], IntComp[330][2], IntComp[335][2], IntComp[340][2], IntComp[345][2], IntComp[350][2], IntComp[355][2],
    IntComp[360][2], IntComp[365][2]], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
const BeneficiosR = {
    label: "Beneficios Retirados",
    data: [IntComp[1][5], IntComp[5][5], IntComp[10][5], IntComp[15][5],IntComp[20][5],IntComp[25][5],IntComp[30][5],IntComp[35][5],IntComp[40][5],IntComp[45][5],IntComp[50][5],
    IntComp[55][5],  IntComp[60][5],  IntComp[65][5],  IntComp[70][5],  IntComp[75][5],  IntComp[80][5], IntComp[85][5],   IntComp[90][5],  IntComp[95][5], IntComp[100][5], IntComp[105][5],
    IntComp[110][5], IntComp[115][5], IntComp[120][5], IntComp[125][5], IntComp[130][5], IntComp[135][5], IntComp[140][5], IntComp[145][5], IntComp[150][5], IntComp[155][5],
    IntComp[160][5], IntComp[165][5], IntComp[170][5], IntComp[175][5], IntComp[180][5], IntComp[185][5], IntComp[190][5], IntComp[195][5], IntComp[200][5],
    IntComp[205][5], IntComp[210][5], IntComp[215][5], IntComp[220][5], IntComp[225][5], IntComp[230][5], IntComp[235][5], IntComp[240][5], IntComp[245][5], IntComp[250][5], IntComp[255][5],
    IntComp[260][5], IntComp[265][5], IntComp[270][5], IntComp[275][5], IntComp[280][5], IntComp[285][5], IntComp[290][5], IntComp[295][5], IntComp[300][5], IntComp[305][5],
    IntComp[310][5], IntComp[315][5], IntComp[320][5], IntComp[325][5], IntComp[330][5], IntComp[335][5], IntComp[340][5], IntComp[345][5], IntComp[350][5], IntComp[355][5],
    IntComp[360][5], IntComp[365][5]], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(255, 159, 64, 0.2)',// Color de fondo
    borderColor: 'rgba(255, 159, 64, 1)',// Color del borde
    borderWidth: 1,// Ancho del borde
};

  const config = {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            Inversiones,
            BeneficiosR,
            // Aquí más datos...
        ]
    },
    options: {}
  };

  if (myChart) {
    myChart.destroy();
 }

    myChart = new Chart(
    document.getElementById('myChart'),
      config
);  
  }
