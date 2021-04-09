async function macromeals() {
  const requestdata = await fetch('/api/wholeMeal');
  const macrodata = await requestdata.json();
  const arraydata = macrodata.data;
  console.log(arraydata);
  console.table(macrodata);
  const targettable = document.querySelector('.w10');
  
  arraydata.forEach((element) => {
    console.log(element.macro_id);
    console.log(element.meal_id);
    const appendelement = document.createElement('tr');
    appendelement.innerHTML = `
            <td>${element.macro_id}</td>
            <td>${element.meal_name}</td>
            <td>${element.calories}</td>
            <td>${element.carbs}</td>
            <td>${element.sodium}</td>
            <td>${element.protein}</td>
            <td>${element.fat}</td>
            <td>${element.cholesterol}</td>
        </tr>
    `;
    targettable.append(appendelement);
  });
}
  
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
  
function getRandomMeals(data) {
  const random_meal = [];
  for (i = 0; i < 10; i++) {
    const current_random_meal = getRandomInt(data.length - 1);
    random_meal.push(data[current_random_meal]);
    data.splice(current_random_meal, 1);
  }
  return random_meal;
}
  

async function mealddatapoints(macros){

macro_meal_data.dataPoints.push({label: meal_data.meal_name, y: element.macros});
}

  
async function dataMacros() {
  const request = await fetch('/api/wholeMeals');
  const api_macro = await request.json();
  const {data} = api_macro;
  const macro_meal_data = [
      {
        type: 'stackedBar',
        name: 'Calories',
        showInLegend: 'true',
        dataPoints: mealddatapoints(calories)
          },
  
      {
        type: 'stackedBar',
        name: 'Serving Size',
        showInLegend: 'true',
        dataPoints: mealddatapoints(serving_size)
      },
      {
        type: 'stackedBar',
        name: 'Cholesterol',
        showInLegend: 'true',
        dataPoints: mealddatapoints(cholesterol)
      },
      {
        type: 'stackedBar',
        name: 'Sodium',
        showInLegend: 'true',
        dataPoints: mealddatapoints(calories)
      },
      {
        type: 'stackedBar',
        name: 'Carbs',
        showInLegend: 'true',
        dataPoints: []
      },
      {
        type: 'stackedBar',
        name: 'Protein',
        showInLegend: 'true',
        dataPoints: []
      },
      {
        type: 'stackedBar',
        name: 'Fat',
        showInLegend: 'true',
        dataPoints: []
      }
    ];
  
    const random_meals = getRandomMeals(api_macro);
    for (i = 0; i < random_meal_list.length; i++) {
      element = random_meals[i];
  
      const mealname_request = await fetch(`/api/meals/${element.meal_id}`);
      const meal_data = await mealname_request.json();
  
      console.log(meal_data);
    };

  
      //setting up chart
      var chart = new CanvasJS.Chart("chartContainer",
      {
        title:{
        text: "Meal Macro Information"
        },
        data: macro_data
      });
      chart.render();
  
    }





 async function windowActions() {
    console.log('loaded window');
    const data = await macromeals();
    console.table(data);
  }
  

  /*
function getRandomIntInclusive(min, max)  {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random[] + (max - min + 1) + min);

}
*/


  /* async function windowActions() {
    console.log('loaded window');
    const results = await macromeals();
    const data = results.data;
   
    const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const selectedMeals = mealArray.map(element => {
      const random = getRandomIntInclusive(0, data.length - 1);
      return data[random];
    })


    console.table(selectedMeals);
  }

*/

  window.onload = windowActions;
  