import React, {Component} from 'react';


class App extends React.Component {
    constructor(){
      super();

      //original state
      this.state = {
         movieURL: 'Search for a movie above..',
         gifURL: 'https://media.giphy.com/media/BBkKEBJkmFbTG/giphy.gif'
       };

    this.changeText = this.changeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    }

//main rendering
  render(){
    return(
      <div>
        <div className = "App-header">
          <h1>Welcome to MovieGIF!</h1>
          <p className = "Intro" >Where you read plots(and look at movie GIFs)!</p>
        </div>

        <SearchField handleSubmit = {this.handleSubmit} changeText = {this.changeText}/>
        <br/>
        <ResultField movURL = {this.state.movieURL} gifURL = {this.state.gifURL} />
        <ul>
            <li className = "List-header">Why not try:</li>
            <li>Toy Story</li>
            <li>Titanic</li>
            <li>Finding Nemo</li>
            <li>Pulp Fiction</li>
        </ul>
      </div>);
    }


    handleSubmit(target){
      target.preventDefault();
      this.search();

    }
    //setting the state of App to what is in the textbox
    changeText(c){
      this.setState({searchText : c.target.value});

    }
    //Fetches OMDB and GIPHY and sets the state of the App(parent component)
    search(){
      if(this.state.searchText){

        //plot fetch
        var x = this.state.searchText;
              let movURL = 'http://www.omdbapi.com/?apikey=&t=' + x + '&plot=full';

              fetch(movURL)
              .then(res => res.json())
              .then((out) => {
                this.setState({movieURL : out["Plot"]});


              })
              .catch(err => { throw err });


          //gif fetch
          let gifURL = 'http://api.giphy.com/v1/gifs/search?q=' + x + '&limit=1&rating=g&api_key=';

          fetch(gifURL)
          .then(res => res.json())
          .then((out) => {
            this.setState({gifURL: out.data[0].images.original.url});
            console.log(this.state.gifURL);
          })
          .catch(err => { throw err });









      }
      //Nothing was entered into the searchfield and so we call alarm
      else{
        alert("Please enter something to search for..")
      }

    }

}


//child component responsible for rendering the searchfield
class SearchField extends React.Component{
  render(){


    return(
      <div>
        <form onSubmit = {this.props.handleSubmit}>
          <input type="text" onChange ={this.props.changeText}/>
          <button type = "submit">press me!</button>
        </form>
      </div>)

  }


  }
//child component responsible for rendering the containers for results
class ResultField extends React.Component{

  render(){
    return(
          <div>
              <div className = "plotContainer"><h2>Movie plot</h2>{this.props.movURL}</div>
              <div className = "gifContainer"><h2></h2><img src= {this.props.gifURL} alt="No gifs yet.."/></div>
          </div>
    )


  }

}


//exporting App
export default App;
