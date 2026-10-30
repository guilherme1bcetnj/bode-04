document.getElementById('doppler-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Captura dos valores de entrada
    const vSom = parseFloat(document.getElementById('v-som').value);
    const fFonte = parseFloat(document.getElementById('f-fonte').value);

    const vObs = parseFloat(document.getElementById('v-obs').value);
    const dirObs = parseInt(document.getElementById('dir-obs').value, 10);

    const vFonte = parseFloat(document.getElementById('v-fonte').value);
    const dirFonte = parseInt(document.getElementById('dir-fonte').value, 10);

    const divResultado = document.getElementById('resultado');
    const elFPercebida = document.getElementById('f-percebida');
    const elDetalhes = document.getElementById('detalhes-calculo');

    // Validação de velocidade superSônica / divisão por zero
    const numerador = vSom + (dirObs * vObs);
    const denominador = vSom - (dirFonte * vFonte);

    if (denominador === 0) {
        alert('Erro: A velocidade da fonte é igual à velocidade do som se aproximando (barreira do som / divisão por zero).');
        divResultado.classList.add('hidden');
        return;
    }

    if (denominador < 0) {
        alert('Aviso: A fonte está se movendo a uma velocidade supersônica (maior que a velocidade do som).');
    }

    // Cálculo da Frequência Percebida: f' = f * ((v ± vo) / (v ∓ vf))
    const fPercebida = fFonte * (numerador / denominador);

    // Exibição dos resultados
    elFPercebida.textContent = fPercebida.toFixed(2);
    elDetalhes.textContent = `Fórmula aplicada: f' = ${fFonte} × (${vSom} ${dirObs >= 0 ? '+' : ''} ${dirObs * vObs}) / (${vSom} ${-dirFonte >= 0 ? '+' : ''} ${-dirFonte * vFonte})`;

    divResultado.classList.remove('hidden');
});
