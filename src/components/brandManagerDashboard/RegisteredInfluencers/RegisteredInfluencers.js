import React,{useState} from 'react';
import RegisteredInfluencersList from "./RegisteredInfluencersList";
import { Grid } from '@material-ui/core';
import { ArrowBack, Search } from '@material-ui/icons';
import '../../../Style/brandManagerDashboard/registeredInfluencers.css';
import { Container, Row, Col } from 'react-grid-system';
import { Diversity1Rounded } from '@mui/icons-material';

const RegisteredInfluencers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredResults, setFilteredResults] = useState(RegisteredInfluencersList);

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchValue(searchText);
    let results = RegisteredInfluencersList;
    if (searchText) {
      results = RegisteredInfluencersList.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    setFilteredResults(results);
  }

  return (
    <div className='mainContainerRI'>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <div style={{display:"flex"}}>
            <h6>Registred Inflencers ({RegisteredInfluencersList.length})</h6>
            <input className='' style={{height:"25px"}} placeholder="Search by name" type="text" value={searchValue} onChange={handleSearch}></input>
            <div className="" style={{display:"flex"}}><p style={{fontSize:"13px"}}>View all</p>
            </div>
          </div>
        </Col>
      </Row>
  <Row className="mx-1"> 
    {filteredResults.map(item => (
      <Col xs={5} sm={5} md={4} lg={3} className="subContainerRI m-1">
        <Col xs={5} lg={3}><img className="imageRI" src={item.image}/></Col>
        <Col xs={5} lg={9}>
            <div className="ColDetailsRI">
              <p className='nameRI'>{item.name}</p>
              <p className='usernameRI'>@{item.userName}</p>
            </div>
        </Col>
      </Col>

    ))}
  </Row>
</div>

    );
}

export default RegisteredInfluencers;
















    // <div style={{margin: '5%'}}>
    // <div className="mainContainerRI" style={{display: 'flex', flexWrap: "nowrap", border: "2px solid red"}}>
        
    //   {RegisteredInfluencersList.map(item => {
    //     return (
    //         <div className="subContainerRI" >
    //             <div><img className="imageRI" src={item.image}/></div>
    //             <div>
    //                 <h3 className='nameRI'>{item.name}</h3>
    //                 <p className='usernameRI'>{item.hashtag}</p>
    //                 <p className='detailsRI'>{item.type}</p>
    //             </div>
    //         </div>
    //     )})}
    // </div>
    // </div>

      // <div className='container mx-2'>
    //   <div style={{display:"flex"}}>
    //     <div>
    //       <h6 style={{marginRight:"10px"}}>Registred Inflencers ({RegisteredInfluencersList.length})</h6>
    //       {/* <p style={{fontSize:"12px"}}>List of influencers registered with you</p> */}
    //     </div>
    //     {/* <Search style={{fontSize:"20px"}}className="mx-3"/> */}
    //     <input style={{height:"25px"}} type="text" value={searchValue} onChange={handleSearch}></input>
    //     <p style={{fontSize:"13px"}}>View all</p>
    //     <p className="mx-2" style={{fontSize:"13px"}}>Filters</p> 
    //   </div>
    //   <Grid item xs={12} container spacing={2} className="mainContainerRI">
    //    {filteredResults.map(item => {
    //     return (
    //       <Grid className="subContainerRI m-1" item lg={6} xs={12}>
    //             <div><img className="imageRI" src={item.image}/></div>
    //             <div>
    //                 <h3 className='nameRI'>{item.name}</h3>
    //                 <p className='usernameRI'>{item.hashtag}</p>
    //                 <p className='detailsRI'>{item.type}</p>
    //             </div>
    //       </Grid>
    //     )})}
    //   </Grid>
    // </div>
