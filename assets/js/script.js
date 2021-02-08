let indonesiaEl = {
    lastUpdated: document.getElementById('indonesia_lastupdated'),
    recovered: document.getElementById('indonesia_recovered'),
    confirmed: document.getElementById('indonesia_confirmed'),
    deaths: document.getElementById('indonesia_deaths'),
}
let worldEl = {
    lastUpdated: document.getElementById('world_lastupdated'),
    recovered: document.getElementById('world_recovered'),
    confirmed: document.getElementById('world_confirmed'),
    deaths: document.getElementById('world_deaths'),
}

window.onload = () => {
    this.getID()
    this.getWorldwide()
}

function getID() {
    let endpoint = 'https://covid19.mathdro.id/api/countries/IDN';

    axios.get(endpoint)
        .then(res => {
            console.log(res.data);
            indonesiaEl.lastUpdated.innerHTML = dayjs(res.data.lastUpdate).format('D MMM')
            indonesiaEl.confirmed.innerHTML = formatNumber(res.data.confirmed.value)
            indonesiaEl.deaths.innerHTML = formatNumber(res.data.deaths.value)
            indonesiaEl.recovered.innerHTML = formatNumber(res.data.recovered.value)
        })
}
function getWorldwide() {
    let endpoint = 'https://covid19.mathdro.id/api';

    axios.get(endpoint)
        .then(res => {
            console.log(res.data);
            worldEl.lastUpdated.innerHTML = dayjs(res.data.lastUpdate).format('D MMM')
            worldEl.confirmed.innerHTML = formatNumber(res.data.confirmed.value)
            worldEl.deaths.innerHTML = formatNumber(res.data.deaths.value)
            worldEl.recovered.innerHTML = formatNumber(res.data.recovered.value)
        })
}
function formatNumber(num) {
    if(Math.abs(num) > 1000000) return Math.sign(num)*((Math.abs(num)/1000000).toFixed(2)) + 'm';
    else if(Math.abs(num) > 999) return  Math.sign(num)*((Math.abs(num)/1000).toFixed(0)) + 'k' 
    else  return Math.sign(num)*Math.abs(num)
}

document.getElementById('see').addEventListener('click', function() {
    gsap.to(window, {duration: 1, scrollTo: '#statistics', ease: "power2.out"})
})