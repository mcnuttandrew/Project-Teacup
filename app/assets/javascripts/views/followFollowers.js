Teacup.Views.followFollowers = Backbone.View.extend({
	template: JST["users/scatter"],
	
	initialize: function(options){
		this.dataset = [];
		this.assembleDataSet();
	},

	render: function() {		
		// debugger;
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		if(this.$el.find(".scatterDiv").children().length < 1){
			this.$el.find(".scatterDiv").html("<h1 class='loading text-center'>X</h1>")
		}
		var that = this;
		setTimeout(function(){
			that.buildGraphic();
		},1000)
		return this
	},
	
	
	assembleDataSet: function(){
		this.dataset = []
		var userFollows = [];
		for(var i = 0; i < this.model.get('followed').length; i++){
			userFollows.push(this.model.get('followed')[i].id);
		}
		var userFollowers = [];
		for(var i = 0; i < this.model.get('followers').length; i++){
			userFollowers.push(this.model.get('followers')[i].id);
		}
		// debugger;
		for(var i = 0; i < this.collection.models.length; i++){
			var followedCount = this.collection.models[i].get('followed').length;
			var followersCount = this.collection.models[i].get('followers').length;
			var username = this.collection.models[i].get('username');
			var id = this.collection.models[i].get('id');
			// var id = this.collection.models[i].get('id');
			// debugger;
			var currFollows = false;	
			if(userFollows.indexOf(this.collection.models[i].id) > 0){
				currFollows =  true;
			}
			var currFollowedBy = false;
			if(userFollowers.indexOf(this.collection.models[i].id) > 0){
				currFollowedBy = true;
			}
			 this.dataset.push([followersCount, followedCount, id, username, currFollows, currFollowedBy])
		}
		this.render();
	},
	
	buildGraphic: function(){
		//methods	
		var colorPicker = function(dataPoint){
			if(dataPoint[4] && dataPoint[5]){
				return "red"
			} else if (dataPoint[4]){
				return "#FD48FF"
			} else if (dataPoint[5]){
				return "#4688E8"
			} else {
				return "gray"
			};	
		}
		
		var fillColor = function(dataPoint){
			d3.select(this).style('fill', colorPicker(dataPoint));
		}
		
		var removeColor = function(dataPoint){
			d3.select(this).style('fill', 'white');
		}	
		
		var addOpac = function(dataPoint){
			d3.select(this).style('opacity', 0);
		}
		
		var removeOpac = function(dataPoint){
			d3.select(this).style('opacity', 1);
		}		
		
		//setup
		$(".scatterDiv").empty();
		var w = 550;
		var h = 500;
		var margins = {"left": 100, "right": 30, "top": 30, "bottom": 50}		
		var svg = d3.select(".scatterDiv")
								.append("svg")
								.attr("width", w)
								.attr("height", h)
								.append("g")
								.attr("transform", "translate(" + margins.left + "," + margins.top + ")");
								
		var xMax = d3.max(this.dataset, function(d){return d[0];})
		var yMax = d3.max(this.dataset, function(d){return d[1];})
		var largest = Math.max.apply(Math, [xMax, yMax]);
		var xScale = d3.scale.linear().domain([0, largest]).range([0, w - margins.left - margins.right]);
 		var yScale = d3.scale.linear().domain([0, largest]).range([h - margins.top - margins.bottom, 0]);
		//circles
		svg.selectAll("circle").data(this.dataset).enter().append("circle")
			.attr("cx", function(d) { return xScale(d[0]); })
		  .attr("cy", function(d) { return yScale(d[1]); })
			.style("fill", "white").style("stroke", colorPicker)
			.attr("stroke-width", 4)
			.attr("opacity", 0.8)
		  .attr("r", 5).attr("r", function(d) {
			    return Math.sqrt(d[0]*d[0] + d[1] * d[1]);
			})
			.on("mouseover", fillColor)
			.on("mouseleave", removeColor)
			.on("click", function(dataPoint){
				var locationUrl = "/users/" + dataPoint[2]
				Backbone.history.navigate(locationUrl, {trigger: true})
			});
			//mouse over text
		svg.selectAll("text")
			.data(this.dataset)
			.enter()
			.append("text")
			.attr("opacity", 0)
			.text(function(d) { return d[3]; })
			.attr("x", function(d) {return xScale(d[0]);})
			.attr("y", function(d) {return yScale(d[1]+.5);})
			.attr("font-size", "11px")
			.attr("fill", "white")
			.on("mouseover", removeOpac)
			.on("mouseleave", addOpac);
			
		//axes
		svg.append("g").attr("class", "x axis")
									 .attr("transform", "translate(0," + yScale.range()[0] + ")")
		svg.append("g").attr("class", "y axis");
		
	  svg.append("text")
	         .attr("fill", "#FFFFFF")
					  .attr("stroke", "#FFFFFF")
	         .attr("text-anchor", "end")
	         .attr("x", w / 2)
	         .attr("y", h - 35)
	         .text("Number of Followers");
					 
 	  svg.append("text")
 	         .attr("text-anchor", "end")
					 .attr("transform", "rotate(-90)")
 	         .attr("x", -h/3 )
  	       .attr("y", -35)
 	         .text("Number Following")
 	         .attr("fill", "#FFFFFF")
					 .attr("stroke", "#FFFFFF");
					 
		var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickPadding(2);
		var yAxis = d3.svg.axis().scale(yScale).orient("left").tickPadding(2);
		svg.selectAll("g.y.axis").call(yAxis).selectAll("text").style("stroke", "white");
		svg.selectAll("g.x.axis").call(xAxis).selectAll("text").style("stroke", "white");
	}
	

	
})