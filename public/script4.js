async function macromeals() {
    const requestdata = await fetch('/api/wholeMeal');
    const macrodata = await requestdata.json();
    const arraydata = macrodata.data;
    const targettable = document.querySelector('.w10');
  
    arraydata.forEach((element) => {
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

  function getRandomInteger(max) {
    return Math.floor(Math.random() * max);
  }
  
  function getRandomMeals(meal_name) {
    const random_meals = [];
    for (i = 0; i < 10; i++) {
      const current_random_meal = getRandomInteger(meal_name.length - 1);
      random_meals.push(meal_name[current_random_meal]);
      meal_name.splice(current_random_meal, 1);
    }
    return random_meals;
  }
  
  async function dataMacros() {
    const request = await fetch('/api/macros');
    const api_whole = await request.json();
    const {data} = api_whole;
    const macro_meal_data = [
      {
        type: 'stackedBar',
        name: 'Calories',
        showInLegend: 'true',
        dataPoints: []
      },
  
      {
        type: 'stackedBar',
        name: 'Serving Size',
        showInLegend: 'true',
        dataPoints: []
      },
      {
        type: 'stackedBar',
        name: 'Cholesterol',
        showInLegend: 'true',
        dataPoints: []
      },
      {
        type: 'stackedBar',
        name: 'Sodium',
        showInLegend: 'true',
        dataPoints: []
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
    console.log(macro_meal_data[0]);
    const randomMeallist = getRandomMeals(api_whole);
    for (i = 0; i < randomMeallist.length; i++) {
      element = randomMeallist[i];
      const name_request = await fetch(`/api/meals/${element.meal_id}`);
      const name_data_meal = await name_request.json();
      console.log(name_data_meal);
  
      macro_meal_data[0].dataPoints.push({ label: name_data_meal[0].meal_name, y: element.calories });
      macro_meal_data[1].dataPoints.push({ label: name_data_meal[0].meal_name, y: element.serving_size });
      macro_meal_data[2].dataPoints.push({ label: name_data_meal[0].meal_name, y: element.cholesterol });
      macro_meal_data[3].dataPoints.push({ label: name_data_meal[0].meal_name, y: element.sodium });
      macro_meal_data[4].dataPoints.push({ label: name_data_meal[0].meal_name, y: element.carbs });
      macro_meal_data[5].dataPoints.push({ label: name_data_meal[0].meal_name, y: element.protein });
      macro_meal_data[6].dataPoints.push({ label: name_data_meal[0].meal_name, y: element.fat });
    }
  
    const chart = new CanvasJS.Chart("chartContainer",
      {
        title: {
          text: "Meal/Macro Information Chart"
        },
        data: macro_meal_data
      });
  
    chart.render();
  }
  
  async function windowActions() {
    console.log("loaded window");
    const data = await macromeals();
    await dataMacros();
    console.table(data);
  }
  
  window.onload = windowActions;