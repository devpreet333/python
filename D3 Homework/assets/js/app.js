// // @TODO: YOUR CODE HERE!
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("#scatter").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = 960;
    var svgHeight = 330;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
  
    // Append SVG element
    var svg = d3
      .select(".chart")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    // Append group element
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Read CSV
    d3.csv("data.csv").then(function(healthData) {
        console.log(healthData)
        // console.log(medalData.poverty)
      // create date parser
    //   var dateParser = d3.timeParse("%d-%b");
  
    //   parse data
      healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
      });

      console.log(healthData[0].poverty)
    //   console.log(data.poverty)
      // create scales
      var xPovertyScale = d3.scaleLinear()
        .domain(d3.extent(healthData, d => d.poverty))
        .range([0, width]);
  
      var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.healthcare)])
        .range([height, 0]);
  
      // create axes
      var xAxis = d3.axisBottom(xPovertyScale);
      var yAxis = d3.axisLeft(yLinearScale).ticks(6);
      
      
      // append axes
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
  
      chartGroup.append("g")
        .call(yAxis);
  
      // // line generator
      // var line = d3.line()
      //   .x(d => xTimeScale(d.date))
      //   .y(d => yLinearScale(d.medals));
  
      // // append line
      // chartGroup.append("path")
      //   .data([medalData])
      //   .attr("d", line)
      //   .attr("fill", "none")
      //   .attr("stroke", "red");
  
      // append circles
      var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xPovertyScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "gold")
        .attr("stroke-width", "1")
        .attr("stroke", "black");
    })
      // date formatter to display dates nicely
    //   var dateFormatter = d3.timeFormat("%d-%b");
  
      // Step 1: Append tooltip div
    //   var toolTip = d3.select("body")
    //     .append("div")
    //     .classed("tooltip", true);
  
    //   // Step 2: Create "mouseover" event listener to display tooltip
    //   circlesGroup.on("mouseover", function(d) {
    //     toolTip.style("display", "block")
    //         .html(
    //           `<strong>${d.poverty}<strong><hr>${d.healthcare}
    //       medal(s) won`)
    //         .style("left", d3.event.pageX + "px")
    //         .style("top", d3.event.pageY + "px");
    //   })
    //     // Step 3: Create "mouseout" event listener to hide tooltip
    //     .on("mouseout", function() {
    //       toolTip.style("display", "none");
    //     });
  
    // }).catch(function(error) {
    //   console.log(error);
    // });
  }
  
  // When the browser loads, makeResponsive() is called.
  makeResponsive();
  
  // When the browser window is resized, makeResponsive() is called.
  d3.select(window).on("resize", makeResponsive);
  













































// // Define SVG area dimensions
// var svgWidth = 960;
// var svgHeight = 330;

// // Define the chart's margins as an object
// var chartMargin = {
//   top: 30,
//   right: 30,
//   bottom: 30,
//   left: 30
// };

// // Define dimensions of the chart area
// var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
// var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// // Select body, append SVG area to it, and set the dimensions
// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("height", svgHeight)
//   .attr("width", svgWidth);

// // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// // to the margins set in the "chartMargin" object.
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


//   //Read the data
// d3.csv("data.csv", function(data) {

//     // Add X axis
//     var x = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.poverty))
//       .range([ 0, chartWidth ]);
//     svg.append("g")
//       .attr("transform", "translate(0," + chartHeight + ")")
//       .call(d3.axisBottom(x));
  
//     // Add Y axis
//     var y = d3.scaleLinear()
//     .domain(d3.extent(data, d => d.healthcare))
//       .range([ chartHeight, 0]);
//     svg.append("g")
//       .call(d3.axisLeft(y));
  
//     // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
//     // Its opacity is set to 0: we don't see it by default.
//     var tooltip = d3.select("body")
//       .append("div")
//       .style("opacity", 0)
//       .attr("class", "tooltip")
//       .style("background-color", "white")
//       .style("border", "solid")
//       .style("border-width", "1px")
//       .style("border-radius", "5px")
//       .style("padding", "10px")
  
  
  
//     // A function that change this tooltip when the user hover a point.
//     // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
//     var mouseover = function(d) {
//       tooltip
//         .style("opacity", 1)
//     }
  
//     var mousemove = function(d) {
//       tooltip
//         .html("The exact value of<br>the Ground Living area is: " +  d.poverty)
//         .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
//         .style("top", (d3.mouse(this)[1]) + "px")
//     }
  
//     // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
//     var mouseleave = function(d) {
//       tooltip
//         .transition()
//         .duration(200)
//         .style("opacity", 0)
//     }
  
//     // Add dots
//     svg.append('g')
//       .selectAll("dot")
//       .data(data) // the .filter part is just to keep a few dots on the chart, not all of them
//       .enter()
//       .append("circle")
//         .attr("cx", function (d) { return x( d.poverty); } )
//         .attr("cy", function (d) { return y(d.healthcare); } )
//         .attr("r", 7)
//         .style("fill", "#69b3a2")
//         .style("opacity", 0.3)
//         .style("stroke", "white")
//       .on("mouseover", mouseover )
//       .on("mousemove", mousemove )
//       .on("mouseleave", mouseleave )
  
//   })
































// // setup x 
// // var xValue = function(d) { return d.poverty;}, // data -> value
// //     xScale = d3.scale.linear().range([0, width]), // value -> display
// //     xMap = function(d) { return xScale(xValue(d));}, // data -> display
// //     xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// // // setup y
// // var yValue = function(d) { return d.healthcare;}, // data -> value
// //     yScale = d3.scale.linear().range([height, 0]), // value -> display
// //     yMap = function(d) { return yScale(yValue(d));}, // data -> display
// //     yAxis = d3.svg.axis().scale(yScale).orient("left");

// // setup fill color
// // var cValue = function(d) { return d.abbr;},
// //     color = d3.scale.category10();

// // add the graph canvas to the body of the webpage
// // var svg = d3.select("body").append("svg")
// //     .attr("width", width + margin.left + margin.right)
// //     .attr("height", height + margin.top + margin.bottom)
// //   .append("g")
// //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // add the tooltip area to the webpage
// var tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

// // load data
// d3.csv("data.csv", function(data) {
//     console.log(data);
//   // change string (from CSV) into number format
// //   data.forEach(function(d) {
// //     d.poverty = +d.poverty;
// //     d.healthcare = +d.healthcare;
// //    console.log(d);
// //   });

// //   // don't want dots overlapping axis, so add in buffer to data domain
// //   xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
// //   yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

// // // setup x 
// // var xValue = function(d) { return d.poverty;}, // data -> value
// //     xScale = d3.scale.linear().range([0, width]), // value -> display
// //     xMap = function(d) { return xScale(xValue(d));}, // data -> display
// //     xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// // // setup y
// // var yValue = function(d) { return d.healthcare;}, // data -> value
// //     yScale = d3.scale.linear().range([height, 0]), // value -> display
// //     yMap = function(d) { return yScale(yValue(d));}, // data -> display
// //     yAxis = d3.svg.axis().scale(yScale).orient("left");

// // var cValue = function(d) { return d.abbr;},
// // color = d3.scale.category10();

// var xScale = d3.scaleLinear()
//     .domain(d3.extent(data, d => d.poverty))
//     .range([0, svgWidth]);

//   // Create a scale for your dependent (y) coordinates
//   var yScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.healthcare)])
//     .range([svgHeight, 0]);

//     yMap = function(d) { return yScale(yValue(d));},
//     xMap = function(d) { return xScale(xValue(d));}

//     var bottomAxis = d3.axisBottom(xScale);
//     var leftAxis = d3.axisLeft(yScale);

// //     xMap = function(d) { return xScale(xValue(d));}
    
//   // x-axis
//   chartGroup
//     // .append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + chartHeight + ")")
//       .call(bottomAxis)
//     .append("text")
//       .attr("class", "label")
//       .attr("x", chartWidth)
//       .attr("y", -6)
//       .style("text-anchor", "end")
//       .text("Calories");

//   // y-axis
//   chartGroup
// //   .append("g")
//       .attr("class", "y axis")
//       .call( leftAxis)
//     .append("text")
//       .attr("class", "label")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Protein (g)");

//   // draw dots
//   chartGroup.selectAll(".dot")
//       .data(data)
//     .enter().append("circle")
//       .attr("class", "dot")
//       .attr("r", 3.5)
//       .attr("cx", xMap)
//       .attr("cy", yMap)
//       .style("fill", function(d) { return color(cValue(d));}) 
//       .on("mouseover", function(d) {
//           tooltip.transition()
//                .duration(200)
//                .style("opacity", .9);
//           tooltip.html(d.poverty + "<br/> (" + xValue(d) 
// 	        + ", " + yValue(d) + ")")
//                .style("left", (d3.event.pageX + 5) + "px")
//                .style("top", (d3.event.pageY - 28) + "px");
//       })
//       .on("mouseout", function(d) {
//           tooltip.transition()
//                .duration(500)
//                .style("opacity", 0);
//       });
//     });

  

// Load data from hours-of-tv-watched.csv
// d3.csv("data.csv").then(function(data) {

//   // Print the tvData
//   console.log(data);

//   // Cast the hours value to a number for each piece of tvData
//   tvData.forEach(function(data) {
//     data.hours = +data.hours;
//   });

//   var barSpacing = 10; // desired space between each bar
//   var scaleY = 10; // 10x scale on rect height

//   // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
//   var barWidth = (chartWidth - (barSpacing * (tvData.length - 1))) / tvData.length;

//   // @TODO
//   // Create code to build the bar chart using the tvData.
//   chartGroup.selectAll(".bar")
//     .data(tvData)
//     .enter()
//     .append("rect")
//     .classed("bar", true)
//     .attr("width", d => barWidth)
//     .attr("height", d => d.hours * scaleY)
//     .attr("x", (d, i) => i * (barWidth + barSpacing))
//     .attr("y", d => chartHeight - d.hours * scaleY);
// }).catch(function(error) {
//   console.log(error);
// });
