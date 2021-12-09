import * as d3 from 'd3';

function generate(data) {

  // Setup
  var screenWidth = window.innerWidth;

  var margin = {left: 20, top: 20, right: 20, bottom: 20};
  var chart_width = Math.min(screenWidth, 700) - margin.left - margin.right;
  var chart_height = Math.min(screenWidth, 700) - margin.top - margin.bottom;
  var middle_x = chart_width/2 + margin.left;
  var middle_y = chart_height/2 + margin.top;
  var arc_height = 50;
  var inner_radius = chart_width*0.75/2;
  var outer_radius = chart_width*0.75/2 + arc_height;
  var pie_start_angle = 0;
  var pie_end_angle = 2*Math.PI;
  // var pie_start_angle = -90 * Math.PI/180;
  // var pie_end_angle = -90 * Math.PI/180 + 2*Math.PI;
  var card_width = chart_width - margin.left - margin.right;
  var card_height = chart_height - margin.top - margin.bottom;
  var circle_radius = 10;

  // Create SVG Element
  var svg = d3.select('#chart')
    .append("svg")
		.attr("width", (chart_width + margin.left + margin.right))
		.attr("height", (chart_height + margin.top + margin.bottom))
    .append("g")
    .attr("class", "wrapper")
		.attr("transform", "translate(" + middle_x + "," + middle_y + ")");

	//Create an arc function
	var arc = d3.arc()
		.innerRadius(inner_radius)
    .outerRadius(outer_radius)
    .cornerRadius(5);

	//Turn the pie chart 90 degrees counter clockwise, so it starts at the left
	var pie = d3.pie()
		.startAngle(pie_start_angle)
		.endAngle(pie_end_angle)
		.value(function() { return 1; }) // All the slices should be equal
		.padAngle(.01)
    .sort(null);

  // Groups
  svg.selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('class','arc')
    .attr('d', arc)
    .attr('fill', '#006DFC')
    .each(function(d,i){

      //Create a new invisible arc that the text can flow along
      svg.append('path')
        .attr('class', 'hidden-arc')
        .attr('id', 'hidden-arc_'+i)
        .attr('d', getHiddenArc(this))
        .style('fill', 'none');

    })
    .on('mouseover', function(d){
      var x = chart_width/2 - card_width/2 + arc_height*2 + 5;
      var y = chart_height/2 - card_height/2 + arc_height*2 + 5;

      d3.select('#card_container')
        .style('left', x + 'px')
        .style('top', y + 'px')
        .style('display', 'block');

      d3.select('#name')
        .text(d.data.key);
    })
    .on('mouseout', function(){
      d3.select('#card_container')
        .style('display', 'none');

      d3.select('#name')
        .text('');
    });

  svg.selectAll('.arc-label')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'arc-label')
    .attr('dy', 20)
    .append('textPath')
    .attr('startOffset','50%')
    .style('text-anchor','middle')
    .style('pointer-events','none')
    .attr('xlink:href',function(d,i){
      return '#hidden-arc_' + i;
    })
    .text(function(d){
      return d.key;
    });

  // Create circles for children
  svg.selectAll('.circles')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'circles')
    .attr('id', function(p,j){
      return 'circles_' + j;
    })
    .each(function(p,j){

      // Create circles for children
      var parentName = p.data.key;
      var parentIndex = j;
      var childCount = p.data.values.length;
      var parentStartAngle = p.startAngle;
      var parentEndAngle = p.endAngle;
      var individualSlice = childCount + 2;
      var sliceAngle = ((parentEndAngle - parentStartAngle) / individualSlice);

      /*
      console.log({
        'parentName': parentName,
        'parentIndex': parentIndex,
        'childCount': childCount,
        'parentStartAngle': parentStartAngle,
        'parentEndAngle': parentEndAngle,
        'sliceAngleInDegrees': sliceAngle
      });
      */

      var circles = d3.select(this);
      circles.selectAll('.circle-person')
        .data(p.data.values)
        .enter()
        .append('circle')
        .attr('class', 'circle-person')
        .attr('id', function(d,i) {
          return 'circle-person_' + parentIndex + '_' + i;
        })
        .attr('cx', function(d,i){
          var cx = (outer_radius + 20) * Math.cos(parentStartAngle-(Math.PI/2) + sliceAngle * (i+1));
          /*
          console.log({
            'name': d.name,
            'index': i,
            'cx': cx
          });
          */
          return cx;
        })
        .attr('cy', function(d,i){
          var cy = (outer_radius + 20) * Math.sin(parentStartAngle-(Math.PI/2) + sliceAngle * (i+1));
          //console.log('cy: ', cy);
          return cy;
        })
        .attr('r', circle_radius)
        .attr('fill','#006DFC')
        .on('mouseover', function(d){
          var x = chart_width/2 - card_width/2 + arc_height*2 + 5;
          var y = chart_height/2 - card_height/2 + arc_height*2 + 5;

          d3.select('#card_container')
            .style('left', x + 'px')
            .style('top', y + 'px')
            .style('display', 'block');

          d3.select('#name')
            .text(d.name);

          d3.select('#team')
            .text(parentName);

          d3.select('#sub_team')
            .text(d.sub_team);

          d3.select('#title')
            .text(d.title);

          d3.select('#responsibility')
            .text(d.responsibility);
        })
        .on('mouseout', function(){
          d3.select('#card_container')
            .style('display', 'none');

          d3.select('#name')
            .text('');

          d3.select('#team')
            .text('');

          d3.select('#sub_team')
            .text('');

          d3.select('#title')
            .text('');

          d3.select('#responsibility')
            .text('');
        });
      })
};

function getHiddenArc(currentElement) {
  //A regular expression that captures all in between the start of a string
  //(denoted by ^) and the first capital letter L
  var firstArcSection = /(^.+?)L/;

  //The [1] gives back the expression between the () (thus not the L as well)
  //which is exactly the arc statement
  var newArc = firstArcSection.exec( d3.select(currentElement).attr('d') )[1];

  //Replace all the comma's so that IE can handle it -_-
  //The g after the / is a modifier that "find all matches rather than
  //stopping after the first match"
  newArc = newArc.replace(/,/g , " ");

  /*
  //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
  //flip the end and start position
  if (d.endAngle > 90 * Math.PI/180) {
    var startLoc 	= /M(.*?)A/,		//Everything between the first capital M and first capital A
      middleLoc 	= /A(.*?)0 0 1/,	//Everything between the first capital A and 0 0 1
      endLoc 		= /0 0 1 (.*?)$/;	//Everything between the first 0 0 1 and the end of the string (denoted by $)
    //Flip the direction of the arc by switching the start en end point (and sweep flag)
    //of those elements that are below the horizontal line
    var newStart = endLoc.exec( newArc )[1];
    var newEnd = startLoc.exec( newArc )[1];
    var middleSec = middleLoc.exec( newArc )[1];

    //Build up the new arc notation, set the sweep-flag to 0
    newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
  }//if
  */

  return newArc;
};

export default generate;
