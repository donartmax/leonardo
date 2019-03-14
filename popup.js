var modal = document.getElementById('myModal');

var btn = document.getElementById("agenda");

var span = document.getElementsByClassName("close")[0];

var listaAgende = '[{"tekst":"Okupljanje", "vreme":"19:00-19:30"}, {"tekst":"Podela u timove", "vreme":"19:30-20:00"}, {"tekst":"Pocetak hakatona", "vreme":"20:00-23:00"}, {"tekst":"Prvi obrok uz mini druzenje", "vreme":"23:00-00:00"}, {"tekst":"Rad", "vreme":"00:00-02:00"}, {"tekst":"Zabavne aktivnosti", "vreme":"02:00-03:00"}, {"tekst":"Rad", "vreme":"03:00-05:30"}, {"tekst":"Drugi obrok", "vreme":"05:30-06:00"}, {"tekst":"Prezentovanje i zavrsetak hakatona", "vreme":"06:00-07:30"}]';

var lista = JSON.parse(listaAgende);

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


for(const item of lista){

  document.getElementById('proba').innerHTML += "<li>" + item.vreme + " | " + item.tekst + "</li>";

}