// robotForm 

//  probs
// state. 
var RobotBox = React.createClass({
	getData:function(){
		$.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
      	console.log(data)
        this.setState({data: data}); // we set the current data using this.State, which we can use for our rendering components. 
      }.bind(this), //find! what this does!!!
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},
	componentDidMount: function() {
    this.getData();
  },
	displayData:function(){

	},
	validateData:function(){
		console.log("validating!")
	},
	// how can i get the data in? 
	// react totutiral
	handleDataSubmission:function(robot){
		//this.validateData()
		console.log("robot")
		console.log(robot)
		var robots = this.state.data;
    robots.push(robot); // robot being hash of grid size coorindates.
		this.setState({data: robots}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
	    $.ajax({
	        url: this.props.url, // i think comes from render, so codinates.json
	        dataType: 'json',
	        type: 'POST',
	        data: robot,
	        success: function(data) {
	        	console.log(data)
	          this.setState({data: data});
	        }.bind(this), // need to look at why bind is here?
	        error: function(xhr, status, err) {
	          console.error(this.props.url, status, err.toString());
	        }.bind(this)
	      });
	    });
	},
	render:function(){
		return(
			<div className="robotContainer">
        <h1>instructions</h1>

        <RobotForm onRobotCoordinateSubmit={this.handleDataSubmission} />
  		</div>
		)
	}

})

var RobotOutput = React.createClass({
	render:function(){
		var dataOutput = this.props.data
		console.log(dataOutput)
		return(
			<input type="text" id="coordinateOutput"></input>
		)

	}
})
// enter data
// send of form
// get data 
// process instructions
// need to get rwaw data out of form before processing instructions.

var RobotForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault(); // prevent form from loading.
    var boundaryCoordinates = this.refs.coordinateBoundary.getDOMNode().value.trim();
    console.log(boundaryCoordinates)
    var coordinateInput = this.refs.coordinateInput.getDOMNode().value.trim();
    console.log(coordinateInput)
    var instructionCommands = this.refs.coordinateInput.getDOMNode().value.trim();
    console.log(instructionCommands)
    // jsut putting the data into a hash
    this.props.onRobotCoordinateSubmit(
    					{
    						boundaryCoordinates: boundaryCoordinates, 
    						coordinateInput:coordinateInput,
    						instructionCommands:instructionCommands 
    					}
    				);
    this.refs.coordinateInput.getDOMNode().value = '';
    this.refs.instructionCommands.getDOMNode().value = '';
  },
  render: function() {
    return (
      <form className="robotForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="between 0 & 50" ref="coordinateBoundary" />
        <input type="text" placeholder="1 5 N" ref="coordinateInput" />
        <input type="text" placeholder=" e.g FFFLLRRR"  ref="instructionCommands"/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

React.render(
  <RobotBox url="coordinates.json" />, // THIS NEEDS TO BE SET IN NODE ,
  document.getElementById('content')// THINK ITS A URL, IT NEEDS TO BE RETURNED
);




// var RobotInstructions = React.createClass({
// 	getData:function(){

// 	}
// })
// var RobotForm = React.createClass({



// })



// var robotForm = React.createClass({
// 	render:function(){
// 		return(

// 		)
// 	}
// })

// var Timer = React.createClass({
//   getInitialState: function() {
//     return {secondsElapsed: 0};
//   },
//   tick: function() {
//     this.setState({secondsElapsed: this.state.secondsElapsed + 1});
//   },
//   componentDidMount: function() {
//     this.interval = setInterval(this.tick, 1000);
//   },
//   componentWillUnmount: function() {
//     clearInterval(this.interval);
//   },
//   render: function() {
//     return (
//       <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
//     );
//   }
// });

// React.render(<Timer />, mountNode);