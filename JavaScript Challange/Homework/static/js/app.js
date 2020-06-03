// from data.js
var tableData = data;
console.log(data)
// YOUR CODE HERE!
// Appending table to webpage
var tbody = d3.select("tbody");

data.forEach(function(ufosearch){
    var row = tbody.append("tr");
    Object.values(ufosearch).forEach(value => {
            row.append("td").text(value)});
})

// Activating filter button to filter table

var clickButton =  d3.select("#filter-btn");

clickButton.on("click", function(){
    

    d3.event.preventDefault();
if (tbody !==""){
    d3.select("tbody").remove();
}
    d3.select("#ufo-table").append("tbody");

    // declaring varibles for input fields
    var inputDatetime = d3.select("#datetime").property("value");
    var inputCity = d3.select("#city").property("value");
    var inputState = d3.select("#state").property("value");
    var inputCountry = d3.select("#country").property("value");
    var inputShape = d3.select("#shape").property("value");
    
    var finalFilter = data
    
    // Usng if statements to allow filtering even if only one filter is used
    if (inputDatetime !== ""){
    function filterDate(date) {
        return date.datetime == inputDatetime;
    }
    var finalFilter = data.filter(filterDate);
    console.log(finalFilter);
    }  

    if (inputCity !== ""){
    function filterCity(cities) {
        return cities.city == inputCity;
      }
      var finalFilter = finalFilter.filter(filterCity);
      // Test
    console.log(finalFilter);
    }
    if (inputState !== ""){
        function filterState(states) {
            return states.state == inputState;
        }
          var finalFilter = finalFilter.filter(filterState);
          // Test
        console.log(finalFilter);
    }
    if (inputCountry !== ""){
        function filterCountry(countries) {
            return countries.country == inputCountry;
          }
          var finalFilter = finalFilter.filter(filterCountry);
          // Test
        console.log(finalFilter);
    }
    if (inputShape !== ""){
        function filterShape(shapes) {
            return shapes.shape == inputShape;
          }
          var finalFilter = finalFilter.filter(filterShape);
          // Test
        console.log(finalFilter);
    }
            
    // creating table based to above filtered results
    var tbody = d3.select("tbody");

    finalFilter.forEach(function(ufosearch){
    var row = tbody.append("tr");
    Object.values(ufosearch).forEach(value => {
    row.append("td").text(value)});
    })
    
})
// Creating reset button to reset filter
var resetButton =  d3.select("#reset-btn");

resetButton.on("click", function(){
    

    d3.event.preventDefault();
    
    d3.select("tbody").remove();
    d3.select("#ufo-table").append("tbody");
    var tbody = d3.select("tbody");

    data.forEach(function(ufosearch){
        var row = tbody.append("tr");
        Object.values(ufosearch).forEach(value => {
                row.append("td").text(value)});
    })

})
