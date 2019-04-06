import React, { Component } from "react";
import MemoryCard from "./components/MemoryCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import memories from "./memories.json";


class App extends Component {
  // Setting this.state.memories to the memories json array
  state = {
    memories,
    score: 0,
    top_score: 0,
    status: "Click image to begin!",
    navbarClass: "gameStatus ",
    wrapperClass: "wrapper "
  };



  myShuffler = (memoryArr, resetCards, id) => {
    console.log("in myShuffler");

    // Using Fisher-Yates Algo
    // https://www.kirupa.com/html5/shuffling_array_js.htm
    for (let i = memoryArr.length - 1; i >= 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let itemAtIndex = memoryArr[randomIndex];
      memoryArr[randomIndex] = memories[i];
      memoryArr[i] = itemAtIndex;

      if (resetCards) { // if user selected same card again, reset game
        memoryArr[i].clicked = false;
      }
      else { // set clicked
        if (memoryArr[i].id === id) {
          memoryArr[i].clicked = true;
        }
      }
    }
  }

  shuffleMemory = memJson => {
    let memoryArr = this.state.memories;
    let score = this.state.score;
    let top_score = this.state.top_score;
    let resetCards = false;
    let statusText = "Click image to begin!";
    let navbarClass = "gameStatus ";
    let wrapperClass = "wrapper ";

    // Need to determine if image already clicked:
    //   if   clicked before - reset game (score)
    if (memJson.clicked === true) {
      console.log("already selected this card");
      if (score > top_score) {
        top_score = score;
      }
      score = 0;
      resetCards = true;
      statusText = "You guessed incorrectly!";
      // Need to flash statusText red
      navbarClass = navbarClass + "gameStatusIncorrect";
      // Need to shake .wrapper
      wrapperClass = wrapperClass + "incorrectShake";
    }
    else {
      console.log("new card selected");
      score++;
      statusText = "You guessed correctly!";
      // this is part of making nav bar green but not using it. navbarClass = navbarClass + "gameStatusCorrect";
      wrapperClass = "wrapper";
    }

    console.log("top score = " + top_score);
    console.log("score     = " + score);

    //  shuffle cards
    this.myShuffler(memoryArr, resetCards, memJson.id);
    this.setState({ memories: memoryArr });
    this.setState({ top_score: top_score });
    this.setState({ score: score });
    this.setState({ status: statusText });
    this.setState({ wrapperClass: wrapperClass });
    this.setState({ navbarClass: navbarClass });

  };

  // Map over this.state.memories and render a MemoryCard component for each memory object
  render() {
    return (
      <div>
        <Navbar
          status={this.state.status}
          score={this.state.score}
          top_score={this.state.top_score}
          navbarClass={this.state.navbarClass}
        />
        <Title
          title="Travel Clicky Game!"
          instructions="Click on an image to earn points, but don't click on any more than once!">
        </Title>
        <Wrapper wrapperClass={this.state.wrapperClass}>
          {this.state.memories.map(memory => (
            <MemoryCard
              shuffleMemory={this.shuffleMemory}
              id={memory.id}
              clicked={memory.clicked}
              name={memory.name}
              image={memory.image}
            />

          ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;
