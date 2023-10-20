import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import IMG from '../../img/userdashboard.jpg';
import img1 from '../../img/cms2.jpg';
import img2 from '../../img/footer.png';
import img3 from '../../img/whatsnew.png';
import img4 from '../../img/banner1.png';
import img5 from '../../img/link2.png';
import img6 from '../../img/order.png';
import img7 from '../../img/dash1.jpg';
import img8 from '../../img/dashboard3.jpg';


import { AutoAwesomeMotionOutlined, AutoFixHigh } from '@mui/icons-material';
import { Container } from 'react-bootstrap';

const Home = () => {
  const storedUserString = localStorage.getItem("user");
  const user = JSON.parse(storedUserString);
  return (
    <div>
      <div className="home">
        <Sidebar className="nav" style={{}} />
        <div className="homeContainer">
          <Navbar />
          <div class="main-body">
            <div className="row">
              <div className="col-md-6">
                {/* <Link to='/Cms' style={{ textDecoration: "none" }}> */}
                <Card sx={{ maxWidth: 600, height: 250, marginBottom: '40px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height={AutoFixHigh}
                      image={img7}
                      alt="green iguana"
                    />
                    <CardContent className="dashtop-left" >
                      <Typography gutterBottom variant="h6" component="div" style={{ textAlign: 'left', marginBottom:'2px', fontFamily: ' Garamond, serif', color: 'white', fontSize: '36px', fontWeight: 600 }}>
                        Good Morning
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div" style={{ textAlign: 'left', marginLeft:'6px', fontFamily: ' Garamond, serif', color: 'white', fontSize: '26px', fontWeight: 600 }}>
                      {user.r_name} !
                      </Typography>
                      
                    </CardContent>
                  </CardActionArea>
                </Card>
                {/* </Link> */}
              </div>
              <div className="col-md-6">
                {/* <Link to='/Cms' style={{ textDecoration: "none" }}> */}
                <Card sx={{ maxWidth: 600, height: 250, marginBottom: '40px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height={AutoFixHigh}
                      image={img8}
                      alt="green iguana"
                    />
                    <CardContent className="dashtop-left" >
                      <Typography gutterBottom variant="h6" component="div" style={{ textAlign: 'center', fontFamily: ' Garamond, serif', color: "white", fontSize: '28px', marginTop: '60px', marginLeft: '60px', fontWeight: 700 }}>
                        Build The Site Of Your Dreams
                      </Typography>
                      <div class="pr-button-container">
                       
                          <Link to='/cms/menu'>
                          <div class="pr-button-text-icon-wrapper"><span>Getting Started Today</span></div>
                          </Link> 
                        
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
                {/* </Link> */}
              </div>
              <div className="col-md-2">
                <Link to='/users' style={{ textDecoration: "none" }}>
                  <Card sx={{ maxWidth: 160 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height={AutoFixHigh}

                        image={IMG}
                      // alt="green iguana"
                      />

                      <CardContent className="custom-content1">
                        <Typography gutterBottom variant="h6" component="div" className="custom-typo" >
                          User
                        </Typography>

                      </CardContent>

                    </CardActionArea>

                  </Card>
                </Link>
              </div>
              <div className="col-md-2">
                <Link to='/Cms' style={{ textDecoration: "none" }}>
                  <Card sx={{ maxWidth: 150 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height={AutoFixHigh}
                        image={img1}
                        alt="green iguana"
                      />
                      <CardContent className="custom-content2">
                        <Typography gutterBottom variant="h6" component="div" className="custom-typo">
                          CMS
                        </Typography>

                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div>
              <div className="col-md-2">
                <Link to='/footer' style={{ textDecoration: "none" }}>
                  <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="150"
                        image={img2}
                        alt="green iguana"
                      />
                      <CardContent className="custom-content3">
                        <Typography gutterBottom variant="h6" component="div" className="custom-typo">
                          Footer
                        </Typography>

                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div>
              <div className="col-md-2">
                <Link to='/WhatsNew' style={{ textDecoration: "none" }}>
                  <Card sx={{ maxWidth: 250 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="150"
                        image={img3}
                        alt="green iguana"
                      />
                      <CardContent className="custom-content4">
                        <Typography gutterBottom variant="h6" component="div" className="custom-typo">
                          Whats New
                        </Typography>
                        {/* <Typography variant="body2" color="text.secondary">
                    \ are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                  </Typography> */}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div>
              <div className="col-md-2">
                <Link to='/Banner' style={{ textDecoration: "none" }}>
                  <Card sx={{ maxWidth: 150 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="150"
                        image={img4}
                        alt="green iguana"
                      />
                      <CardContent className="custom-content5">
                        <Typography gutterBottom variant="h5" component="div" className="custom-typo">
                          Banner
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div>
              <div className="col-md-2">
                <Link to='/Banner' style={{ textDecoration: "none" }}>
                  <Card sx={{ maxWidth: 290 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="150"
                        width="100"
                        image={img5}
                        alt="green iguana"
                      />
                      <CardContent className="custom-content6">
                        <Typography gutterBottom variant="h6" component="div" className="custom-typo">
                          Related Links
                        </Typography>

                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div>


              <div className='row'>
                <Container>
                  <div>
                    <div style={{ padding: '5px', color: "red" }}>

                    </div>
                  </div>
                </Container >
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;
