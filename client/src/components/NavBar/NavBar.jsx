import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, NavLink } from 'react-router-dom';
import { Nav, Navbar, Card, DropdownButton, ButtonGroup, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { removeUser } from '../../redux/action-creators/user';
import axios from 'axios';
import { toast } from 'react-toastify';

function NavBar( )
{

	const history = useHistory( );
	const dispatch = useDispatch( );
	
	const cartProductsCount = useSelector( ( state ) => ( state.cart.count > 0 ) ? `${ state.cart.count }` : null );
	const userFirstName = useSelector( ( state ) => ( state.user.id > 0 ) ? state.user.firstName : null );
	const userAccessLevel = useSelector((state) => state.user.accessLevel);

	const API_URL = process.env.REACT_APP_API_URL;

	const handleSumbit = ( event ) => {
		event.preventDefault( );
	
		dispatch( removeUser( ) );

		axios.get( `${ API_URL }/auth/logout`, {
			withCredentials: true
		} )
		.then( ( response ) => {
			setTimeout( ( ) => {
				history.push( '/' );
			}, 1500 );
			
			toast.success( `¡Cerraste sesión correctamente!`, {
				position: 'top-center',
				autoClose: 1500,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
		} )
		.catch( ( error ) => {
			toast.error( `Ocurrió un error inesperado`, {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
		} );
	}

	const changeParty = () => {
		const PartyBar = document.getElementById('partyBar');

		if(PartyBar.className ==  'navbar-party-mode'){
			PartyBar.className='navbar-off-party-mode'
		}
		else {
			PartyBar.className='navbar-party-mode'
		}
	}

	return (
		<>
			<div className="navbar-top-spacing"></div>
			<Navbar collapseOnSelect expand="lg" fixed="top" variant="dark" className="navbar-main">
				<Navbar.Brand>
					<Nav.Link as={Link} to="/">
						<Logo className="navbar-logo" />
					</Nav.Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarCollapse">
					<FontAwesomeIcon icon={faBars} className="navbar-open-menu" />
					<FontAwesomeIcon icon={faTimes} className="navbar-close-menu" />
				</Navbar.Toggle>
				<Navbar.Collapse id="navbarCollapse">
					<Nav className="navbar-nav-left">
						<NavLink as={Link} exact activeClassName="active" to="/products">
							<p className="navbar-text navbar-text-outline">Tienda</p>
						</NavLink>
						<div className="navbar-separator"></div>
						{userAccessLevel > 0 ?
						<NavLink as={Link} exact activeClassName="active" to="/admin">
							<p className="navbar-text navbar-text-outline">Administración</p>
						</NavLink> : null}
						<Button className='navbar-button-rgb' onClick={() => changeParty()}>RGB</Button>
					</Nav>
					<Nav className="navbar-nav-right">
						<NavLink as={Link} exact activeClassName="active" to="/cart" className="navbar-nav-cart">
							<FontAwesomeIcon icon={faShoppingCart} />
							<p className="navbar-text">
								Carrito <span className="cart-count">{cartProductsCount && cartProductsCount}</span>
							</p>
						</NavLink>
						{
							userFirstName ?
							<DropdownButton className="navbar-user-options"
								as={ButtonGroup}
								menualign={{ lg: 'right' }}
								icon={<FontAwesomeIcon icon={faUser} />}
								title={
									<p className="navbar-text">
										{userFirstName}
									</p>}
								id="dropdown-menu-align-responsive-1"
							>
								<Form onSubmit={(event) => handleSumbit (event)}>
									<Card>
										<Card.Header bsPrefix="card-header">
											<Card.Title bsPrefix="card-title">Hola {userFirstName}</Card.Title>
										</Card.Header>

										<Card.Body bsPrefix="card-body">
												<Link to="/login/logued/shops">
													<Card.Text bsPrefix="card-text"> Mis Compras </Card.Text>
												</Link>
												<Link to="/login/logued/data">
													<Card.Text> Mis Datos </Card.Text>
												</Link>
										</Card.Body>
										<Card.Footer>
											<Button type= "submit" className="card-button">
												Salir
											</Button>
										</Card.Footer>
									</Card>
								</Form>
							</DropdownButton> :
							<NavLink as={ Link } className="navbar-nav-user" exact activeClassName="active" to="/login" >
								<FontAwesomeIcon icon={ faUser }/>
								<p className="navbar-text">
									{ userFirstName || 'Ingresar' }
								</p>
							</NavLink>
						}
						<SearchBar/>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<div className="navbar-party-mode" id="partyBar"></div>
		</>
	);
};

export default NavBar;

/*

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import SearchBar from '../SearchBar/SearchBar.jsx';

function NavBar( props ){

	const cartProductsCount = useSelector( ( state ) => ( state.cart.count > 0 ) ? `[${ state.cart.count }]` : null );

	return (
		<Navbar collapseOnSelect expand="lg" fixed="top" variant="dark" className="navbar-main">
			<Navbar.Brand>
				<Logo className="navbar-logo"/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarCollapse">
				<FontAwesomeIcon icon={ faBars } className="navbar-open-menu"/>
				<FontAwesomeIcon icon={ faTimes } className="navbar-close-menu"/>
			</Navbar.Toggle>
			<Navbar.Collapse id="navbarCollapse">
				<Nav className="navbar-nav-left">
					<Nav.Link as={ Link } to="/products">
						<p className="navbar-text navbar-text-outline">Tienda</p>
					</Nav.Link>
					<div className="navbar-separator"></div>
					<Nav.Link as={ Link } to="/admin">
						<p className="navbar-text navbar-text-outline">Administración</p>
					</Nav.Link>
				</Nav>
				<Nav className="navbar-nav-right">
					<Nav.Link as={ Link } to="/cart" className="navbar-nav-cart">
						<FontAwesomeIcon icon={ faShoppingCart }/>
						<p className="navbar-text">
							Carrito { cartProductsCount && cartProductsCount }
						</p>
					</Nav.Link>
					<Nav.Link as={ Link } to="/register" className="navbar-nav-user">
						<FontAwesomeIcon icon={ faUser }/>
						<p className="navbar-text">Ingresar</p>
					</Nav.Link>
					<SearchBar/>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;

*/