let countriesList = []
let filteredCountries = []
const getCountries = () => {
    let anotherLoader = false;
    fetch('https://restcountries.com/v3.1/all').then((res) => res.json())
    .then(res => {
        countriesList = res;
        showCountries(countriesList);
    }).catch( error => {
        throw error;
    }).finally( () => {
        anotherLoader = false;
    })
}


const showCountries = list => {
    const tableBody = document.getElementById('country-list-body')
    let countriesListRow = ''
    tableBody.innerHTML = ''
    list.forEach(country => {
        countriesListRow += `<tr>
                            <td>${country.name.official}</td>
                            <td>${country.independent ? 'Yes' : 'No'}</td>
                            <td>${country.capital}</td>
                            <td>${country.region}</td>
                        </tr>`
    })
    tableBody.innerHTML = countriesListRow
}


//tried to compine three function in one put it didn't work i am still trying

// function onStringFilterChange(event) {
//     const SearchString = event.srcElement.value.toLowerCase()
//     if ( SearchString ) {
//         if (filteredCountries){
//             const countries = filteredCountries.slice()
//             filteredCountries = countries.filter(country => {
//                 if(country.capital)
//                  return country.capital[0].toLowerCase().includes(SearchString)|| 
//                 country.name.official.toLowerCase().includes(SearchString) ||
//                 country.region.toLowerCase().includes(SearchString)})
            
//             showCountries(filteredCountries)
//         }
//         else {
//         const countries = countriesList.slice()
       
//         filteredCountries = countries.filter(country => {
//             if(country.capital)
//              return country.capital[0].toLowerCase().includes(SearchString)|| 
//             country.name.official.toLowerCase().includes(SearchString) ||
//             country.region.toLowerCase().includes(SearchString)})
        
//         showCountries(filteredCountries)
//         }
//     } else {
//         showCountries(countriesList)
//     }
// }


function onNameFilterChange(event) {
    const nameSearchString = event.srcElement.value.toLowerCase()
    if ( nameSearchString ) {
        if (filteredCountries.length > 0){
            const countries = filteredCountries.slice()
            filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(nameSearchString))
            showCountries(filteredCountries)
        }
        else {
        const countries = countriesList.slice()
        filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(nameSearchString))
        showCountries(filteredCountries)
        }
    } else {
        showCountries(countriesList);
    }
}

function onRegionFilterChange(event) {
    const RegionsearchString = event.srcElement.value.toLowerCase()
    if ( RegionsearchString ) {
        if(filteredCountries.length > 0){
            const countries = filteredCountries.slice()
            filteredCountries = countries.filter(country => country.region.toLowerCase().includes(RegionsearchString))
            showCountries(filteredCountries)
        }
        else {
            const countries = countriesList.slice()
            filteredCountries = countries.filter(country => country.region.toLowerCase().includes(RegionsearchString))
            showCountries(filteredCountries)
        }
    } else {
        showCountries(countriesList)
    }
}

function onCapitalFilterChange(event) {
    const capitalSearchString = event.srcElement.value.toLowerCase()
    if ( capitalSearchString ) {
        if(filteredCountries.length > 0){
            const countries = filteredCountries.slice()
            filteredCountries = countries.filter(country => {
                if(country.capital)
                 return country.capital[0].toLowerCase().includes(capitalSearchString)})
            showCountries(filteredCountries)
        }
        else {
            const countries = countriesList.slice()
            filteredCountries = countries.filter(country => {
                if(country.capital)
                return country.capital[0].toLowerCase().includes(capitalSearchString)})
        showCountries(filteredCountries)
        }  
    } else {
        showCountries(countriesList)
    }
}

function onIndependentFilterChange(event) {  // needs some fixing
    const searchTwoValues = event.srcElement.value
        // if (searchTwoValues == 'all'){
        //     showCountries(countriesList)
        // }
        // else {
            if(filteredCountries.length > 0){
                const countries = filteredCountries.slice();
                filteredCountries = countries.filter(country => country.independent == JSON.parse(searchTwoValues));
                showCountries(filteredCountries);
            }
            else{
                const countries = countriesList.slice();
                filteredCountries = countries.filter(country => country.independent == JSON.parse(searchTwoValues));
                showCountries(filteredCountries);
            }
       // }
 }

 $('#clear').click(function() {
    $('input[type="text"]').val('')
    showCountries(countriesList)
 })

const addEvents = () => {
    const nameField = document.getElementById('country-name')
    const regionField = document.getElementById('region')
    const capitalField = document.getElementById('capital')
    const independentField = document.getElementById('independent')
    nameField.addEventListener('change', onNameFilterChange)
    regionField.addEventListener('change', onRegionFilterChange)
    capitalField.addEventListener('change', onCapitalFilterChange)
    independentField.addEventListener('change', onIndependentFilterChange)
}

addEvents()
getCountries()
