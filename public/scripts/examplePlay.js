var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];
// hooking up data model


var CommentBox = React.createClass({
	// will execute once in a lifestyle to update inital component.
	getInitialState: function() {
    return {data: []};
  },
  // this.state is a private component and can be changed by calling this.setstate()

  // use jQuery to get inital state. 
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url, // success and error 
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this) // attach a handler => new function when called will have its this value set to this.
    });
  },
  handleCommentSubmit: function(comment) {
    // TODO: submit to the server and refresh the list
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
       // now we can render our comment list + comment forminto the this class
       <h1>Comments</h1> // mixing html components with special react components.
        <CommentList data={this.state.data}/>		// html are still regular react components, but JSX will automatically 
				// rewrite HTML tags to React.createElement(tagName) and leave everything else alone 
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />

      </div>				// this is to prevent pollution of global namespace.
      // then we render htis later on in React.render
    );
  } // rendering a simple comment box
});
var CommentList = React.createClass({ // simple components
	render:function(){
		return (
			<div className = "commentList">
				<Comment author="Pete Hunt">This is one comment</Comment>
       			<Comment author="Jordan Walke">This is *another* comment</Comment>
			</div> // so again this will render the comment component
		)

	}
});
var CommentForm = React.createClass({ // simple componetns
	handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) { // if not text or not author.
      return;
    }
    // TODO: send request to the server
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
  },
	render:function(){
		return (
			<form className="commentForm">
        <input type="text" placeholder="Your name" />
        <input type="text" placeholder="Say something..." />
        <input type="submit" value="Post" />
      </form>
		)

	}
});
var converter = new Showdown.converter(); // dont use this for time being...
var Comment = React.createClass({
	render:function(){
			// passing data from parent list to child comment
			// this is like linking the author to
			// kidn of like making this property aviable so when we render commoent list we can manually put stuff in 
		var commentNodes = this.props.data.map(function (comment) {
	      	return (
		        <Comment author={comment.author}>
		          {commentNodes}
		        </Comment>
	      	);
    	});
	}

})


// this is like the main render bit
React.render(
	// render returns a tree of components which we can render into html
  <CommentBox url="comments.json" pollInterval={2000} />, // we can use JXS directly on tag class name
	document.getElementById('content') // this will render the COMMENTBox onto the page.
  // render the comment box on the document.get element by ID commentbox
);
// this component rerenders itself, 
// wont have any data untill the request from the server comes back.



// skeltons of comment list and comment form.
// commentList => commentForm

