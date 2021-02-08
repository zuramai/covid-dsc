
let elements = {
    lastUpdated: document.getElementById('province_lastupdated'),
    recovered: document.getElementById('province_recovered'),
    confirmed: document.getElementById('province_confirmed'),
    deaths: document.getElementById('province_deaths'),
}

window.onload = () => {
    let data = [];
    let chooseProvince = document.getElementById('choose-province');
    let provinceName = document.getElementById('province-name')

    axios.get('https://indonesia-covid-19.mathdro.id/api/provinsi')
        .then(res => {
            data = res.data.data;

            
            console.log(data)
            data.forEach(province => {
                let option = document.createElement('option');
                option.setAttribute('value', province.kodeProvi);
                option.setAttribute('data-value', JSON.stringify(province));
                option.innerText = province.provinsi;
                chooseProvince.appendChild(option)
            });
        })

    chooseProvince.addEventListener('change', (e) => {
        let provinceData = JSON.parse(chooseProvince.options[chooseProvince.selectedIndex].getAttribute('data-value'));
        console.log(provinceData)
        document.querySelector('#statistics.province').style.display = 'block';
        provinceName.innerText = provinceData.provinsi

        elements.lastUpdated.innerText = dayjs().format('D MMM')
        elements.confirmed.innerText = provinceData.kasusPosi
        elements.recovered.innerText = provinceData.kasusSemb
        elements.deaths.innerText = provinceData.kasusMeni
    })

    document.getElementById('btn-submit').addEventListener('click',() => {
        gsap.to(window, {
            scrollTo: '#statistics',
            duration: 1,
            ease: "power2.out"
        })
    })
}