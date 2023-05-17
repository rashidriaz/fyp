// import axios from "axios"
// import React,{useEffect, useState} from 'react';
// import { Button } from 'react-bootstrap';
// import { ArrowBack, Search } from '@material-ui/icons';
// import AddIcon from '@material-ui/icons/Add';
// import { Container, Row, Col } from 'react-grid-system';
// import { Home, People } from '@mui/icons-material';
// import '../../../Style/BrandManagerPanel/brandManagerDashboard/campaigns.css'

// const Campaigns = () => {
//  const [posts, setPosts] = useState([]);
//  const [campaigns, setCampaigns] = useState([]);
//  const [subreddits, setSubreddits] = useState([]);
//  const [likes, setLikes] = useState([]);
//  useEffect(() => {
//   axios
//     .get('http://127.0.0.1:8000/activecampaigns/')
//     .then((response) => {
//       setCampaigns(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         'https://oauth.reddit.com/r/apple/new.json?limit=100&fields=title',
//         {
//           headers: {
//             Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MjEzNDUyLCJqdGkiOiIyNDQ5NTMxNzM4MjUzLTZXR2xSOG1fcnRvUURGcjdRWThuQURtOHZyVjNtdyIsImNpZCI6Ijc1OFlUT01OZ0U4UzA4MW5jSEJmNUEiLCJsaWQiOiJ0Ml92OWFyeTlvdCIsImFpZCI6InQyX3Y5YXJ5OW90IiwibGNhIjoxNjcyMjIzODM5MDAwLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyJ9.ax4qqUajbzGdFohTweUNn-lwRRVshXDe7vNnZWLbi8aToBmPXGt4DKV5qFIclUIQsD3qr5bNl3yx74IUKszPtRO9vMNsQZmIEeKLd4xH4i_GcFqPgHEtpqjoe-fgyxDdBgTENZDPUqfeiTC-tUva7ecV2qxooKTb8t9lsHTUYbQiXz5oFL3G9oLxiBzaj9_vUsOA9tNvzJEaRuoRX9w1v7pn7K989TLOehDA0azmNsWhlmpeKornkwItY3LloIdNZEWGJ15aSUa_lZ9mXmvVrWtJrupjXgI70KD4dVW0LKt7M7-zqSaXnSBeuyxd4NOAJMRV0pD6E-irYZDHPncVVw',
//             'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
//           }
//         }
//       );

//       const jsonData = response.data.data.children;
//       const postsArray = jsonData.map((post) => ({
//         likes: post.data.ups,
//         subreddit: post.data.subreddit
//       }));
//       setLikes(postsArray);
//       //null;

//       // Map campaigns against likes where campaign name matches subreddit name
//       const campaignLikes = campaigns.map(campaign => ({
//         campaignName: campaign.hashtag,
//         likes: postsArray.filter(post => post.subreddit === campaign.hashtag)
//                         .reduce((acc, post) => acc + post.likes, 0)
//       }));
//       setPosts(campaignLikes);

//       // Loop through each object in campaignLikes and log its properties separately
//       campaignLikes.forEach(campaignLike => {
//         console.log(`Campaign "${campaignLike.campaignName}" has ${campaignLike.likes} likes.`);
//       });

//     } catch (error) {
//       console.error("error is"+ error);
//     }
//   };
//   fetchData();
// }, []);

//   return (
//       <Row style={{border: '0.1px solid rgb(235, 232, 232)'}}>
//         <Col xs={12} sm={12} md={12} lg={12}>
//           <div className='campaignsHeadersC d-lg-flex mt-2'>
//             <h5 className='d-sm-text-center'>Active Campaigns</h5>
//                <Button style={{backgroundColor:'#452c63', height:'25px', marginLeft:'5px'}}>
//                     <div style={{marginTop:"-6px"}}>
//                       <a href="/BMNewCampaign" className="mx-3" style={{display: 'block'}}>
//                         <p>Create<AddIcon className='AddIcon' style={{fontSize:"15px"}}/></p>
//                       </a>
//                     </div>
//                  </Button>
//                 <a href="/BMCampaigns" className="mx-3 text-dark"><p><u style={{fontSize:'13px'}}>View all</u></p></a>
//           </div>
//         </Col>


//     <div className="mainContainerC" style={{display: 'flex', flexWrap: "nowrap"}}> 
//     {posts.slice(0,20).map(item => {
//         return (
//             <div className="subContainerC" >
//               <div>
//               <img className="imageC" src={item.image ? item.image : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg'} />
//               </div>

//               <Row className='mt-2'>
//                   <Col xs={12} sm={12} md={6} lg={7}>
//                       <h3 className='nameC'>{item.campaign_name.slice(0,18)}...</h3>
//                       <p className='influencersC'><People style={{height:"15px"}}/>{item.likes}</p>                      
//                   </Col>
//                   <Col xs={12} sm={12} md={6} lg={5} key={item.id}>
//                       <p className="hashtagC">#{item.hashtag}</p>
//                       <p className="hashtagC">#{item.likes}</p>
//                       <div><p className='typeC' style={{backgroundColor: item.campaign_type === 'periodic' ? '#B47EE5' : 'green', }}>
//                         {item.campaign_type ? item.campaign_type : 'others'}</p>
//                       </div>
//                   </Col>
//                 </Row>
//                 <p className='dateC'>{item.created}</p>
//             </div>
//         )})}

//     </div>
//     </Row>
//   );
// }

// export default Campaigns;