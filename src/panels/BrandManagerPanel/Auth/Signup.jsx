import { Checkbox } from '@material-ui/core';
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
return (

  <Container fluid className="h-100">
  <Row className="h-100"> 
  <Col
              xs={12}
              sm={12}
              md={6}
              lg={6}
              className="d-flex align-items-center justify-content-center p-0 vh-100"
          >
          <img style={{width: '100%',height:'100%', objectFit:'cover'}}src={authAbstract}/>
        </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
          <div className='mt-5 text-left justify-content-center align-center d-lg-mt-5'><h4 className='text-center'>Brand Manager's Signup</h4>
            <form className="needs-validation" noValidate>
              <Col md="4" className="mb-3">
                <label htmlFor="validationTooltip01" style={{textAlign:'left'}}>Email</label>
                {/* <input type="text" className="form-control" id="validationTooltip01" placeholder="Email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}/> */}
                <input type="email" className="form-control" id="validationTooltip01" placeholder="Email" name="email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
                <div className="valid-tooltip">
                  Looks good!
                </div>
              </Col>
              <Col md="4" className="mb-3">
                <label for="inputPassword5">Password</label>
                <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
                {/* <small id="passwordHelpBlock" class="form-text text-muted">
                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </small> */}
              </Col>
              <Col md="4" className="mb-3">
                <label for="inputPassword5">Confirm Password</label>
                <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
                {/* <small id="passwordHelpBlock" class="form-text text-muted">
                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </small> */}
              </Col>


              <Col md="4" className="mb-3">
                <>
                    <label for="inputPassword5">Upload Profile Picture</label>
                    <div className="input-group mb-3">
                      <div class="custom-file">
                          <input type="file" class="custom-file-input" id="inputGroupFile02"/>
                      </div>
                    </div>
                </>
            </Col>
            <Col md="4" className="mb-3 text-align-center">
              <label for="login">Already have an account?
                 <a href="/BMLogin" >
                    <span style={{color: '#452c63', textDecoration:'none' }}><b>Login</b>
                    </span>
                 </a>
                </label>
            </Col>
              <div className='justify-content-center align-items-center text-center'>
                <a href='/Home'><button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'200px'}}>Register</button>
                </a></div>
          </form>
        </div>
          </Col>
      </Row>
     
  </Container>
  

)
}

export default Signup;