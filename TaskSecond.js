
function Database(entryData) {

  this.data = entryData['data'];

  this.getDataWithCondition = function (condObj) {

    this.condition = condObj['condition'];
    let result;

    validateEntryValue(this.data);

    result = searchAndGenerateResponse(this.data, this.condition);
    console.log(JSON.stringify(result));

  };

  function validateEntryValue(data) {
    if (typeof data !== "object") {
      throw new Error('Entry data is wrong');
    }
  }

  function searchAndGenerateResponse(data, condition) {
    let serchedObj = searchWithInclude(data, condition);
    let keywordFOrSerching = condition['sort_by'];
    return {
      result: serchedObj['result'].sort(dynamicSort(keywordFOrSerching))
    }
  }


  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  function searchWithInclude(data, condition) {
    let includeArr = condition['include'];
    let response = {}
    includeArr.forEach((item) => {
      response['result'] = Object.assign([], searchKeywords(data, item))
    })
    return response;
  }

  function searchKeywords(list, query) {
    return list.filter(item =>
      Object.keys(query).every(key =>
        item[key] === query[key])
    );
  }



}

// ---->   Расширил прототепированием, не лучший вариант, но зато не много кода и та же структура
Database.prototype.excludeKeywords = function (data) {
  let _data = data['data'];
  let _condition = data['condition'];
  let _result;


  main()

  function main() {

    _result = _searchAndGenerateResponse(_data, _condition);
    console.log(JSON.stringify(_result));

  }

  function _searchAndGenerateResponse(data, condition) {
    let serchedObj = _searchWithExclude(data, condition);
    let keywordFOrSerching = condition['sort_by'];
    return {
      result: serchedObj['result'].sort(_dynamicSort(keywordFOrSerching))
    }
  }


  function _searchWithExclude(data, condition) {
    let includeArr = condition['exclude'];
    let response = {}
    includeArr.forEach((item) => {
      response['result'] = Object.assign([], _searchKeywords(data, item))
    })
    return response;
  }

  function _searchKeywords(list, query) {
    return list.filter(item =>
      Object.keys(query).every(key =>
        item[key] !== query[key])
    );
  }

  function _dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }



}




let database = new Database({
  "data": [
    { "name": "John", "email": "john2@mail.com" },
    { "name": "John", "email": "john1@mail.com" },
    { "name": "Jane", "email": "jane@mail.com" },
    { "name": "Alex", "email": "alex@mail.com" },
    { "name": "Neo", "email": "bob1@mail.com" },
    { "name": "Neo", "email": "bob2@mail.com" },
    { "name": "Naruto", "email": "kukareku1@mail.com" },
    { "name": "Naruto", "email": "kukareku3@mail.com" },
    { "name": "Ichigo", "email": "yoyo@mail.com" },
  ]
});
database.getDataWithCondition({ "condition": { "include": [{ "name": "John" }], "sort_by": ["email"] } });
database.getDataWithCondition({ "condition": { "include": [{ "name": "Bob" }], "sort_by": ["email"] } });
database.excludeKeywords({
  "data": [
    { "user": "mike11@mail.com", "rating": 20, "disabled": false },
    { "user": "mike22@mail.com", "rating": 22, "disabled": false },
    { "user": "greg@mail.com", "rating": 14, "disabled": false },
    { "user": "john@mail.com", "rating": 25, "disabled": true }],
  "condition":
  {
    "exclude": [
      { "disabled": true }
    ],
    "sort_by": ["rating"]
  }
});
