
const questionArea = document.querySelector('.questions');
const answerArea = document.querySelector('.answer');
let room = '006';
let team = 'Parasaurolofulus';
const questions = ['Kada su prezentacije?', 'Kada je sledeći obrok?', 'Kada su konsultacije?', 'Koja je šifra za internet?'];
const answers = ['Prezentacije su u 16 časova.', 'Sledeći obrok je u 4 sata.', 'Konsultacije su u 5 sati.', 'Šifra za internet je Mu4RovaCa7'];
const db = firebase.firestore();
const customQuestionField = document.querySelector('#question');
const lastAnswerArea = document.querySelector('.notification-content');
let interval;


function login() {
    const password = document.querySelector('#password').value;
    console.log('login', password);
    var teamRef = db.collection("timovi").doc(password);

    teamRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            room = doc.data().sala;
            team = doc.data().ime;
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.main').style.display = 'block';
            console.log(team, room);
            document.querySelector('#teamName').textContent = team;
            document.querySelector('#sala').textContent = room;
            db.collection("odgovori").doc(team)
                .onSnapshot(function (querySnapshot) {
                    var customAnswer = querySnapshot.data();

                    // console.table(customAnswer);
                    lastAnswer(customAnswer.answer);
                    // console.log("Custom answer", customAnswer);
                });
        } else {
            alert("Pogrešna šifra");
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}



function getAnswer(questionID) {
    return answers[questionID];
}

function setAnswer(questionID) {
    document.getElementById('moma').src='img/gif_final.gif'
    clearInterval(interval);
    const slova = { ...getAnswer(questionID) };
    // console.log('slova',slova);
    const broj = slova.length;
    let index = 0;
    answerArea.textContent = '';
    interval = setInterval(function () {
        if (!slova[index]) {
            clearInterval(interval);
            document.getElementById('moma').src='img/Moma.png';
            // console.log(interval);
        }
        else {
            answerArea.textContent += slova[index];
            index++;
        }
    }, 30)

}

function answer(text) {

    answerArea.textContent = text;
}

function lastAnswer(text) {
    document.querySelector('.notification').style.display = "block";
    lastAnswerArea.textContent = `Odgovor: ${text}`;
}


for (const questionID in questions) {
    questionArea.innerHTML += `<button onClick='setAnswer(${questionID})' type="submit">${questions[questionID]}</button)`;
}


function request(type) {
    // Add a new document with a generated id.
    const message = `Tim ${team} iz sale ${room} trai ${type}`;
    db.collection("zahtevi").add({
        message,
        team,
        created: new Date()
    })
        .then(function (docRef) {
            answer(`Zahtev za ${type} je uspešno poslat. Logistika ce doći u salu ${room}`);
        })
        .catch(function (error) {
            answer('Došlo je do greške u našem sistemu, Moma je baš umoran...');
        });

}


function customAsk() {
    var customQuestion = customQuestionField.value;
    if (customQuestion == "") {
        // console.log("Ne treba da pošalje");
    } else {

        var question = `Tim ${team} iz sale ${room} pita: ${customQuestion}`;
        // console.log(question);

        db.collection("zahtevi").add({
            message: question,
            team,
            created: new Date()
        })
            .then(function (docRef) {
                answer(`Pitanje je uspešno poslato.`);
            })
            .catch(function (error) {
                answer('Došlo je do greske u našem sistemu, Moma je baš umoran...');
            });

    }

}




