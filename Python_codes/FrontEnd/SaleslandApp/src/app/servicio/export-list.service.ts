import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportListService {  
  constructor(    
  ) { }

  ngOnInit(): void {
  }

  ConvertToCSV(objArray:any, headerList:any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No;';
  for (let index in headerList) {
        row += headerList[index] + ';';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
        let line = (i+1)+'';
        for (let index in headerList) {
          let head = headerList[index];
  line += ';' + array[i][head];
        }
        str += line + '\r\n';
    }
    return str;
  }

  downloadFileUsuarios(data:any, filename = 'Usuarios') {    
    let csvData = this.ConvertToCSV(data, [
        'id_usuario', 'cedula', 'nombre_usuario', 'password'
    ]);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    //let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 & amp; & amp;
    navigator.userAgent.indexOf('Chrome') == -1;
    //if Safari open in new window to save file with random filename.
    //if (isSafariBrowser) {
    //  dwldLink.setAttribute("target", "_blank");
    //}
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }  

  downloadConsult(data:any, filename = 'Consultas',cabeceras:string[]){
    //console.log("data:",data)
    console.log("CSVDATA:",cabeceras)
    //let csvData = this.ConvertToCSV(data, ['id_personal','id_centro_costo','nombre_centro','cuenta','cedula','nombre','apellido','status','ciudad']);
    let csvData = this.ConvertToCSV(data, cabeceras);
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    //let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 & amp; & amp;
    navigator.userAgent.indexOf('Chrome') == -1;
    //if Safari open in new window to save file with random filename.
    //if (isSafariBrowser) {
    //  dwldLink.setAttribute("target", "_blank");
    //}
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }



  downloadFileCandidatos(data:any, filename = 'Candidatos') {
    let csvData = this.ConvertToCSV(data, [
        'cedula', 'nombre', 'apellido', 'genero', 'direccion_domicilio', 'ciudad', 'provincia', 'estado_civil', 'telefono_celular', 'telefono_casa', 'direccion_correo', 'fecha_nacimiento', 'edad', 'nacionalidad', 'status'
    ]);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    //let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 & amp; & amp;
    navigator.userAgent.indexOf('Chrome') == -1;
    //if Safari open in new window to save file with random filename.
    //if (isSafariBrowser) {
    //  dwldLink.setAttribute("target", "_blank");
    //}
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  downloadFileCentrosCosto(data:any, filename = 'Centro_costo') {
    let csvData = this.ConvertToCSV(data, [
        'id_centro_costo', 'nombre_centro', 'tienda', 'cuenta'
    ]);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    //let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 & amp; & amp;
    navigator.userAgent.indexOf('Chrome') == -1;
    //if Safari open in new window to save file with random filename.
    //if (isSafariBrowser) {
    //  dwldLink.setAttribute("target", "_blank");
    //}
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
  
  downloadFileCargos(data:any, filename = 'Cargos') {
    let csvData = this.ConvertToCSV(data, [
        'id_cargo', 'nombre_cargo'
    ]);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    //let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 & amp; & amp;
    navigator.userAgent.indexOf('Chrome') == -1;
    //if Safari open in new window to save file with random filename.
    //if (isSafariBrowser) {
    //  dwldLink.setAttribute("target", "_blank");
    //}
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  downloadFileContratos(data:any, filename = 'Contratos') {
    let csvData = this.ConvertToCSV(data, [
        'id_contrato', 'tipo_contrato', 'fecha_inicio_contrato', 'salario', 'observaciones'
    ]);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    //let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 & amp; & amp;
    navigator.userAgent.indexOf('Chrome') == -1;
    //if Safari open in new window to save file with random filename.
    //if (isSafariBrowser) {
    //  dwldLink.setAttribute("target", "_blank");
    //}
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  downloadFileExperienciasLaborales(data:any, filename = 'Experiencias_Laborales') {
    let csvData = this.ConvertToCSV(data, [
        'id_experiencia_laboral', 'cedula', 'nombre_experiencia', 'tiempo_experiencia', 'estudios_universitarios'
    ]);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    //let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 & amp; & amp;
    navigator.userAgent.indexOf('Chrome') == -1;
    //if Safari open in new window to save file with random filename.
    //if (isSafariBrowser) {
    //  dwldLink.setAttribute("target", "_blank");
    //}
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  downloadFilePersonal(data:any, filename = 'Personal') {
    let csvData = this.ConvertToCSV(data, [
        'id_personal', 'id_centro_costo', 'cedula', 'status', 'adendum_contrato', 'id_contrato', 'id_cargo'
    ]);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    //let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 & amp; & amp;
    navigator.userAgent.indexOf('Chrome') == -1;
    //if Safari open in new window to save file with random filename.
    //if (isSafariBrowser) {
    //  dwldLink.setAttribute("target", "_blank");
    //}
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

}


