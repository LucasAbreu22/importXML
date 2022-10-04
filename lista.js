const url = 'sql.lista.php'

$(function () {
  $("#test").click(function () {
    axios.post(url, {
      call: 'lista',
    }).then(r => {
      console.log('r :', r);
    })
  })
  $("body").on("click", "#upload", function () {

    var fileUpload = $("#fileUpload")[0];

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
        var reader = new FileReader();

        //For Browsers other than IE.
        if (reader.readAsBinaryString) {
          reader.onload = function (e) {
            ProcessExcel(e.target.result);
          };
          reader.readAsBinaryString(fileUpload.files[0]);
        } else {
          //For IE Browser.
          reader.onload = function (e) {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i]);
            }
            ProcessExcel(data);
          };
          reader.readAsArrayBuffer(fileUpload.files[0]);
        }
      } else {
        alert("This browser does not support HTML5.");
      }
    } else {
      alert("Por favor inclua um arquivo XLSX.");
    }
  });
  function ProcessExcel(data) {
    //Read the Excel File data.

    var workbook = XLSX.read(data, {
      type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.

    let excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    let inscricao = []
    let nome = []

    let dados_alunos = []

    for (let i in excelRows) {
      inscricao[i] = excelRows[i].LISTA.split("(")[1].split(")")[0]
      nome[i] = excelRows[i].LISTA.split("(")[0]

      dados_alunos[i] = {
        inscricao: excelRows[i].LISTA.split("(")[1].split(")")[0],
        nome: excelRows[i].LISTA.split("(")[0]
      }
      console.log('dados_alunos :', dados_alunos[i]);

    }
    let evento = 'insert'
    $.ajax({
      type: "POST",
      url: url,
      data: {
        event: evento,
        dados_alunos: dados_alunos,
      },

    }).done(function (result) {
      console.log('result :', result);

    });


    //Create a HTML Table element.
    var table = $("<table />");
    table[0].border = "1";

    //Add the header row.
    var row = $(table[0].insertRow(-1));

    //Add the header cells.
    var headerCell = $("<th />");
    headerCell.html("Nome");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Inscrição");
    row.append(headerCell);


    row.append(headerCell);
    //Add the data rows from Excel file.
    for (let i in excelRows) {
      //Add the data row.
      var row = $(table[0].insertRow(-1));
      //Add the data cells.
      var cell = $("<td />");
      cell.html(nome[i]);
      row.append(cell);

      cell = $("<td />");
      cell.html(inscricao[i]);
      row.append(cell);
    }

    var dvExcel = $("#dvExcel");
    dvExcel.html("");
    dvExcel.append(table);
  }

})