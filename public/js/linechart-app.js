angular.module('mean.consumptions', []).

   directive('lines', function ($parse) {
      //The data for our line
      var plot_graph = function(data) {

          // constants
        var w = 400, h = 200;       // width and height required
          var margin = 20;            // margins for axes
          var colors = [ 'red', 'green', 'blue' ];        // color schema

          // a generic line generator functions don't touch these
          var line = d3.svg.line()
          .x(function(d) { return d.x; }) 
          .y(function(d) { return d.y; });

          // a line generator function for flat data don't touch
          var line_data = d3.svg.line()
          .x(function(d,i) { return x(i); }) 
          .y(function(d) { return -1*y(d); });

          // get graphics context
          vis=d3.select("body")
            .append("svg:svg")
            .attr("width",w)
            .attr("height",h);

          var g = vis.append("svg:g")
              .attr("transform","translate(0,200)");

          // draw axes
          g.append("svg:path").attr("d",line([{"x":margin,"y":0},{"x":margin,"y":-h}]))
              .attr("stroke","black")
              .attr("stroke-width","2")
              .attr("fill", "none");

          g.append("svg:path").attr("d",line([{"x":0,"y":-margin},{"x":w,"y":-margin}]))
              .attr("stroke","black")
              .attr("stroke-width","2")
              .attr("fill", "none");

          // find plotting ranges
          y_max =d3.max(d3.max(data));
          var y = d3.scale.linear().domain([0, y_max]).range([0 + margin, h - margin]);
          var x = d3.scale.linear().domain([0, data[0].length]).range([0 + margin, w - margin]);

          // draw label ticks
          g.selectAll(".yLabel")
              .data(y.ticks(4))
              .enter().append("svg:text")
              .attr("class", "yLabel")
              .text(String)
              .attr("x", 0)
              .attr("y", function(d) { return -1 * y(d) })
              .attr("text-anchor", "right")
              .attr("dy", 4)

          g.selectAll(".xLabel")
              .data(x.ticks(5))
              .enter().append("svg:text")
              .attr("class", "xLabel")
              .text(String)
              .attr("x", function(d) { return x(d) })
              .attr("y", 0)
              .attr("text-anchor", "middle")

          // rescale data to fit within range
          for (j=0;j<data.length;j++) {
              cdata = data[j];
          
              // draw the data
              g.append("svg:path").attr("d",line_data(cdata))
                  .attr("stroke",colors[j])
              .attr("fill", "none");
          }

      }

      var D1=[3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 7];
      var D2=[31,61,21,71,51,21,11,31,81,91,21,51,71];

      return {
         restrict: 'E',
         replace: true,
         template: '<div id="chart">Your Energy Consumption 2012</div>',
         /*
         scope: {
           data: "="
         },
         */
         link: function (scope, element, attrs) {
           /*
           scope.$watch('data', function() {
             console.log("$watch() is called");
           });
           */
           scope.$on("_CONSUMPTION_UPDATE", function (evt, arg) {
            console.log('testing.');
            console.log(arg);
            var yours = [];
            consumptions = arg.consumptions;
            for (var i = 0; i < consumptions.length; i++)
            {
              if (consumptions[i].CONTRACT_ACCOUNT_NO_MASKED == 80) {
                yours.push(consumptions[i].PERTURBATED_CONSUMPTION);
              }
            }
            var neighbours_sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var neighbours_count = 50;
            var sum = 0;
            for (var i = 0; i < consumptions.length; i++)
            {
              neighbours_sum[consumptions[i].MONTH - 1] += consumptions[i].PERTURBATED_CONSUMPTION;
            }
            var neighbours_averages = [];
            for (var i = 0; i < neighbours_sum.length; i++)
            {
              console.log('neighbour sum = ', neighbours_sum[i]);
            }
            for (var i = 0; i < neighbours_sum.length; i++)
            {
              neighbours_averages[i] = neighbours_sum[i] / neighbours_count;
              console.log('neighbour average += ', i , " " , neighbours_averages[i]);
            }
            console.log(yours);
            console.log(neighbours_averages);
            plot_graph([yours,neighbours_averages]);
           });
           /*
           var chart = d3.select('#linechart')
             .append("div").attr("class", "chart")
             .selectAll('div')
             .data(data).enter()
             .append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
           */

//            plot_graph([D1,D2]);
         } 
      };
   });
