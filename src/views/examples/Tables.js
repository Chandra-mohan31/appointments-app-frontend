import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
// import "mdbreact/dist/css/style.css";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { data } from "jquery";
import { Link } from "react-router-dom";


const TableAppointments = ({appData}) =>{
  const [noviewData,setNoviewData] = useState(5);
  const [cycle,setCycle] = useState(false);
  const [reqappData,setReqappData] = useState(appData.slice(0,noviewData));
  console.log(reqappData);
    const viewMore = () => {
        // setNoviewdata(noviewdata+5);
        // console.log(custdata);
        let newn = noviewData + 5;
        if(newn <= appData.length){
        setReqappData(appData.slice(noviewData,newn))
        }else{
          setReqappData(appData.slice(0,5));
          setNoviewData(5);

        }
        
        setNoviewData(noviewData+5);
        
        console.log(reqappData);

        
        
    }

    const showLess = () =>{
      let newn = noviewData - 5;
      setReqappData(appData.slice(newn-5,newn));
      setNoviewData(newn);
    }
  return(
    <div>
      {/* {
        JSON.stringify(appData)
      } */}
      <table>
      <thead>
            <tr className="tableHead align-middle">
            {/* <th><input class="form-check-input" type="checkbox" id="gridCheck" /></th> */}
            <th scope="col">SUMMARY</th>
            <th scope="col">DATE</th>
            <th scope="col">TIME</th>
            <th scope="col">DOCUMENT</th>

          

            </tr>
        </thead>
        <tbody>
            {
                reqappData.length != 0 ? (
                   reqappData.map(appointment => (
                    <tr key={appointment.id}>
                        <td>{appointment.Summary}</td>
                        <td>{appointment.Date}</td>
                        <td>{appointment.Time}</td>
                        <td>
                          <a href={appointment.Doc} className="btn btn-success" target="_blank">Download</a>
                        </td>

                        

                        


                     </tr>
                   ))
                ):(
                  null
                  
                )
            }
           
            
            
        </tbody>
      </table>
      {
                noviewData <=5 ? (
                     <button className="viewmorebtn btn btn-primary " style={{position:"relative", marginRight:0}} onClick={viewMore} >View more</button> 
                ):(
                    reqappData.length != 0 ? (<div className="d-flex flex-row align-items-center justify-content-center" >  
                    <button className="viewlessbtn btn btn-primary mx-5 my-2" onClick={showLess} >prev</button>
                    <button onClick={viewMore} className="viewmorebtn mx-5 my-2 btn btn-primary" >View more</button> 

                    </div>):( <button className="viewlessbtn btn btn-primary mx-5 my-2" onClick={showLess} >prev</button>)
                )
            }
    </div>
  )
}

const Details = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);


  useEffect(() => {
    fetch("https://api.jobstextile.com/appointments")
      .then((response) => response.json())
      .then((d) => setAppointmentsData(d.Appointments));
  }, []);

  const data = {
    columns: [
      {
        label: "Summary",
        field: "Summary",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date",
        field: "Date",
        sort: "asc",
        width: 270,
      },
      {
        label: "Time",
        field: "Time",
        sort: "asc",
        width: 200,
      },
      {
        label: "Document",
        field: "Doc",
        sort: "asc",
        width: 100,
      },
    ],
    rows: appointmentsData,
  };
  if(appointmentsData.length != 0){
    return <TableAppointments appData={appointmentsData} />
  }else{
    return <div>loading...</div>
  }
  // return <MDBDataTable striped bordered small data={data} />;
};

const Tables = () => {
  
  // const [appointmentsData, setAppointmentsData] = useState([]);

  // useEffect(() => {
  //   fetch("https://api.jobstextile.com/appointments")
  //     .then((response) => response.json())
  //     .then((d) => setAppointmentsData(d.Appointments));
  // }, []);

  // console.log(appointmentsData);

  return (
    <>
      <Header />

      {/* <div>
        <MDBDataTable striped bordered small data={data} />
      </div> */}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3
                  style={{ fontSize: "26px", fontWeight: "700" }}
                  className="mb-0"
                >
                  Appointment Table
                </h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <div style={{ paddingLeft: "15px" }}>
                  <Details />
                </div>

                {/* <thead className="thead-light">
                  <tr>
                    <th scope="col">Summary</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Document</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsData?.map((id) => (
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{id.Summary}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{id.Date}</td>
                      <td>{id.Time}</td>
                      <td>
                        <a
                          href={id.Doc}
                          style={{ borderRadius: "360px" }}
                          className="btn btn-primary"
                          target="_blank"
                        >
                          <i class="fa fa-download" aria-hidden="true"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;