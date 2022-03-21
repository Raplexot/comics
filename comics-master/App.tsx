import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, Image, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const App: () => Node = () => {
  const [comics, setComics] = useState({});
  const [comicsNum, setComicsNum] = useState((Math.random() * 2594).toFixed(0));

  function getComics() {
    fetch(`https://xkcd.com/${comicsNum}/info.0.json`)
      .then(res => res.json())
      .then(res => setComics(res));
  }

  useEffect(() => {
    getComics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicsNum]);

  const onSwipeRight = () => {
    setComicsNum(comicsNum + 1);
  };
  const onSwipeLeft = () => {
    setComicsNum(comicsNum - 1);
  };

  return (
    <SafeAreaView>
      <GestureRecognizer
        onSwipeLeft={() => onSwipeLeft()}
        onSwipeRight={() => onSwipeRight()}
        config={config}>
        <View>
          <Image style={styles.stretch} source={{uri: comics.img}} />
        </View>
      </GestureRecognizer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  stretch: {
    width: '100%',

    height: 450,
    resizeMode: 'stretch',
  },
});

export default App;
