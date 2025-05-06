document.getElementById('regForm').addEventListener('submit', function (e) {
    let valid = true;

    const mezok = [
        {
            elem: document.getElementById('email'),
            feltetel: (value) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value),
            uzenet: 'Hibás e-mail cím!'
        },
        {
            elem: document.getElementById('nev'),
            feltetel: (value) => value.length >= 5 && value.length <= 30,
            uzenet: 'A név hossza 5 és 30 karakter között kell legyen!'
        },
        {
            elem: document.getElementById('jelszo'),
            feltetel: (value) => value.length >= 6 && value.length <= 12,
            uzenet: 'A jelszó hossza 6 és 12 karakter között kell legyen!'
        },
        {
            elem: document.getElementById('kor'),
            feltetel: (value) => !isNaN(parseInt(value)) && parseInt(value) >= 18 && parseInt(value) <= 100,
            uzenet: 'A kor 18 és 100 között kell legyen!'
        }
    ];

    const nemek = document.getElementsByName('nem');

    // Mezők visszaállítása
    mezok.forEach(({ elem }) => {
        elem.style.backgroundColor = '';
        const elozetesHiba = document.querySelector(`#hiba-${elem.id}`);
        if (elozetesHiba) elozetesHiba.remove();
    });

    // Hiba megjelenítés
    const mutatHibat = (mezo, uzenet) => {
        const hiba = document.createElement('div');
        hiba.id = 'hiba-' + mezo.id;
        hiba.style.color = 'red';
        hiba.style.fontSize = '0.9em';
        hiba.textContent = uzenet;
        mezo.parentNode.appendChild(hiba);
        mezo.style.backgroundColor = '#f99';
        valid = false;
    };

    // Mezők validációja
    mezok.forEach(({ elem, feltetel, uzenet }) => {
        if (!feltetel(elem.value.trim())) {
            mutatHibat(elem, uzenet);
        }
    });

    // Nemek validációja
    const nemHiba = document.querySelector('#hiba-nem');
    if (nemHiba) nemHiba.remove();

    if (!Array.from(nemek).some(nem => nem.checked)) {
        const hiba = document.createElement('div');
        hiba.id = 'hiba-nem';
        hiba.style.color = 'red';
        hiba.style.fontSize = '0.9em';
        hiba.textContent = 'Válassz nemet!';
        nemek[0].parentNode.appendChild(hiba);
        valid = false;
    }

    if (!valid) e.preventDefault();
});
