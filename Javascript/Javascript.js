const $containerItems=document.getElementById('contain_items')
const $select=document.getElementById('select')
const $input=document.getElementById('buscar')


const cargarPaises=async(e)=>{
    const select=e.target.value
    $input.value=''

    if(select=='all'){
        
        try {
            await fetch(`https://restcountries.com/v2/${select}`)
            .then(res=>res.json())
            .then(data=>{
            
                let paises=''
                data.forEach(pais=>{

                    paises+=`
                    <a class='rutaCard' href='../Info_pais/pais.html'>
                    <div class='card' data-id='${pais.name.common}'>
                    <img src='${pais.flags.png}'>
                    <footer class='card__information'>
                    <h4 class='card__title'>${pais.name}</h4>
                    <div class='card__information__extra'>
                    <p><strong>Population:</strong> ${Intl.NumberFormat("de-DE").format(pais.population)}</p>
                    <p><strong>Region:</strong> ${pais.region}</p>
                    <p><strong>Capital:</strong> ${pais.capital?pais.capital:'Sin identificar'}</p>
                    </div>
                    </footer>
                    </div>
                    </a>
                    `
                })
                $containerItems.innerHTML=paises

            })
            .catch(err=>console.log(err))
        } catch (error) {
            console.log(error)
        }
    

    }else{
        try {
            await fetch(`https://restcountries.com/v3.1/region/${select}`)
            .then(res=>res.json())
            .then(data=>{
              
                let paises=''
                data.forEach(pais=>{

                    paises+=`
                    <a class='rutaCard' href='../Info_pais/pais.html'>
                    <div class='card' data-id='${pais.name.common}'>
                    <img src='${pais.flags.png}'>
                    <footer class='card__information'>
                    <h4 class='card__title'>${pais.name.common}</h4>
                    <div class='card__information__extra'>
                    <p><strong>Population:</strong> ${Intl.NumberFormat("de-DE").format(pais.population)}</p>
                    <p><strong>Region:</strong> ${pais.region}</p>
                    <p><strong>Capital:</strong> ${pais.capital?pais.capital:'Sin identificar'}</p>
                    </div>
                    </footer>
                    </div>
                    </a>
                    `
                })
                $containerItems.innerHTML=paises
            })
            .catch(err=>console.log(err))
        } catch (error) {
            console.log(error)
        }    
    }
    
    if(document.querySelector('body').classList.contains('lingth_Back')){
        document.querySelectorAll('.card').forEach(item=>{item.classList.toggle('lingth_item')})
     }
    
}

$select.addEventListener('change',cargarPaises)


const cargarPrimero=async()=>{


    try {
        await fetch(`https://restcountries.com/v2/all`)
        .then(res=>res.json())
        .then(data=>{
        
            let paises=''
            data.forEach(pais=>{
            
                paises+=`
                <a class='rutaCard' href='../Info_pais/pais.html'>
                <div class='card' data-id='${pais.alpha3Code}'>
                <img src='${pais.flags.png}'>
                <footer class='card__information'>
                <h4 class='card__title'>${pais.name}</h4>
                <div class='card__information__extra'>
                <p><strong>Poblacion:</strong> ${Intl.NumberFormat("de-DE").format(pais.population)}</p>
                <p><strong>Region:</strong> ${pais.region}</p>
                <p><strong>Capital:</strong> ${pais.capital?pais.capital:'Sin identificar'}</p>
                </div>
                </footer>
                </div>
                </a>
                `
            })
            $containerItems.innerHTML=paises

        const isActive=localStorage.getItem('LingthMode')

        if(isActive){
        document.querySelector('body').classList.add('lingth_Back')
        document.querySelector('.header__main').classList.add('lingth_Back')
        document.querySelectorAll('.card').forEach(item=>{item.classList.add('lingth_item')})
        }
        })
        .catch(err=>console.log(err))
    } catch (error) {
        console.log(error)
    }
}

cargarPrimero()

$input.addEventListener('keyup',(e)=>{

    if(e.target.matches('#buscar')){
    
            document.querySelectorAll('.rutaCard').forEach(pais=>{
            let titulo=pais.children[0].children[1].children[0].textContent;
            titulo.toLowerCase().includes(e.target.value.toLowerCase())
            ?
            pais.classList.remove('hidden')
            :
            pais.classList.add('hidden')
        })
    }
})

$containerItems.addEventListener('click',(e)=>{
    if(e.target.closest('.card')){
        let id=e.target.closest('.card').dataset.id;
        localStorage.setItem('id',id)
    }
})


// FUNCION PARA DARK MODE
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
        document.querySelectorAll('.card').forEach(item=>{item.classList.add('lingth_item')})
        document.querySelector('.contain-search').classList.add('lingth_Input')
        document.querySelector('.contain-select').classList.add('lingth_Input')
        document.querySelector('.select').classList.add('lingth_Input')
        document.querySelector('.search').classList.add('lingth_Input')
}else{
        document.querySelector('.header__main').classList.remove('lingth_Back')
        document.querySelectorAll('.card').forEach(item=>{item.classList.remove('lingth_item')})
        document.querySelector('.contain-search').classList.remove('lingth_Input')
        document.querySelector('.contain-select').classList.remove('lingth_Input')
        document.querySelector('.select').classList.remove('lingth_Input')
        document.querySelector('.search').classList.remove('lingth_Input')
}
})

const isActive=localStorage.getItem('LingthMode')

if(isActive){
        document.querySelector('body').classList.add('lingth_Back')
        document.querySelector('.header__main').classList.add('lingth_Back')
        document.querySelectorAll('.card').forEach(item=>{item.classList.add('lingth_item')})
        document.querySelector('.contain-search').classList.add('lingth_Input')
        document.querySelector('.contain-select').classList.add('lingth_Input')
        document.querySelector('.select').classList.add('lingth_Input')
        document.querySelector('.search').classList.add('lingth_Input')
}
