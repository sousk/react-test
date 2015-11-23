/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var playReact = React.createClass({
  render() {
      if (! this.state.movies) {
          return this.renderLoadingView();
      }
      else {
          var movie = this.state.movies[0];
          return this.renderMovie(movie);
      }
  },

  renderLoadingView() {
  },

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  },

  getInitialState() {
      return {
          movies: null
      };
  },

  componentDidMount() {
      this.fetchData();
  },

  fetchData() {
      fetch(REQUEST_URL)
        .then((response) => {
            response.json()
        })
        .then((responseData) => {
            this.setData({
                movies: responseData.movies || []
            });
        })
        .done();
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
      flex: 1,
  },
  title: {
      fontSize: 28,
      marginBottom: 8,
      textAlign: 'center',
  },
  year: {
      textAlign: 'center',
  },
  thumbnail: {
      width: 53, height: 81
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('playReact', () => playReact);
