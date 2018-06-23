import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
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

var characters = ['http://images6.fanpop.com/image/articles/228000/disney-princess_228625_7.jpg?cache=1390950448',
'https://i.pinimg.com/originals/be/a4/9a/bea49ab12b6614bfe1b0ed87f8dd3577.jpg',
'https://metrouk2.files.wordpress.com/2013/08/ay_116156320.jpg',
'https://sites.google.com/site/aliteraryjourney/_/rsrc/1341867023800/social-bases-for-behavior/disney-characters---beauty-or-beast/Cinderellaprincess.jpg?height=200&width=190',
'https://i.pinimg.com/236x/d9/6f/e9/d96fe93b9ccaaf496cfcf624d1024adf--classic-cartoons-disney-characters.jpg',
'https://i.pinimg.com/236x/12/26/e8/1226e8e5511d6245645b3386d1fe2ab4--movie-drinking-games-dumbo.jpg',
'http://disneytimes.com/wp-content/uploads/2014/08/Disney-Infinity-2-Jasmine-Figure.jpg',
'https://i.pinimg.com/736x/9c/33/f9/9c33f931a8d4100bd5909bb7cf792863--mickey-mouse-cartoon-minnie-mouse.jpg',
'https://www.collegefashion.net/.image/t_share/MTI4ODM2OTk2NzI5NzI4OTk0/minnie-mouse-288x350.jpg',
'https://vignette.wikia.nocookie.net/disney/images/2/29/Rapunzel-disney-princess-22935939-267-300.jpg/revision/20130427192840',
'http://images6.fanpop.com/image/polls/1584000/1584293_1473026374312_full.png',
'https://vignette.wikia.nocookie.net/disney/images/c/c6/Stitch_%28Lilo_and_Stitch%29.jpg/revision/latest?cb=20170926040143'];


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

    handleClick(event) {
        event.preventDefault();
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const curr_key = event.target.id;
        var shuffleImages = this.state.images;
        console.log("curr_key cliked: " + shuffleImages[curr_key].clicked);
        //check to see if curr_key's clicked value has been clicked before.
        if(shuffleImages[curr_key].clicked){
            shuffleImages = UTIL.shuffle(shuffleImages);
            shuffleImages[curr_key].clicked = false;
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
                        <div><h3>Clicky Game!!</h3> </div>
                    </Col>
                    <Col size="md-3">
                        <div><h3>{this.state.recent_guess}</h3> </div>
                    </Col>
                    <Col size="md-3">
                        <div><h3>Score : {this.state.score} | Top Score: {this.state.top_score}</h3> </div>
                    </Col>
                </Row>
                <Row>
                    <Jumbotron>
                        <h3>Clicky Game!!!</h3>
                        <h5>Click on an image to earn points, but don't click on any more than once! </h5>
                    </Jumbotron>
                </Row>
                <Row>
                    <main className="container">
                        {this.state.images.map(image => {
                            return (
                            <div role="img" aria-label="click item" key={image.key} className={(image.key%2===0) ? "click-item float-left" : "click-item float-right"}>
                                <img alt="disney" height="150px" width="140px" id={image.key} src={image.src} key={image.key} className="border border-dark click-item" onClick={this.handleClick} />
                            </div> );
                        })}
                    </main>
                </Row>
            </Container>
        );
    }
}

export default Images;