import React, { useEffect, useState } from 'react'
import { MDBRow, MDBCol, MDBCard, MDBView, MDBCardBody, MDBMask, MDBAlert, MDBIcon } from "mdbreact"
import iconCodeMapping from '../WeatherIcon';
import { Link } from 'react-router-dom';
import Header from '../Component/Header';
import { keyword } from '../Component/Search';

export default function Home() {
    const [data, setData] = useState({});
    const [sameData, setSameData] = useState([]);
    const [key, setKeyword] = useState(keyword.search)
    const [isloading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    console.log(keyword.search + "kdk")

    useEffect(() => {
        var sameDate = []
        setIsLoading(true)
        fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + key + "&appid=ef9d4d5abe9ac79938327c660c3c3622")
            .then(res => res.json())
            .then(
                (result) => {

                    setData(result)
                    // eslint-disable-next-line array-callback-return
                    result.list.map(item => {
                        var x = new Date(item.dt_txt).toISOString().split('T')[0];
                        if (sameDate.indexOf(x) === -1) {
                            sameDate.push(x)

                        }

                    });

                    setSameData(sameDate)
                    setIsLoading(false)

                }, (error) => {
                    if (error) {
                        setError("Something Went Wrong... Failed to Fetch data")
                        setIsLoading(false)
                    }

                })
    }, [key])
    return (
        <>
            <Header setWord={setKeyword} />
            <MDBCard className="my-5 px-5 pb-5 text-center">
                {!error ? "" :

                    <MDBAlert color="warning">
                        <h4 className="alert-heading">OOps <MDBIcon icon="exclamation-triangle" />!</h4>
                        <p>Apologies ,we are unable to display the required details due to an error that has occured.Sorry for Such results And Try again Later.</p>
                        <hr />
                        <p className="mb-0">Check your Internet connection /Reload this page Or try Again letter</p>
                    </MDBAlert>

                }
                {isloading ?
                    <MDBCardBody className="my-5 px-5 pb-5 text-center mx-auto" >
                        <div className="spinner-grow " role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </MDBCardBody>
                    :

                    error ? "" :
                        <MDBCardBody>
                            <h2 className="h1-responsive font-weight-bold my-5">
                                {key.charAt(0).toUpperCase() + key.slice(1)}'s Weather Forecast
                           </h2>
                            <p className="grey-text w-responsive mx-auto mb-5">
                                Prepare for your journey
                           </p>

                            <MDBRow>

                                {sameData.map(item => {
                                    var m = data.list.filter(x => new Date(x.dt_txt).toISOString().split('T')[0] === item)
                                    var tempMaxAndMinDay = m.reduce((acc, current) => {
                                        if (current.temp_max > acc.max) {
                                            acc.max = current.temp_max;
                                        }
                                        if (current.temp_min < acc.min) {
                                            acc.min = current.temp_min;
                                        }
                                        return acc;
                                    })
                                    var dateObj = new Date(tempMaxAndMinDay.dt_txt)
                                    var weekday = dateObj.toLocaleString("default", { weekday: "long" })

                                    return (
                                        <MDBCol lg="2" md="6" className="mb-lg-0 mb-5 mx-auto" key={tempMaxAndMinDay.dt}   >
                                            <Link to={{
                                                pathname: '/day/' + weekday.slice(0, 3), state: { data: m }
                                            }}
                                                style={{ color: 'black' }}>

                                                <MDBView hover>

                                                    <h5 className="font-weight-bold mt-4 mb-3">
                                                        {weekday.slice(0, 3)}</h5>
                                                    <img
                                                        tag="img"
                                                        src={iconCodeMapping[tempMaxAndMinDay.weather[0].icon]}
                                                        className="mx-auto"
                                                        alt="Sample avatar"
                                                    />

                                                    <h6 className="mt-4 mb-3">
                                                        <span className="font-weight-bold" >
                                                            {tempMaxAndMinDay.main.temp_max} &#8451;
                                        </span>    &nbsp;
                                        <span className=" font-weight-bold grey-text" >
                                                            {tempMaxAndMinDay.main.temp_min} &#8451;
                                        </span>
                                                    </h6>
                                                    <MDBMask className="flex-center" overlay="grey-light"
                                                    >
                                                        <p className="white-text">See All about this day</p>
                                                    </MDBMask>

                                                </MDBView>

                                            </Link>
                                        </MDBCol>
                                    )
                                })}
                            </MDBRow>
                        </MDBCardBody>
                }
            </MDBCard>
        </>
    )
}