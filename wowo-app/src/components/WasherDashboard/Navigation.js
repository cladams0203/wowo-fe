import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBCard, MDBContainer, MDBRow, MDBCol, MDBTypography, MDBRating, MDBIcon } from "mdbreact";
import {Line, Doughnut, HorizontalBar} from 'react-chartjs-2';
import Moment from 'react-moment';
import { setWorkStatus } from '../../actions/washerDashboardActions.js';

import WashMap from "./WashMap.js";
import Styled from "styled-components";
import Logo from "../../images/wowo-logo-word-full.svg";


// image class
const Img = Styled.img`
    // margin: 25px 0 25px 0;
`;

// map class
const MapContainer = Styled.div`
    height: 500px;
    width: 100%;
    position: relative;
`;

// data for the line graph
const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Monthly Earnings',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

// data for the donut graph
const donutData = {
	labels: [
		'Trucks',
		'Sedans',
		'Coupes'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

// data for the horizontal bar graph
const horizontalBarData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Miles Driven',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [1300, 1450, 1394, 1634, 1563, 1497, 1395]
    }
  ]
};

  // temporary get the user data from local storage instead of redux state
  const user = {
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    userType: localStorage.getItem('userType'),
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token')
  }
  
  
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.user,
      washerWorkStatus: {},
      washerRating: null,
      // labels for the rating stars
      ratingStars: [
        {
          tooltip: 'Very Bad'
        },
        {
          tooltip: 'Poor'
        },
        {
          tooltip: 'Ok'
        },
        {
          tooltip: 'Good',
          choosed: true
        },
        {
          tooltip: 'Excellent'
        }
      ]
    }
  }

  // toggle switch handler without API endpoint connection yet
  handleSwitchChange = () => {
    this.setState(prevState => {
      let user = { ...prevState.user };
      user.workStatus = !prevState.user.workStatus;
      return { user };
    })
    const payload = {
      "id": this.state.user.id,
      "workStatus": !this.state.user.workStatus
    }
    // console.log("payload is", payload);
    this.props.setWorkStatus(payload)
      .then((res) => {
        console.log("updated workStatus");
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  // logout function removes user data from localStorage and redirects to login
  logout = (evt) => {
    evt.preventDefault()
  
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('id');
    this.props.history.push('/login');
  }

  accountAge = creationDate => {
    var moment = require('moment');
    moment().format();

    const date = moment(creationDate).fromNow(true);
    const splitValues = date.split(" ");
    let value = 0;
    if(splitValues[0] == "a") {
      value = 1;
    } else {
      value = splitValues[0];
    }
    const pronoun = splitValues[1].charAt(0).toUpperCase() + splitValues[1].slice(1);
    const myObject = { value, pronoun };
    return myObject;
  }

  render() {
    const { user, washerRating, ratingStars } = this.state;
    const accountDate = this.accountAge(user.creationDate);
    // const accountDate = null;
    console.log("state is", this.state);
    return (
      <MDBContainer className="mb-5">
          <MDBRow className="mt-4 mb-4 align-items-end">
            <MDBCol className="text-left">
              <Img src={Logo} style={{ width: 180 + "px" }} alt="logo" />
            </MDBCol>
            <MDBCol className="text-right">
              <MDBRow end>
                <MDBCol>
                  <MDBTypography tag='h5'>
                    <small><strong>
                    <Moment format="dddd, LT" />
                    </strong><br />
                    <span className="text-muted">
                      <Moment format="MMMM Do, YYYY" />
                    </span></small>
                  </MDBTypography>
                </MDBCol>
                <MDBCol md="1">
                  <span onClick={this.logout}><MDBIcon icon="sign-out-alt" /></span>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="12">
              <MDBCard className="card-body" style={{ width: "100%", marginTop: "1rem" }}>
                <MDBRow className="align-items-center">
                  <MDBCol className="text-left">
                    <MDBRow className="align-items-center">
                      <MDBCol md="3">
                        <Img src="http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png" style={{ width: 100 + "px" }} alt="logo" />
                      </MDBCol>
                      <MDBCol>
                        <MDBTypography tag='h3'>
                            <small className="text-muted">Welcome back,</small><br />
                            <strong>{user.firstName || "firstName"}!</strong>
                        </MDBTypography>
                        <div className='custom-control custom-switch'>
                          <input
                            type='checkbox'
                            className='custom-control-input'
                            id='customSwitches'
                            checked={this.state.user.workStatus}
                            onChange={this.handleSwitchChange}
                            readOnly
                          />
                          <label className='custom-control-label' htmlFor='customSwitches'>
                            Active Washer
                          </label>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol>
                    <MDBRow className="align-items-center">
                      <MDBCol>
                        <MDBTypography tag='h3'>
                          <strong>{accountDate.value || "#"}</strong><br />
                          <small className="text-muted">{accountDate.pronoun || "time"}</small>
                        </MDBTypography>
                      </MDBCol>
                      <MDBCol>
                        <span><i className="fas fa-spinner fa-pulse fa-3x"></i></span>
                        {/* <MDBTypography tag='h3'>
                          <strong>47</strong><br />
                          <small className="text-muted">Washes</small>
                        </MDBTypography> */}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-4">
            <MDBCol md="8">
              <MDBCard>
                <MapContainer>
                  <WashMap />
                </MapContainer>
                {/* <Img src="https://www.dsdinc.com/wp-content/uploads/2017/08/map-placeholder.jpg" style={{ height: 500 + "px" }} alt="logo" /> */}
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard className="mb-4 pt-2 pb-2 align-items-center">
                <span><p>Loading..</p><i className="fas fa-spinner fa-pulse fa-3x"></i></span>
                {/* <MDBTypography tag='h3'>
                  <strong>{washerRating}</strong><br />
                  <small className="text-muted">Ratings</small>
                </MDBTypography>
                <MDBRating data={ratingStars} /> */}
              </MDBCard>
              <MDBCard className="mb-4">
                <Line data={lineData} />
              </MDBCard>
              <MDBCard className="mb-4">
                <Doughnut data={donutData} />
              </MDBCard>
              <MDBCard className="mb-4">
                <HorizontalBar data={horizontalBarData} />
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer,
  washerWorkStatus: state.washerDashboardReducer,
});

const mapDispatchToProps = {
  setWorkStatus
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation)
);