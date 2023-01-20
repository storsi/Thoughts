const sceltaStato = document.getElementById("sceltaStato")
const parConsiderazione = document.getElementById("considerazioni")

document.addEventListener('DOMContentLoaded', () => {
    let url = 'dati.xml'
    fetch(url).then(response=>response.text()).then(data=> {
        let parser = new DOMParser()
        let xml = parser.parseFromString(data, 'application/xml')
        prendiInfo(xml)
    })
})

let stati, considerazioni

function prendiInfo(x) {
    stati = x.getElementsByTagName("stato")
    considerazioni = x.getElementsByTagName("considerazione")

    popolaSelect()
    setConsiderazione(0)
}

function popolaSelect() {

    for(i = 0; i < stati.length; i++) {
        var option = document.createElement("option")
        option.text = stati[i].firstChild.nodeValue
        sceltaStato.add(option)
    }
}

function setConsiderazione(indice) {
    parConsiderazione.innerText = considerazioni[indice].firstChild.nodeValue
}