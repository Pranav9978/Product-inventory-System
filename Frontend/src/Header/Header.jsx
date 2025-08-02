import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
    <div className='head'>
      
      <header className="header">
        <Navbar expand="lg" className="navabar-data">
          <Container>

            <Navbar.Brand href="/" className="brand-text" style={{color:'white',fontSize:'2.2rem',alignItems:'center'}}>
              <ShoppingCart size={55} style={{ marginRight: "15px" ,marginTop:'-0.5rem'}} />

                 StockMaster
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto nav-links">
                <Nav.Link href="/">Dashboard</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/orders">Order</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
