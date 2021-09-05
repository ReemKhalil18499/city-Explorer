import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      City: "",
      lat: "",
      long: "",
    };
  }
  New = async (event) => {
    event.preventDefault();
    const City = event.target.location.value;
    const Link = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${City}&format=json`;
    const Reply = await axios.get(Link);
    this.setState({
      location: Reply.data[0].display_name,
      long: Reply.data[0].long,
      lat: Reply.data[0].lat,
    });
  };

  render() {
    return (
      <>
        <Form>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control name="City" type="text" placeholder="Enter a City" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
      </>
    );
  }
}

export default App;
