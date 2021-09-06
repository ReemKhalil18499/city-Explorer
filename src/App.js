import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      City: "",
      lat: "",
      long: "",
      inspect: false,
    };
  }
  New = async (event) => {
    event.preventDefault();
    const City = event.target.City.value;
    const Link = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${City}&format=json`;
    try {
      const Reply = await axios.get(Link);
      this.setState({
        City: Reply.data[0].display_name,
        long: Reply.data[0].lon,
        lat: Reply.data[0].lat,
      });
    } catch {
      this.setState({
        inspect:true,
      })
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.New}>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label className="city">City</Form.Label>
            <Form.Control
              className="input"
              name="City"
              type="text"
              placeholder="Enter a City"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        {this.state.inspect?<p>Status Code: 400, 404, 500</p>:<p></p>}
        <p>
          City : {this.state.City}, lat:{this.state.lat}, long:
          {this.state.long}
        </p>
        <Image
          src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.lat},${this.state.long}&zoom=1-19`}
        />
      </> 
    );
  }
}

export default App;
