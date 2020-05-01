// import './App.css';
import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class App extends Component {
  state = {
    speakers: "i'm simply not loaded yet",
    speakersTrue: "i'm not loaded yet",
    speakersFalse: "i'm also not loaded yet",
    theSpeaker: undefined,
    category: "category is not loaded yet"
  }


  componentDidMount() {

    ///HERE IS THE ITORAH API GET REQUEST///

    axios.get(`https://api.itorah.com/api/Speakers/allspeakers`).then(res => { //This takes some time by the time it gets back 

      this.setState({
        speakers: res.data,
      })
      // FINDING OUT IF SPEAKER IS MAIN SPEAKER OR NOT
      let mainRabbi = this.state.speakers.filter(function (mainSpeaker) {
        return mainSpeaker.isMainSpeaker === true;
      });
      let notMainRabbi = this.state.speakers.filter(function (notMainSpeaker) {
        return notMainSpeaker.isMainSpeaker === false;
      });

      this.setState({
        speakersTrue: mainRabbi,
        speakersFalse: notMainRabbi

      })

      axios.get(`https://api.itorah.com/api/Categories/catfilter?SpeakerID=+”speakerID”`).then(res => { //This takes some time by the time it gets back 
        // Getting category data
        this.setState({
          category: res.data,
        })

      })
    })
    /////////////////////////////////////////////////


  }



  //ACTUALLY DISPLAYING THE SPEAKERS WITHIN THE DROPDOWN//
  showSpeakersTrue = () => {
    // console.log(this.state.speakersTrue)
    if (this.state.speakersTrue === "i'm not loaded yet") { console.log("loading...") }
    //LOADS SPEAKERS FIRST THAT ARE MAIN SPEAKERS//
    if (this.state.speakersTrue !== "i'm not loaded yet") {
      return this.state.speakersTrue.map(eachSpeaker => {

        return (
          <>
            <Dropdown.Item onClick={this.saveRabbiName} name={eachSpeaker.speaker}>{eachSpeaker.speaker}</Dropdown.Item>
          </>
        )
      });

    }
  }

  showSpeakersFalse = () => {
    // console.log(this.state.speakersFalse)
    if (this.state.speakersFalse === "i'm also not loaded yet") { console.log("loading not main speakers...") }
    //LOADS SPEAKERS SECOND THAT ARE NOT SPEAKERS//
    if (this.state.speakersFalse !== "i'm also not loaded yet") {
      return this.state.speakersFalse.map(eachSpeaker => {
        return (
          <>
            <Dropdown.Item onClick={this.saveRabbiName} name={eachSpeaker.speaker}>{eachSpeaker.speaker}</Dropdown.Item>
          </>
        )
      })
    }
  }

  //// SAVES SPEAKER NAME??why is it always one behind when i set state?/////
  saveRabbiName = (e) => {
    console.log("I AM BEING CLICKED");
    let rabbiName = "";
    rabbiName = e.target.name
    console.log(rabbiName)

    let findSpeaker = this.state.speakers.filter(function (eachFindSpeaker) {
      return eachFindSpeaker.speaker == e.target.name;
    });

    this.setState({
      theSpeaker: findSpeaker,

    })

    console.log(this.state.theSpeaker)



  }

  theCategory = () => {
    if (this.state.category === "category is not loaded yet") { console.log("loading categories...") }
    if (this.state.category !== "category is not loaded yet") {
      return this.state.category.map(eachCat => {
        return (
          <>
            <Dropdown.Item>{eachCat.name} ({eachCat.shiurCount})</Dropdown.Item>
          </>
        )
      })
    }
  }



  render() {
    return (

      <div>
        <Container>
          <Row>

            <Col xs={4}>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  All Speakers
              </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.showSpeakersTrue()}
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item></Dropdown.Item>
                  {this.showSpeakersFalse()}
                </Dropdown.Menu>
           
              </Dropdown>
            </Col>

            <Col xs={4}>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select Category
              </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.theCategory()}
                </Dropdown.Menu>
               
              </Dropdown>
            </Col>

            <Col xs={4}>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Subcategories
              </Dropdown.Toggle>

                <Dropdown.Menu>
                  
                  <Dropdown.Item>Subcat</Dropdown.Item>
                  <Dropdown.Item>Subcat</Dropdown.Item>
                  <Dropdown.Item>Subcat</Dropdown.Item>
                 
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;