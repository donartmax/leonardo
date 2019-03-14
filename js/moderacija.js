var  db = firebase.firestore();
var requestArea = document.querySelector('.requests');

db.collection("zahtevi")
    .onSnapshot(function(querySnapshot) {
        var requests = [];
        querySnapshot.forEach(function(doc) {
            requests.push(doc.data());
            
        });
        console.table(requests);
        requestArea.innerHTML = '';
        requests.sort(function(a,b){
            return new Date(b.created.seconds) - new Date(a.created.seconds);
          });
        for(const request of requests){
            console.log(request);
            requestArea.innerHTML += `<li>${request.message} <button type="submit" onClick=pisanjeOdgovora('${request.team}')>Odgovori</button></li>`;
        }
        console.log("Zahtevi", requests.join(", "));
    });
    

function pisanjeOdgovora(teamName){
    var odgovor = prompt(`Unesi odgovor za tim ${teamName}`);
    db.collection("odgovori").doc(teamName).set({
        answer: odgovor
    })
    .then(function() {
        alert(`Odgovor je poslat timu ${teamName}`)
    })
    .catch(function(error) {
        console.error(`Došlo je do greške do slanja odgovora`);
    });

}