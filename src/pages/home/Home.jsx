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
import { AutoAwesomeMotionOutlined, AutoFixHigh } from '@mui/icons-material';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
  <div>
    <div className="home">
      <Sidebar className="nav" style={{}} />
      <div className="homeContainer">
        <Navbar />
        <div className="row">
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
                
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
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
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    CMS
                  </Typography>
                 
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
          </div>
          <div className="col-md-2">
          <Link to='/Extra' style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 300 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150" 
                  image={img2}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
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
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
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
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
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
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
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
        <div style={{padding: '5px', color: "red"}}>
       
       </div>
      </div>
      </Container >
      </div> 
             
         
 </div>
 </div>
 </div>
 </div>

  );
};

export default Home;
