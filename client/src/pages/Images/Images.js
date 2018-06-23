import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Thumbnail from "../../components/Thumbnail";
import { Col, Row, Container } from "../../components/Grid";
import UTIL from "../../utils/UTIL";

/* 
 state variables:
 images = [];
 image = {
     src = image source
     clicked = false;
 }
*/

var characters = ['assets/images/anna.jpg','assets/images/ariel.jpg','assets/images/belle.jpg',
'assets/images/cinderella.jpg','assets/images/daisy.jpg','assets/images/dumbo.jpg',
'assets/images/jasmine.jpg','assets/images/mickey.png','assets/images/minnie.jpg',
'assets/images/rpunzel.jpg','assets/images/snow-white.jpg','assets/images/stitch.jpg'];


class Images extends Component {
    constructor(){
        super();
        var imgs = [];
        characters.forEach(function(c,i){
            var disney = {};
            disney.src = c;
            disney.key = i;
            disney.clicked = false;

            imgs.push(disney);
        });

        this.state = {
          images: imgs,
          score : 0,
          top_score : 0,
          recent_guess : "Click an image to begin!"
        };

        this.handleClick = this.handleClick.bind(this);
    
    }

    handleClick = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const curr_key = event.target.key;
        var shuffleImages = this.state.images;
        //check to see if curr_key's clicked value has been clicked before.
        if(shuffleImages[curr_key].clicked){
            shuffleImages = UTIL.shuffle(shuffleImages);
            this.setState({
                images : shuffleImages,
                score : 0,
                recent_guess : "You Guessed Incorrectly!!"
            });
        }
        else{
            shuffleImages[curr_key].clicked = true;
            shuffleImages = UTIL.shuffle(shuffleImages);
            var currScore = this.state.score+1;
            var topScore = currScore > this.state.top_score ? currScore : this.state.top_score;

            this.setState({
                images : shuffleImages,
                score : currScore,
                top_score : topScore,
                recent_guess : "You Guessed Correctly!!"
            });
            
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-3">
                        <div><h1>Clicky Game!!</h1> </div>
                    </Col>
                    <Col size="md-3">
                        <div><h1>{this.state.recent_guess}</h1> </div>
                    </Col>
                    <Col size="md-3">
                        <div><h1>Score : {this.state.score} | Top Score: {this.state.top_score}</h1> </div>
                    </Col>
                </Row>
                <Row>
                    <Jumbotron>
                        <h1>Clicky Game!!</h1>
                        <h2>Click on an image to earn points, but don't click on any more than once! </h2>
                    </Jumbotron>
                </Row>
                <Row>
                    <main className="container">
                        {this.state.images.map(image =>(
                            <div key={image.key} role="img" aria-label="click item" class="click-item" onClick={this.handleClick}>
                                <Thumbnail src={image.src} />
                            </div>
                        ))}
                    </main>
                </Row>
            </Container>
        );
    }
}

export default Images;