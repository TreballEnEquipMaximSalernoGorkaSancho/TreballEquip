export let rankings = function () {
    let puntuacions = JSON.parse(sessionStorage.puntuacions || JSON.stringify({
        ranking: [],
    }));

    return {
        crearRanking: function (ranking) {
            if (puntuacions.ranking.length === 0) {
                const div = document.createElement('div');
                div.innerHTML = 'No hi ha puntuacions';
                ranking.append(div);
            }
            else {
                let aux = puntuacions.ranking
                aux.sort(function (a, b) {
                    return b - a;
                });

                aux?.forEach(element => {
                    const div = document.createElement('div');
                    div.classList.add('rank')
                    div.innerHTML = element;
                    ranking.append(div);
                });
            }
        },

        guardarPuntuacio: function (puntuacio) {
            //La veritat que els noms confonen, puntuacions es el array
            puntuacions.ranking.push(puntuacio);
            sessionStorage.puntuacions = JSON.stringify(puntuacions);
        }
    }
}();