
function Transformer() {

  let fetchedFuncObject;
  let fetchedMethods = [];

  this.getTransformedValue = function (entryValue) {

    let state = { ...entryValue };


    validateEntryValue(state);

    console.log(transformValue(state));

  };

  function getNewFunctionAndTransform(state) {
    fetchAndUseNewMethod(state);
    saveNewMethod(state);
  }

  function saveNewMethod(data) {
    fetchedMethods.push({
      typeFrom: data["distance"].unit,
      typeTo: data.convert_to,
      name: data["name"],
      function: data["function"]
    })
  }

  function fetchAndUseNewMethod(data) {
    if (data['type'] === "addNew") {

      fetchedFuncObject = {
        func: () => {
          return JSON.stringify({
            typeFrom: data["distance"].unit,
            typeTo: data.convert_to,
            name: data["name"],
            unit: data["convert_to"],
            value: data["function"](+data["distance"].value.toFixed(2)) || "wrong value, try again",
          });
        }
      }
      console.log(fetchedFuncObject.func());

    } else {
      throw new Error('Data type is wrong, check data and try again');
    }
  }



  function validateEntryValue(state) {
    if ("string" !== typeof state["distance"].unit || "number" !== typeof state["distance"].value || !isFinite(state["distance"].value)) {
      throw new Error('Entry value is wrong');
    }
  }

  function transformValue(state) {
    if (state["type"] === "addNew") {
      getNewFunctionAndTransform(state);
    } else {
      return generateNewObj(state);
    }
  }

  function generateNewObj(state) {

    switch (state.convert_to) {
      case 'm':
        return JSON.stringify({
          unit: state["convert_to"],
          value: setupValueTransformationForMetrs(state) || state['distance'].value,
        });

      case 'sm':
        return JSON.stringify({
          unit: state["convert_to"],
          value: setupValueTransformationForSm(state) || state['distance'].value,
        });

      case 'ft':
        return JSON.stringify({
          unit: state["convert_to"],
          value: setupValueTransformationForFt(state) || state['distance'].value,
        });

      case 'in':
        return JSON.stringify({
          unit: state["convert_to"],
          value: setupValueTransformationForIn(state) || state['distance'].value,
        });

    }
  }



  // In
  function getInFromMetrs(val) {
    return val * 39.370;
  }
  function getInFromFt(val) {
    return val * 12;
  }
  function getInFromSm(val) {
    return val * 0.39370;
  }

  // Sm
  function getSmFromIn(val) {
    return val / 0.39370;
  }
  function getSmFromMetrs(val) {
    return val / 0.01;
  }
  function getSmFromFt(val) {
    return val / 0.032808;
  }
  // Ft
  function getFtFromSm(val) {
    return val * 0.032808;
  }
  function getFtFromMetrs(val) {
    return val * 3.2808;
  }
  function getFtFromIn(val) {
    return val * 0.083333;
  }
  // Metrs
  function getMetrsFromSm(val) {
    return val / 100;
  }
  function getMetrsFromIn(val) {
    return val / 39.370;
  }
  function getMetrsFromFt(val) {
    return val / 3.2808;
  }



  function setupValueTransformationForMetrs(state) {
    switch (state["distance"].unit) {
      case "sm":
        return +getMetrsFromSm(state["distance"].value).toFixed(3);
      case "in":
        return +getMetrsFromIn(state["distance"].value).toFixed(3);
      case "ft":
        return +getMetrsFromFt(state["distance"].value).toFixed(3);
      default:
        break;
    }
  }

  function setupValueTransformationForSm(state) {
    switch (state["distance"].unit) {
      case "m":
        return +getSmFromMetrs(state["distance"].value).toFixed(3);
      case "in":
        return +getSmFromIn(state["distance"].value).toFixed(3);
      case "ft":
        return +getSmFromFt(state["distance"].value).toFixed(3);
      default:
        break;
    }
  }

  function setupValueTransformationForIn(state) {
    switch (state["distance"].unit) {
      case "m":
        return +getInFromMetrs(state["distance"].value).toFixed(3);
      case "sm":
        return +getInFromSm(state["distance"].value).toFixed(3);
      case "ft":
        return +getInFromFt(state["distance"].value).toFixed(3);
      default:
        break;
    }
  }

  function setupValueTransformationForFt(state) {
    switch (state["distance"].unit) {
      case "m":
        return +getFtFromMetrs(state["distance"].value).toFixed(3);
      case "sm":
        return +getFtFromSm(state["distance"].value).toFixed(3);
      case "in":
        return +getFtFromIn(state["distance"].value).toFixed(3);
      default:
        break;
    }
  }

}


let transformator = new Transformer();


transformator.getTransformedValue({
  "distance": { "unit": "sm", "value": 100 },
  "convert_to": "ft"
});
transformator.getTransformedValue({
  "distance": { "unit": "m", "value": 140 },
  "convert_to": "sm"
});
transformator.getTransformedValue({
  "distance": { "unit": "in", "value": 0.01 },
  "convert_to": "ft"
});
transformator.getTransformedValue({
  "distance": { "unit": "ft", "value": 0.01 },
  "convert_to": "sm"
});

transformator.getTransformedValue({
  "distance": { "unit": "ft", "value": 0.01 },
  "convert_to": "in"
});


// Для расширения функционала через замоканый JSON
const mockData = {
  "function": (val) => { return val * 1000 },
  "name": "transformFromKmtoM",
  "distance": { "unit": "km", "value": 10 },
  "convert_to": "m",
  "type": "addNew"
}
const mockData2 = {
  "function": (val) => { return val / 1000 },
  "name": "transformFromMtoKm",
  "distance": { "unit": "m", "value": 10 },
  "convert_to": "km",
  "type": "addNew"
}

transformator.getTransformedValue(mockData);
transformator.getTransformedValue(mockData2);
