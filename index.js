const titolo = document.getElementsByClassName("titoloGenerale")
const sceltaStato = document.getElementById("sceltaStato")
const parConsiderazione = document.getElementById("considerazioni")
const tabella = document.getElementById("tabella")
const tabellaDatiPer = document.getElementsByClassName("tabellaDati%")
const tabellaDati = document.getElementsByClassName("tabellaDati")
const tuttiGliStatiDiv = document.getElementById("tuttiGliStatiDiv")

document.addEventListener('DOMContentLoaded', () => {
    let url = 'dati.xml'
    fetch(url).then(response=>response.text()).then(data=> {
        let parser = new DOMParser()
        let xml = parser.parseFromString(data, 'application/xml')
        prendiInfo(xml)
    })
})

let stati, considerazioni, datiStato

function prendiInfo(x) {
    stati = x.getElementsByTagName("stato")
    considerazioni = x.getElementsByTagName("considerazione")
    datiStato = x.getElementsByTagName("datoStato")

    popolaSelect()
    setInfoStato()
}

function popolaSelect() {

    for(i = 0; i < stati.length; i++) {

        if((i % 6) == 0) {
            console.log(i)
            var tuttiGliStati = document.createElement("ul")
            tuttiGliStati.className = "tuttiGliStati"

            tuttiGliStatiDiv.appendChild(tuttiGliStati)
        }
        console.log(i + " a")
        tuttiGliStati.innerHTML += "<li><a onclick='setAttivo(" + i + ")'>" + stati[i].firstChild.nodeValue + "</a></li>"

        var option = document.createElement("option")
        option.text = stati[i].firstChild.nodeValue
        option.setAttribute('value', i)
        sceltaStato.add(option)
    }
}

function setAttivo(i) {
    sceltaStato.selectedIndex = i
    window.scrollTo(0, 0);
    setInfoStato()
}

function setInfoStato() {
    var indice = sceltaStato.value
    titolo[0].innerText = "SITUAZIONE ECOLOGICA IN " + stati[indice].firstChild.nodeValue

    parConsiderazione.innerText = considerazioni[indice].firstChild.nodeValue

    tabella.innerHTML = `
        <tr>
            <th>EMISSIONI CO2 PRO CAPITE</th>
            <th>PERCENTUALE FORESTE</th>
        </tr>
        <tr>
            <td>${considerazioni[indice].getAttribute('emissioniPC')}</td>
            <td>${considerazioni[indice].getAttribute('foreste')}</td>
        </tr>
    `

    let split1 = datiStato[indice].getAttribute("enEolica").split(",")
    tabellaDati[0].innerHTML = "<tr><th>TWh prodotti annui</th></tr><tr><td>" + split1[0] + "</td></tr>"
    tabellaDatiPer[0].innerHTML = "<tr><th>% sul totale</th></tr><tr><td>" + split1[1] + "</td></tr>"

    let split2 = datiStato[indice].getAttribute("enSolare").split(",")
    tabellaDati[1].innerHTML = "<tr><th>TWh prodotti annui</th></tr><tr><td>" + split2[0] + "</td></tr>"
    tabellaDatiPer[1].innerHTML = "<tr><th>% sul totale</th></tr><tr><td>" + split2[1] + "</td></tr>"

    let split3 = datiStato[indice].getAttribute("enGeotermica").split(",")
    tabellaDati[2].innerHTML = "<tr><th>TWh prodotti annui</th></tr><tr><td>" + split3[0] + "</td></tr>"
    tabellaDatiPer[2].innerHTML = "<tr><th>% sul totale</th></tr><tr><td>" + split3[1] + "</td></tr>"

    let split4 = datiStato[indice].getAttribute("enIdroelettrica").split(",")
    tabellaDati[3].innerHTML = "<tr><th>TWh prodotti annui</th></tr><tr><td>" + split4[0] + "</td></tr>"
    tabellaDatiPer[3].innerHTML = "<tr><th>% sul totale</th></tr><tr><td>" + split4[1] + "</td></tr>"

    let split5 = datiStato[indice].getAttribute("enNucleare").split(",")
    tabellaDati[4].innerHTML = "<tr><th>TWh prodotti annui</th></tr><tr><td>" + split5[0] + "</td></tr>"
    tabellaDatiPer[4].innerHTML = "<tr><th>% sul totale</th></tr><tr><td>" + split5[1] + "</td></tr>"

    let split6 = datiStato[indice].getAttribute("riciclo").split(",")
    tabellaDati[5].innerHTML = "<tr><th>t rifiuti urbani riciclati</th></tr><tr><td>" + split6[0] + "</td></tr>"
    tabellaDatiPer[5].innerHTML = "<tr><th>% sul totale</th></tr><tr><td>" + split6[1] + "</td></tr>"
}