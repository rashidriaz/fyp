import axios from "axios"
import {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Style/BrandManagerPanel/NewCampaigns/newCampaigns.css';
import { ArrowBack } from '@material-ui/icons';
import { Card, Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewCampaign = () => {
  const [selected, setSelected] = useState('Single');
  const [isChecked, setIsChecked] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [storyCost, setStoryCost] = useState(0);
  const [postCost, setPostCost] = useState(0);
  const [campaignName, setCampaignName] = useState('');
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [budget, setBudget] = useState(0);
  const [campaignType, setCampaignType] = useState('');
  const [created, setCreated] = useState('');
  const [ended, setEnded] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [selectedButton, setSelectedButton] = useState('Single');
  const [selectedFile, setSelectedFile] = useState(null);
 
  
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/influencers/')
      .then((response) => {
        setInfluencers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };
 


  const handleClick = (value) => {
    setSelectedButton(value);
  };

  const handleCampaignNameChange = (event) => {
    setCampaignName(event.target.value);
  }

  
  const handleCampaignBudgetChange = (event) => {
    setBudget(event.target.value);
  }

  const handleCreated = (event) => {
    setCreated(event.target.value);
  }

  
  const handleEnded = (event) => {
    setEnded(event.target.value);
  }

  const handleHashtag = (event) => {
    setHashtag(event.target.value);
  }
  
  
  //make campaign live
  const handleCheckboxChange = (event, influencer) => {
    if (event.target.checked) {
      // Add user to selectedUsers list if checkbox is checked
      setSelectedInfluencers([...selectedInfluencers, influencer]);
    } else {
      // Remove user from selectedInfluencers list if checkbox is unchecked
      setSelectedInfluencers(selectedInfluencers.filter(selectedInfluencer => selectedInfluencer.id !== influencers.id));
   }
   console.log(selectedInfluencers);
  }

  const buttonStyle = {
    backgroundColor: selected === "Single" ? "purple" : "white",
    color: selected === "Single" ? "white" : "purple",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer"
  };



  const removeInfluencer = (indexToRemove) => {
    const removedInfluencer = influencers[indexToRemove];
    const updatedInfluencers = influencers.filter((_, index) => index !== indexToRemove);
    setInfluencers(updatedInfluencers);
  
    const storyCostChange = removedInfluencer.story ? -removedInfluencer.influencerStoryCost : 0;
    const postCostChange = removedInfluencer.post ? -removedInfluencer.influencerInfluencerPostCost : 0;
    setStoryCost(storyCost => storyCost + storyCostChange);
    setPostCost(postCost => postCost + postCostChange);
  };


  const fetchInfluencers = () => {
    axios
      .get('http://127.0.0.1:8000/influencers/')
      .then((response) => {
        setInfluencers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      setTotalCost(0);
  };


  useEffect(() => {
    setTotalCost(storyCost + postCost);
  }, [storyCost, postCost]);

  const handleSubmit = (event) => {
    event.preventDefault();
      const data = {
      campaign_name: campaignName,
      influencers: selectedInfluencers.map(selectedInfluencer => selectedInfluencer.id),
      budget: budget,
      campaign_type: campaignType,
      hashtag: hashtag,
      created: moment(created).format('YYYY-MM-DD'),
      ended: moment(ended).format('YYYY-MM-DD')
      // image: formData.append('image', selectedFile)
    };

    console.log(data);

    axios.post('http://127.0.0.1:8000/activecampaigns/', data)
    .then((response) => {
      console.log(response);

      toast.success('success');
      window.location.href = '/BMDashboard';
    })
    .catch((error) => console.log(error));
};


  return (
    <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
      <Row>
        <form onSubmit={handleSubmit}>
       <div className="d-flex"><ArrowBack/><h5>Create new Campaign</h5></div>
        <Col xs={12} sm={12} md={12} lg={12} className='d-lg-flex d-sm-block'> 
        <Col xs={12} sm={12} md={4} lg={4} style={{ height:'auto'}}>
              <div>
                  <label>Select start created</label>
                  <input type="date" id="created" name="created" value={created} onChange={handleCreated} />
                </div>
                <div>
                  <label>create hashtag</label><br/>
                  <input className='inputNC' type="text" placeholder="Create Hashtag" onChange={handleHashtag}/>
              </div>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4}>
           <div><label>Select end date</label>
           <input type="date" name="created" value={ended} onChange={handleEnded} />   
              </div>

              <div className="" style={{display:"block"}}>
                <label>Set Brand Budget</label><br/>
                {/* <input className='inputNC' type="text" placeholder="Rs. 5,000,000"/> */}
                <input className='inputNC' type="text" id="budget" name="budget" value={budget} placeholder="Rs. 5,000,000" onChange={handleCampaignBudgetChange} />
     
              </div>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4}>
              <div className="">
                <label>Enter Sub-Brand</label><br/>
                <input className='inputNC' type="text" placeholder="Enter brand"/>
              </div>

        <label htmlFor="campaignName">Campaign Name:</label>
        <input type="text" id="campaignName" name="campaignName" value={campaignName} onChange={handleCampaignNameChange} />
        
        <label htmlFor="campaignImage">Campaign image:</label>
        <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={handleFileChange}/>
        
        <div>
          <button
            style={{ 
              backgroundColor: selectedButton === 'Single' ? '#452c63' : 'white',
              color: selectedButton === 'Single' ? 'white' : 'black',
              width: '110px',
              borderRadius:'16px'
            }}
            onClick={() => handleClick('Single')}
          >
            Single
          </button>
          <button
            style={{ 
              backgroundColor: selectedButton === 'Periodic' ? '#452c63' : 'white',
              color: selectedButton === 'Periodic' ? 'white' : 'black',
              width: '110px',
              borderRadius:'16px'
           }}
            onClick={() => handleClick('Periodic')}
          >
            Periodic
          </button>
        </div>                     
        </Col>  
      </Col>
      <div className="mt-3 mb-2 d-lg-flex d-sm-block" style={{justifyContent:'space-between'}}>
          <h5 className="pickedInfluencersNC">Picked Influencers</h5>
          
          <Button style={{backgroundColor: '#452c63'}} onClick={fetchInfluencers}>
                  <AddIcon style={{ fontSize: '15px' }} />
                  Fetch Influencers
          </Button>
       </div>
           <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
            {influencers.map((item,index) => {
              return (
                <Col xs={8} sm={8} md={2} lg={2}>
                  <div className="subContainerNC" style={{overflow:'hidden'}}>
                    <input type="checkbox" id={item.id} name="influencers" value={item.id} onChange={(e) => handleCheckboxChange(e, item)} />
                   
                        <img className="imageNC" src="https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg" />

                    <p className='nameNC'>@{item.username.slice(0,8)}...</p>
                    <p className='userNameNC'>{item.fullname}</p>
                    <p className='EngagementRateNC'>Engagement Rate</p>
                   
                    <input
                      type="checkbox"
                      checked={item.story}
                      onChange={(e) =>{
                        setTotalCost(prev=>{
                          return item.story? prev+item.storyCost: prev-item.storyCost;
                        })
                      }}
                    />
                    <label>Story {item.storycost}</label>

                    <input
                      type="checkbox"
                      checked={item.post}
                      onChange={(e) =>{
                      
                        setTotalCost(prev=>{
                          return item.post? prev+item.postCost: prev-item.postCost;
                        })
                      }}
                    />
                    <label>Post {item.postcost}</label>
                    <button style={{backgroundColor:'red', borderRadius:'50%', height:'25px'}} onClick={() => removeInfluencer(index)}>-</button>
                  </div>
                </Col>
              )})}
           </div>
            {/* {influencers.map(influencer => (
          <div key={influencer.id}>
            <input type="checkbox" id={influencer.id} name="influencers" value={influencer.id} onChange={(e) => handleCheckboxChange(e, influencer)} />
            <label htmlFor={influencer.id}>{influencer.username}</label>
           
          </div>
        ))} */}


           <div className="d-lg-flex justify-content-between align-items-end d-sm-block ">
              {/* <div>
                  <input className='inputNC'
                    type="checkbox"
                    checked={isChecked}/>
                    
                  <label>Make Campaign Live</label>
              </div> */}
              <div className="d-block">
                <p>Total Cost: Rs. {totalCost}</p>
                <Button type="submit" style={{backgroundColor: '#452c63'}}>
                  Create Campaign
                </Button>
              </div>
           </div>
           </form>
      </Row>
    </Container>
  )  
}

export default NewCampaign;


  



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         'https://oauth.reddit.com/r/apple/new.json?limit=100',
  //         {
  //           headers: {
  //             Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg3NDkxOTk4LjY1MTk5OCwiaWF0IjoxNjg3NDA1NTk4LjY1MTk5NywianRpIjoiWGZRZmV3Nkl4VVp3emV3a3pORE14WWlPLXVXQ2lnIiwiY2lkIjoiNzU4WVRPTU5nRThTMDgxbmNIQmY1QSIsImxpZCI6InQyX3Y5YXJ5OW90IiwiYWlkIjoidDJfdjlhcnk5b3QiLCJsY2EiOjE2NzIyMjM4MzkwMDAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.Cr7aw_uf7hSIyjY40F57K5WBugxLhxyBzf5Z4j46yuG_p_zGrQPS8EauFtWX7aHB_cl073nbvRWBb4f7AMjSAYDuUaQCNmfwA0c9VQqsKuzF2uEHx96fBfg5CVdHII1vzUVipKaRlBvtyDZqz_0Vmxops8ZSs6oiObpOWAASVu_yHxXQ8Z7mI7YwuiUMggFZNvFA20GdXjIQRpoyHBGj5-A8e3zZw2e4Gfa7Q7No-YguUpM9YJqccnvC2HsolRC5qbx8RNuvtbAfDWvSHLI42YrMUbwSoxXGZTtWKJJ-6bvsLja7rt8lyB7wLGM0iTtXhBgiUhbopasmTxPufupQIQ',
  //             'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
  //           }
  //         }
  //       );
        
  //       const users = new Set(); // Set to store unique usernames
        
  //       const influencerArray = response.data.data.children.map((post) => {
  //         const username = post.data.author;
  //         const fullname = post.data.name;
  //         const image = post.data.icon_img ? post.data.icon_img : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg';
  //         if (!users.has(username)) { 
  //           users.add(username); 
  //           return { username, fullname, image }; 
  //         } else {
  //           return null; 
  //         }
  //       }).filter((item) => item !== null); 
  //       setInfluencers(influencerArray);
  //       console.log(influencerArray);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
    
  //   fetchData();
  // }, []);

  
  
///////////////////////////////////////////////////////////////////////////////////////
// const handleInfluencerChangeStory = (index, e) => {
//   const updatedInfluencers = [...influencers];
//   updatedInfluencers[index].story = e.target.checked;
//   setInfluencers(updatedInfluencers);

//   const cost = e.target.checked ? influencers[index].influencerStoryCost : -influencers[index].influencerStoryCost;
//   setStoryCost(storyCost + cost);
// };

// const handleInfluencerChangePost = (index, e) => {
//   const updatedInfluencers = [...influencers];
//   updatedInfluencers[index].post = e.target.checked;
//   setInfluencers(updatedInfluencers);

//   const cost = e.target.checked ? influencers[index].influencerInfluencerPostCost : -influencers[index].influencerInfluencerPostCost;
//   setPostCost(postCost + cost);
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







// const NewCampaign = () => {
//   const [startDate, setStartDate] = useState(new Date("2014/02/08"));
//   const [endDate, setEndDate] = useState(new Date("2014/02/10"));
//   const [filteredResults, setFilteredResults] = useState(RegisteredInfluencersList);
//   const [selected, setSelected] = useState('single');
//   const [isChecked, setIsChecked] = useState(false);
//   const [influencers, setInfluencers] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const [storyCost, setStoryCost] = useState(0);
//   const [postCost, setPostCost] = useState(0);
  
//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleCampaignNameChange = (event) => {
//     setCampaignName(event.target.value);
//   }

  
//   const handleCampaignBudgetChange = (event) => {
//     setBudget(event.target.value);
//   }

//   const handleDate = (event) => {
//     setDate(event.target.value);
//   }

//   const handleCampaignType = (event) => {
//     setCampaignType(event.target.value);
//   }


//   //make campaign live
//    const handleCheckboxChange = (event, influencer) => {
//      if (event.target.checked) {
//        // Add user to selectedUsers list if checkbox is checked
//        setSelectedInfluencers([...selectedInfluencers, influencer]);
//      } else {
//        // Remove user from selectedInfluencers list if checkbox is unchecked
//        setSelectedInfluencers(selectedInfluencers.filter(selectedInfluencer => selectedInfluencer.id !== influencers.id));
//     }
//    }
  


//   const handleToggle = (value) => {
//     setSelected(value);
//   };

//   const buttonStyle = {
//     backgroundColor: selected === "single" ? "purple" : "white",
//     color: selected === "single" ? "white" : "purple",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer"
//   };

//   const handleInfluencerChangeStory = (index, e) => {
//     const updatedInfluencers = [...influencers];
//     updatedInfluencers[index].story = e.target.checked;
//     setInfluencers(updatedInfluencers);

//     const cost = e.target.checked ? influencers[index].influencerStoryCost : -influencers[index].influencerStoryCost;
//     setStoryCost(storyCost + cost);
//   };

//   const handleInfluencerChangePost = (index, e) => {
//     const updatedInfluencers = [...influencers];
//     updatedInfluencers[index].post = e.target.checked;
//     setInfluencers(updatedInfluencers);

//     const cost = e.target.checked ? influencers[index].influencerInfluencerPostCost : -influencers[index].influencerInfluencerPostCost;
//     setPostCost(postCost + cost);
//   };

//   const removeInfluencer = (indexToRemove) => {
//     const removedInfluencer = influencers[indexToRemove];
//     const updatedInfluencers = influencers.filter((_, index) => index !== indexToRemove);
//     setInfluencers(updatedInfluencers);
  
//     const storyCostChange = removedInfluencer.story ? -removedInfluencer.influencerStoryCost : 0;
//     const postCostChange = removedInfluencer.post ? -removedInfluencer.influencerInfluencerPostCost : 0;
//     setStoryCost(storyCost => storyCost + storyCostChange);
//     setPostCost(postCost => postCost + postCostChange);
//   };


//   const fetchInfluencers = () => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//       setTotalCost(0);
//   };

//   useEffect(() => {
//     // Calculate the total cost based on the sum of storyCost and postCost
//     setTotalCost(storyCost + postCost);
//   }, [storyCost, postCost]);

//  const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = {
//       campaign_name: campaignName,
//       influencers: selectedInfluencers.map(selectedInfluencer => selectedInfluencer.id),
//       budget: budget,
//       campaignType: campaignType
//     };

//     console.log(data);
//     axios.post('http://127.0.0.1:8000/newactivecampaigns/', data)
//       .then(response => console.log(response))
//       .catch(error => console.log(error));
//   }


//   return (
//     <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
//       <Row>
//         <form onSubmit={handleSubmit}>
//        <div className="d-flex"><ArrowBack/><h5>Create new Campaign</h5></div>
//         <Col xs={12} sm={12} md={12} lg={12} className='d-lg-flex d-sm-block'> 
//         <Col xs={12} sm={12} md={4} lg={4} style={{ height:'auto'}}>
//               <div>
//                   <label for="exampleInputEmail1">Select start date</label>
//                   <DatePicker className='inputNC'
//                     selected={startDate}
//                     onChange={(date) => setStartDate(date)}
//                     selectsStart
//                     startDate={startDate}
//                     endDate={endDate}/>
//                 </div>
//                 <div>
//                   <label for="exampleInputEmail1">create hashtag</label><br/>
//                   <input className='inputNC' type="text" placeholder="Create Hashtag"/>
//               </div>
//         </Col>

//         <Col xs={12} sm={12} md={4} lg={4}>
//            <div><label for="exampleInputEmail1">Select end date</label>
//             <DatePicker className='inputNC'
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}/></div>

//               <div className="" style={{display:"block"}}>
//                 <label for="exampleInputEmail1">Set Brand Budget</label><br/>
//                 <input className='inputNC' type="text" placeholder="Rs. 5,000,000"/>
//               </div>
//         </Col>

//         <Col xs={12} sm={12} md={4} lg={4}>
//               <div className="">
//                 <label for="exampleInputEmail1">Enter Sub-Brand</label><br/>
//                 <input className='inputNC' type="text" placeholder="Enter brand"/>
//               </div>

//                 <div className="">
//                   <p style={{marginBottom:'0px'}}>Campaign Type</p>
//                     <button
//                       onClick={() => handleToggle('single')}
//                       style={{
//                         backgroundColor: selected === 'single' ? '#452c63' : 'white',
//                         color: selected === 'single' ? 'white' : 'black',
//                         width: '110px',
//                         borderRadius:'16px'
//                       }}
//                     >
//                       Single
//                     </button>
//                     <button
//                       onClick={() => handleToggle('periodic')}
//                       style={{
//                         backgroundColor: selected === 'periodic' ? '#452c63' : 'white',
//                         color: selected === 'periodic' ? 'white' : 'black',
//                         width: '110px',
//                         borderRadius:'16px'
//                       }}
//                     >
//                       Periodic
//                     </button>
//                     <button
//                     onClick={() => handleToggle('both')}
//                     style={{
//                       backgroundColor: selected === 'both' ? '#452c63' : 'white',
//                       color: selected === 'both' ? 'white' : 'black',
//                       width: '110px',
//                       borderRadius:'16px'
//                     }}
//                   >
//                     Both
//                   </button>
//                   </div>
//         </Col>  
//       </Col>
//       <div className="mt-3 mb-2 d-lg-flex d-sm-block" style={{justifyContent:'space-between'}}>
//           <h5 className="pickedInfluencersNC">Picked Influencers</h5>
          
//           <Button style={{backgroundColor: '#452c63'}} onClick={fetchInfluencers}>
//                   <AddIcon style={{ fontSize: '15px' }} />
//                   Fetch Influencers
//           </Button>
//        </div>
//            <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
//             {influencers.map((item,index) => {
//               return (
//                 <Col xs={8} sm={8} md={2} lg={2}>
//                   <div className="subContainerNC" style={{overflow:'hidden'}}>
//                     <img className='imageNC' src={`http://127.0.0.1:8000/${item.image}`}/>
//                     <p className='nameNC'>{item.influencer_full_name.slice(0, 15)}...</p>
//                     <p className='userNameNC'>@{item.influencer_username}</p>
//                     <p className='EngagementRateNC'>Engagement Rate</p>
//                     {/* <p className='NumberNC'>{item.engagement_rate}</p> */}

//                     <input
//                       type="checkbox"
//                       checked={item.story}
//                       onChange={(e) => handleInfluencerChangeStory(index, e)}
//                     />
//                     <label>Story {item.influencerStoryCost}</label>

//                     <input
//                       type="checkbox"
//                       checked={item.post}
//                       onChange={(e) => handleInfluencerChangePost(index, e)}
//                     />
//                     <label>Post {item.influencerInfluencerPostCost}</label>



//                     <button style={{backgroundColor:'red', borderRadius:'50%'}} onClick={() => removeInfluencer(index)}>-</button>
//                   </div>
//                 </Col>
//               )})}
//            </div>

//            <div className="d-lg-flex justify-content-between align-items-end d-sm-block ">
//               <div>
//                   <input className='inputNC'
//                     type="checkbox"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}/>
//                   <label>Make Campaign Live</label>
//               </div>
//               <div className="d-block">
//                 <p>Total Cost: Rs. {totalCost}</p>
//                 <Button style={{backgroundColor: '#452c63'}}>
//                   Create Campaign
//                 </Button>
//               </div>
//            </div>
//            </form>
//       </Row>
//     </Container>
//   )  
// }

// export default NewCampaign;


// const NewCampaign = () => {
//   const [startDate, setStartDate] = useState(new Date("2014/02/08"));
//   const [endDate, setEndDate] = useState(new Date("2014/02/10"));
//   const [filteredResults, setFilteredResults] = useState(RegisteredInfluencersList);
//   const [selected, setSelected] = useState('single');
//   const [isChecked, setIsChecked] = useState(false);
//   const [influencers, setInfluencers] = useState([]);
  
//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const handleToggle = (value) => {
//     setSelected(value);
//   };


//   const buttonStyle = {
//     backgroundColor: selected === "single" ? "purple" : "white",
//     color: selected === "single" ? "white" : "purple",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer"
//   };

//   const removeInfluencer = (indexToRemove) => {
//     setInfluencers(influencers.filter((_, index) => index !== indexToRemove));
//   };



//   return (
//     <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
//       <Row>
//        <div className="d-flex"><ArrowBack/><h5>Create new Campaign</h5></div>
//         <Col xs={12} sm={12} md={12} lg={12} className='d-lg-flex d-sm-block'> 
//         <Col xs={12} sm={12} md={4} lg={4} style={{ height:'auto'}}>
//               <div>
//                   <label for="exampleInputEmail1">Select start date</label>
//                   <DatePicker className='inputNC'
//                     selected={startDate}
//                     onChange={(date) => setStartDate(date)}
//                     selectsStart
//                     startDate={startDate}
//                     endDate={endDate}/>
//                 </div>
//                 <div>
//                   <label for="exampleInputEmail1">create hashtag</label><br/>
//                   <input className='inputNC' type="text" placeholder="Create Hashtag"/>
//               </div>
//         </Col>

//         <Col xs={12} sm={12} md={4} lg={4}>
//            <div><label for="exampleInputEmail1">Select end date</label>
//             <DatePicker className='inputNC'
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}/></div>

//               <div className="" style={{display:"block"}}>
//                 <label for="exampleInputEmail1">Set Brand Budget</label><br/>
//                 <input className='inputNC' type="text" placeholder="Rs. 5,000,000"/>
//               </div>
//         </Col>

//         <Col xs={12} sm={12} md={4} lg={4}>
//               <div className="">
//                 <label for="exampleInputEmail1">Enter Sub-Brand</label><br/>
//                 <input className='inputNC' type="text" placeholder="Enter brand"/>
//               </div>

//                 <div className="">
//                   <p style={{marginBottom:'0px'}}>Campaign Type</p>
//                     <button
//                       onClick={() => handleToggle('single')}
//                       style={{
//                         backgroundColor: selected === 'single' ? '#452c63' : 'white',
//                         color: selected === 'single' ? 'white' : 'black',
//                         width: '110px',
//                         borderRadius:'16px'
//                       }}
//                     >
//                       Single
//                     </button>
//                     <button
//                       onClick={() => handleToggle('periodic')}
//                       style={{
//                         backgroundColor: selected === 'periodic' ? '#452c63' : 'white',
//                         color: selected === 'periodic' ? 'white' : 'black',
//                         width: '110px',
//                         borderRadius:'16px'
//                       }}
//                     >
//                       Periodic
//                     </button>
//                     <button
//                     onClick={() => handleToggle('both')}
//                     style={{
//                       backgroundColor: selected === 'both' ? '#452c63' : 'white',
//                       color: selected === 'both' ? 'white' : 'black',
//                       width: '110px',
//                       borderRadius:'16px'
//                     }}
//                   >
//                     Both
//                   </button>
//                   </div>
//         </Col>  
//       </Col>
//       <div className="mt-3 mb-2 d-lg-flex d-sm-block" style={{justifyContent:'space-between'}}>
//           <h5 className="pickedInfluencersNC">Picked Influencers</h5>
//           <a href='/BMRegisteredInfluencers'>
//           <Button style={{backgroundColor: '#452c63'}}>
//                   <AddIcon style={{ fontSize: '15px' }} />
//                   Add Influencer
//           </Button></a>
//        </div>
//            <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
//             {influencers.map((item,index) => {
//               return (
//                 <Col xs={8} sm={8} md={2} lg={2}>
//                   <div className="subContainerNC" style={{overflow:'hidden'}}>
//                     <img className='imageNC' src={`http://127.0.0.1:8000/${item.image}`}/>
//                     <p className='nameNC'>{item.influencer_full_name.slice(0, 15)}...</p>
//                     <p className='userNameNC'>@{item.influencer_username}</p>
//                     <p className='EngagementRateNC'>Engagement Rate</p>
//                     <button style={{backgroundColor:'red', borderRadius:'50%'}} onClick={() => removeInfluencer(index)}>-</button>
//                   </div>
//                 </Col>
//               )})}
//            </div>

//            <div className="d-lg-flex justify-content-between align-items-end d-sm-block ">
//               <div>
//                   <input className='inputNC'
//                     type="checkbox"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}/>
//                   <label>Make Campaign Live</label>
//               </div>
//               <div className="d-block">
//                 <p>Total Cost: 500k</p>
//                 <Button style={{backgroundColor: '#452c63'}}>
//                   Create Campaign
//                 </Button>
//               </div>
//            </div>
//       </Row>
//     </Container>
//   )  
// }
