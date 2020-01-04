//left to do:
//if user adds burger with no name, error message? or randomly generated burger name?


const burgerInputEl = document.getElementById("burgerName")
const burgerButtonEl = document.getElementById("addBurger")


//add a burger
burgerButtonEl.addEventListener("click", function () {
    if (burgerInputEl.value) {

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
    } else {
        // case if user doesn't enter a name for new burger
        burgerInputEl.setAttribute("placeholder", "Please name your burger")
    }
})

test = {id: 1, burgerName: "Good Burger", eaten: true}

//function to alternate the class of the div holding each burger name based on the db entry's ID number
function condimentSelect(burger){
    console.log(burger)
    if (burger%2 == 0){
        if (burger%4 == 0){
            return "condiment1"
        } else {
            return "condiment2"
        }
        
    }
    else {
        if ((--burger)%4 == 0){
            return "condiment3"
        } else {
            return "condiment4"
        }
        
    }
}


//displays all burgers depending on eaten status
function displayBurgers() {
    axios.get('/api/burgers')
        .then(function (response) {
            const uneaten = response.data.filter(function (valueObject) {
                return valueObject.eaten == false
            })
            console.log(uneaten)
            const uneatenBurgersEl = document.getElementById("unEaten")
            const uneatenBurgersStr = uneaten.map(burger => `<div class="${condimentSelect(burger.id)}">${burger.burgerName}<button onclick="eatBurger(${burger.id})"id="${burger.id}">Eat This Burger</button></div>`)
            console.log(uneatenBurgersStr)
            const burgersAndButtonsHTML = uneatenBurgersStr.join("<br>")
            uneatenBurgersEl.innerHTML = burgersAndButtonsHTML;

            const eaten = response.data.filter(function (valueObject) {
                return valueObject.eaten == true
            })
            console.log(eaten)
            const eatenBurgersEl = document.getElementById("eaten")
            const eatenBurgersStr = eaten.map(burger => `<div class="${condimentSelect(burger.id)}">${burger.burgerName}</div>`)
            const eatenBurgersHTML = eatenBurgersStr.join("<br>")
            eatenBurgersEl.innerHTML = eatenBurgersHTML
        })
        .catch(function (error) {
            console.log(error);
        });
}

//update individual db entry from uneaten to eaten and repopulate the uneaten and eaten burger lists
function eatBurger(id) {
    console.log(id)
    axios.put(`/api/burgers/${id}`)
        .then(function (response) {
            console.log(response);
            displayBurgers();
        })
        .catch(function (error) {
            console.log(error);
        });
}

displayBurgers()