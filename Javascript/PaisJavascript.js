const $containPais=document.getElementById('contain_pais')


let id=localStorage.getItem('id')


const retornarPaisNombre=async()=>{

    try {
    await fetch(`https://restcountries.com/v3.1/name/${id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        data=data[0];
        console.log(data)

        const moneda=data.currencies;
        const monedaIndex=moneda[Object.keys(moneda)[Object.keys(moneda).length-1]];
        let monedaHtml='';
        for (const key in moneda) {
            if(moneda[key]!==monedaIndex){
                monedaHtml+=`${moneda[key].name}, `
            }else{
                monedaHtml+=`${moneda[key].name}`
            }
        }


        const lenguages=data.languages;
        const lenguagesIndex=lenguages[Object.keys(lenguages)[Object.keys(lenguages).length-1]];
        let lenguagesHtml='';

        for (const key in lenguages) {
            if (lenguages[key]!==lenguagesIndex) {
                lenguagesHtml+=`${lenguages[key]}, `
            }else{
                lenguagesHtml+=`${lenguages[key]}`
            }
        }



        const fronteras=data.borders;
        let fronterasHtml=''
        for (const key in fronteras) {
            fronterasHtml+=`<a href='../Info_pais/pais.html' class='link_border'><span class='border' data-id='${fronteras[key]}'>${fronteras[key].toLowerCase()}</span></a>`
        }

        const nombreNativo=data.name.nativeName;
        let nombreNativoHtml='';

        for (const key in nombreNativo) {
                nombreNativoHtml=nombreNativo[key].common
            }

        let pais=`
            <div class='card__pais'>
                <div class='card__pais__img'>
                    <img src='${data.flags.png}' alt='bandera de ${data.name.common}'>
                </div>
                <footer class='card__pais__information'>
                    <h4 class='card__pais__title'>${data.name.common}</h4>
                    <div class='card__pais__information__extra'>
                        <div class='card__pais__native'>
                            <p><strong>Nombre nativo:</strong> ${nombreNativoHtml}</p>
                            <p><strong>Poblacion:</strong> ${Intl.NumberFormat("de-DE").format(data.population)}</p>
                            <p><strong>Region:</strong> ${data.region}</p>
                            <p><strong>Sub Region:</strong> ${data.subregion}</p>
                            <p><strong>Capital:</strong> ${data.capital?data.capital:'Sin identificar'}</p>
                        </div>
                        <div class='card__pais__laguages'>
                            <p><strong>Dominio de primer nivel:</strong> ${data.tld[0]}</p>
                            <p><strong>Moneda:</strong> ${monedaHtml}</p>
                            <p><strong>Idiomas:</strong> ${lenguagesHtml}</p>
                        </div>
                       
                    </div>
                    <div class='card__pais__borders'>
                    <p><strong>Paises vecinos:</strong></p><div class='contain__borders'>${fronterasHtml?fronterasHtml:'Sin fronteras'}</div>
                    </div>
                </footer>
            </div>
        `
        
        $containPais.innerHTML=pais
        const isActive=localStorage.getItem('LingthMode')
        if(isActive){
    document.querySelector('body').classList.add('lingth_Back')
    document.querySelector('.header__main').classList.add('lingth_Back')
    document.querySelector('.contain__icon-back').classList.add('lingth_item')
    document.querySelectorAll('.border').forEach(item=>item.classList.add('lingth_item'))
        }
    })
    } catch (error) {
        
    }
}

const retornarPaisCodigo=async()=>{

    try {
    await fetch(`https://restcountries.com/v2/alpha/${id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)

        const moneda=data.currencies?data.currencies:null;
        let monedaHtml='';
        if(moneda!==null){
            const monedaIndex=moneda[Object.keys(moneda)[Object.keys(moneda).length-1]];
        
        for (const key in moneda) {
            if(moneda[key]!==monedaIndex){
                monedaHtml+=`${moneda[key].name}, `
            }else{
                monedaHtml+=`${moneda[key].name}`
            }
        }
        }else{
            monedaHtml='Sin informacion'
        }
        

        const lenguages=data.languages;
        const lenguagesIndex=lenguages[Object.keys(lenguages)[Object.keys(lenguages).length-1]];
        let lenguagesHtml='';

        for (const key in lenguages) {
            console.log(lenguages[key])
            if (lenguages[key]!==lenguagesIndex) {
                lenguagesHtml+=`${lenguages[key].name}, `
            }else{
                lenguagesHtml+=`${lenguages[key].name}`
            }
        }



        const fronteras=data.borders;
        let fronterasHtml=''
        for (const key in fronteras) {
            fronterasHtml+=`<a href='../Info_pais/pais.html' class='link_border'><span class='border' data-id='${fronteras[key]}'>${fronteras[key].toLowerCase()}</span></a>`
        }

        const nombreNativo=data.name.nativeName;
        let nombreNativoHtml='';

        for (const key in nombreNativo) {
                nombreNativoHtml=nombreNativo[key].common
            }

        let pais=`
            <div class='card__pais'>
                <div class='card__pais__img'>
                    <img src='${data.flags.png}' alt='bandera de ${data.name}'>
                </div>
                <footer class='card__pais__information'>
                <h4 class='card__pais__title'>${data.name}</h4>
                <div class='card__pais__information__extra'>
                    <div class='card__pais__native'>
                        <p><strong>Nombre nativo:</strong> ${data.nativeName}</p>
                        <p><strong>Poblacion:</strong> ${Intl.NumberFormat("de-DE").format(data.population)}</p>
                        <p><strong>Region:</strong> ${data.region}</p>
                        <p><strong>Sub Region:</strong> ${data.subregion}</p>
                        <p><strong>Capital:</strong> ${data.capital?data.capital:'Sin identificar'}</p>
                    </div>
                    <div class='card__pais__laguages'>
                        <p><strong>Dominio de primer nivel:</strong> ${data.topLevelDomain[0]}</p>
                        <p><strong>Monedas:</strong> ${monedaHtml}</p>
                        <p><strong>Idiomas:</strong> ${lenguagesHtml}</p>
                    </div>
                   
                </div>
                <div id='id-border' class='card__pais__borders'>
                <p><strong>Paises vecinos:</strong></p><div class='contain__borders'>${fronterasHtml?fronterasHtml:'Sin fronteras'}</div>
                </div>
                </footer>
            </div>
        `
        
        $containPais.innerHTML=pais

    const isActive=localStorage.getItem('LingthMode')
    if(isActive){
    document.querySelector('body').classList.add('lingth_Back')
    document.querySelector('.header__main').classList.add('lingth_Back')
    document.querySelector('.contain__icon-back').classList.add('lingth_item')
    document.querySelectorAll('.border').forEach(item=>item.classList.add('lingth_item'))
    }
    })
    } catch (error) {
        
    }
}





if(id.length<4){
    retornarPaisCodigo()
    
    
}else{
    retornarPaisNombre()
    
}

$containPais.addEventListener('click',(e)=>{
    if(e.target.closest('.link_border')){
        const id=e.target.closest('.link_border').children[0].dataset.id;
        localStorage.setItem('id',id)
    }
})


document.addEventListener('click',(e)=>{
    if(e.target.closest('.header__darkmode')){
        document.querySelector('body').classList.toggle('lingth_Back')

        if(document.querySelector('body').classList.contains('lingth_Back')){
            localStorage.setItem('LingthMode','active')
        }else{
            localStorage.removeItem('LingthMode')
        }
    }

    const isActive=localStorage.getItem('LingthMode')

    if(isActive){
        document.querySelector('.header__main').classList.add('lingth_Back')
        document.querySelector('.contain__icon-back').classList.add('lingth_item')
        document.querySelectorAll('.border').forEach(item=>item.classList.add('lingth_item'))
    }else{
        document.querySelector('.header__main').classList.remove('lingth_Back')
        document.querySelector('.contain__icon-back').classList.remove('lingth_item')
        document.querySelectorAll('.border').forEach(item=>item.classList.remove('lingth_item'))
    }
})



// const isActive=localStorage.getItem('LingthMode')

// if(isActive){
//     document.querySelector('.header__main').classList.add('lingth_Back')
//     document.querySelector('.contain__icon-back').classList.add('lingth_item')
//     document.querySelectorAll('.border').forEach(item=>item.classList.add('lingth_item'))
// }else{
//     document.querySelector('.header__main').classList.remove('lingth_Back')
//     document.querySelector('body').classList.remove('lingth_Back')
//     document.querySelector('.contain__icon-back').classList.remove('lingth_item')
//     document.querySelectorAll('.border').forEach(item=>item.classList.remove('lingth_item'))
// }