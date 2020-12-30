import React from 'react'
import { MDBRow, MDBCol, MDBCard, MDBView, MDBCardBody, MDBMask } from "mdbreact"
import iconCodeMapping from '../WeatherIcon';
import Header from '../Component/Header';
// import {useParams} from 'react-router-dom'

export default function View(props) {
    // let { slug } = useParams();
    const data = props.location.state.data
    var dateObj = new Date(data[0].dt_txt)
    var day = dateObj.toLocaleString('en-US', { weekday: "long", month: "long", year: "numeric" })
    const getTime = (date) => {
        return new Date(date).toLocaleString('default', { hour: "numeric" })
    }
    return (
        <>
            <Header />
            <MDBCard className="my-5 px-5 pb-5 text-center">
                <MDBCardBody>
                    <h2 className="h1-responsive font-weight-bold my-5">

                        {day}
                    </h2>

                    <p className="grey-text w-responsive mx-auto mb-5">
                        All for this day
                  </p>
                    <MDBRow>
                        {data.map(item =>
                            <MDBCol lg="3" md="6" className="mb-lg-0 mb-5" key={item.dt} >
                                <MDBView hover>

                                    <h5 className="font-weight-bold mt-4 mb-3">{getTime(item.dt_txt)}</h5>
                                    <img
                                        tag="img"
                                        src={iconCodeMapping[item.weather[0].icon]}
                                        className="mx-auto"
                                        alt="Sample avatar"
                                    />

                                    <h6 className="mt-4 mb-3">
                                        <span className="font-weight-bold" >
                                            {item.main.temp_max} &#8451;
                                        </span>    &nbsp;
                                        <span className=" font-weight-bold grey-text" >
                                            {item.main.temp_min} &#8451;
                                        </span>
                                    </h6>  <MDBMask className="flex-center" overlay="grey-light">
                                        <p className="white-text">
                                        </p>
                                    </MDBMask>

                                </MDBView>
                            </MDBCol>
                        )}
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </>
    )
}
