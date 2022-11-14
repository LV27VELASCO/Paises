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
    
    
}

$select.addEventListener('change',cargarPaises)


const cargarPrimero=async()=>{
    try {
        await fetch(`https://restcountries.com/v2/all`)
        .then(res=>res.json())
        .then(data=>{
        
            let paises=''
            data.forEach(pais=>{
            
                console.log(pais)
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