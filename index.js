document.addEventListener('DOMContentLoaded', () => {
    let url = 'dati.xml'
    fetch(url).then(response=>response.text()).then(data=> {
        let parser = new DOMParser()
        let xml = parser.parseFromString(data, 'application/xml')
        prendiGiochi(xml)
    })
})

function prendiGiochi(x) {
    let div = document.getElementById("div")
    let giochi = x.getElementsByTagName("gioco")

    for(i = 0; i < giochi.length; i++) {
        div.innerText += giochi[i].firstChild.nodeValue + " "
    }
}