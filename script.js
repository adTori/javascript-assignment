// VÄXLAR MELLAN DARKMODE OCH LIGHTMODE
function mode() {
   let select = document.querySelector("body");
   select.classList.toggle("dark-mode");
}

// TAR BORT GAMLA FÄRGMARKERINGAR
function clearMarkings() {
    document.querySelectorAll(".correct-answer, .wrong-answer, .missed-answer")
        .forEach(marked => {
            marked.classList.remove("correct-answer", "wrong-answer", "missed-answer");
        });
}

// RÄTT SVAR
const correctAnswers = {
    q1: ["B", "D"],
    q2: ["A", "C"],
    q3: ["B"],
    q4: ["Sant"],
    q5: ["A", "C"],
    q6: ["A", "B", "D"],
    q7: ["A", "C"],
    q8: ["Sant"],
    q9: ["A", "D"],
    q10: ["A", "B", "C"],
    q11: ["C"],
    q12: ["Sant"]
};

// HUVUDFUNKTION
function checkCheckbox() {
    clearMarkings();

    let points = 0;

    for (let question in correctAnswers) {

        // Alla inputs per fråga (oavsett checkbox eller radio)
        const inputs = document.querySelectorAll(`input[name="${question}"]`);
        const selected = [...inputs].filter(i => i.checked).map(i => i.value);

        const correct = correctAnswers[question];

        // Markera korrekta och felaktiga svar
        inputs.forEach(input => {
            const label = input.parentElement;

            if (correct.includes(input.value) && input.checked) {
                // Korrekt svar
                label.classList.add("correct-answer");
            }
            else if (!correct.includes(input.value) && input.checked) {
                // Felaktigt svar
                label.classList.add("wrong-answer");
            }
            else if (correct.includes(input.value) && !input.checked) {
                // Facit vid miss av ifyllning eller korrekt svar
                label.classList.add("missed-answer");
            }
        });

        // Poängräkning
        const allCorrect = correct.every(sel => selected.includes(sel));
        const noWrong = selected.every(sel => correct.includes(sel));

        if (allCorrect && noWrong) points++;
    }

    showResult(points);
}

// VISAR RESULTATET
function showResult(points) {
    let total = Object.keys(correctAnswers).length;
    let result = document.querySelector("#result");

    if (points === total) {
        result.style.color = "rgba(68, 108, 3, 1)";
        result.innerHTML = `✨ Riktigt bra jobbat! Du fick ${points} av ${total} rätt! ✨`;
    } else if (points >= total / 2) {
        result.style.color = "rgba(179, 80, 10, 1)";
        result.innerHTML = `Bra jobbat! Du fick ${points} av ${total} rätt.`;
    } else {
        result.style.color = "rgba(178, 0, 0, 1)";
        result.innerHTML = `Underkänt. Du fick ${points} av ${total} rätt – försök igen. ❤️`;
    }
}

// TAR BORT FÄRGMARKERINGAR SAMT TEXT MED RESULTAT
function clearResult() {

    // Tar bort alla färgmarkeringar
    clearMarkings();

    // Tömmer resultattexten
    document.querySelector("#result").innerHTML = "";

    // Avmarkerar alla checkboxar och radioknappar
    document.querySelectorAll("input[type='checkbox'], input[type='radio']")
        .forEach(input => input.checked = false);
}
