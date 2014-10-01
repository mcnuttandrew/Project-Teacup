// (function ($) {
// 	// $.UsersSearch = function (el) {
// // 		this.$el = $(el);
// // 		this.input = this.$el.find("input");// this is maybe wrong
// // 		this.ul = this.$el.find(".users-list");//this is maybe wrong
// // 		this.$el.on("input", this.input, this.handleInput.bind(this));
// // 		this.$el.on("click", this.input, this.handleClick.bind(this));
// // 	};
// //
// // 	$.UsersSearch.prototype.renderResults = function (fetchedUsers) {
// // 		this.ul.empty();
// // 		for(var i = 0; i < fetchedUsers.length; i++){
// // 			var temp = $("<li>");
// //
// // 			var user = fetchedUsers[i];
// // 			var link = $("<a>")
// // 			link.attr("href", "#/users/" + user.id ).append(user.username);
// // 			temp.append(link);
// //
// // 			this.ul.append(temp);
// // 		}
// // 		// $('.user-drop-down').dropdown('toggle')
// // 	};
// //
// // 	$.UsersSearch.prototype.handleInput = function (event) {
// // 		event.preventDefault();
// // 		// this.el.addClass("open");
// // 		var that = this;
// // 		$.ajax({
// // 			type: "GET",
// // 			url: "api/users/search" ,
// // 			dataType: "json",
// // 			data: {"query": that.input.val()},
// // 			success: function(fetchedUsers){
// // 				that.renderResults(fetchedUsers);
// // 			}
// // 		});
// // 	};
// //
// // 	$.UsersSearch.prototype.handleClick = function(event) {
// // 		this.ul.empty();
// // 	};
//
// 	$.UsersSearch = function (el) {
// 		$.ajax({
// 					type: "GET",
// 					url: "api/users/search" ,
// 					dataType: "json",
// 					data: {"query": that.input.val()},
// 					success: function(fetchedUsers){
// 						that.renderResults(fetchedUsers);
// 					}
// 				});
// 		this.$el = $(el);
// 		this.input = this.$el.find("input");// this is maybe wrong
// 		this.ul = this.$el.find(".users-list");//this is maybe wrong
// 		this.$el.on("input", this.input, this.handleInput.bind(this));
// 		this.$el.on("click", this.input, this.handleClick.bind(this));
// 	};
//
// 	$.fn.usersSearch = function () {
// 	  return this.each(function () {
// 	    new $.UsersSearch(this);
// 	  });
// 	};
// })(jQuery)
//
// $(function () {
//   $(".users-search").usersSearch();
// });


//
// var substringMatcher = function(strs) {
//   return function findMatches(q, cb) {
//     var matches, substrRegex;
//
//     // an array that will be populated with substring matches
//     matches = [];
//
//     // regex used to determine if a string contains the substring `q`
//     substrRegex = new RegExp(q, 'i');
//
//     // iterate through the pool of strings and for any string that
//     // contains the substring `q`, add it to the `matches` array
//     $.each(strs, function(i, str) {
//       if (substrRegex.test(str)) {
//         // the typeahead jQuery plugin expects suggestions to a
//         // JavaScript object, refer to typeahead docs for more info
//         matches.push({ value: str });
//       }
//     });
//
//     cb(matches);
//   };
// };
//
// $.ajax({
// 		type: "GET",
// 		url: "api/users/" ,
// 		dataType: "json",
// 		success: function(fetchedUsers){
// 			var names = [];
// 			for(var i = 0; i < fetchedUsers.length; i++){
// 				// debugger;
// 				names.push(fetchedUsers[i].username)
// 			}
//
// 			// var names = fetchedUsers;
// 			$('#users-search .typeahead').typeahead({
// 			  hint: true,
// 			  highlight: true,
// 			  minLength: 1
// 			},
// 			{
// 			  name: 'states',
// 			  displayKey: 'value',
// 			  source: substringMatcher(names)
// 			});
// 		}
// 	});
//  // debugger;
//
// $('#custom-templates .typeahead').typeahead(null, {
//   name: 'users',
//   displayKey: 'value',
//   source: $.ajax({
// 		type: "GET",
// 		url: "api/users/" ,
// 		dataType: "json",
// 		success: function(fetchedUsers){
// 			var names = [];
// 			for(var i = 0; i < fetchedUsers.length; i++){
// 				// debugger;
// 				names.push(fetchedUsers[i].username)
// 			}
// 			return names
// 		}
// 	}),
//   templates: {
//     empty: [
//       '<div class="empty-message">',
//       'unable to find any Best Picture winners that match the current query',
//       '</div>'
//     ].join('\n'),
//     suggestion: ['<p><strong><%=value%></strong></p>']
//   }
// });
// // $('#user-drop-down').typeahead({
//   hint: true,
//   highlight: true,
//   minLength: 1
// },
// {
//   name: 'users',
// 	remote: "/api/users/search",
//   displayKey: 'value',
//   // source: substringMatcher(names)
// });
