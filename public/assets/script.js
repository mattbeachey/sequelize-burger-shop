const burgerInputEl = document.getElementById("burgerName")
const burgerButtonEl = document.getElementById("addBurger")


//add a burger
burgerButtonEl.addEventListener("click", function () {
    // alert(burgerInputEl.value)
    name = burgerInputEl.value
    axios.post('/api/burgers', {
        burgerName: name
    })
        .then(function (response) {
            displayBurgers();
        })
        .catch(function (error) {
            console.log(error);
        });

    
})

function displayBurgers(){
    axios.get('/api/burgers')
    .then(function(response){
        const uneaten = response.data.filter(function(valueObject){
            return valueObject.eaten == false
        })
        console.log(uneaten)

        const eaten = response.data.filter(function(valueObject){
            return valueObject.eaten == true
        })
        console.log(eaten)
    })
}




