import * as actionTypes from '../action-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

/* =================================================================================
* 		[ Agregar una categoría ]
* ================================================================================= */

export function addCategory( name )
{
	return function( dispatch ) {
		axios.post( `${ API_URL }/products/category`, {
			name
		}, { withCredentials: true } )
		.then( ( response ) => {
			dispatch( {
				type: actionTypes.ADD_CATEGORY,
				payload: response.data,
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.ADD_CATEGORY,
				payload: null,
				error: error
			} );
		} );
	};
}

/* =================================================================================
* 		[ Modificar el nombre de una categoría ]
* ================================================================================= */

export function modifyCategory( id, name )
{
	return function( dispatch ) {
		axios.put( `${ API_URL }/products/category/${ id }`, {
			name
		}, { withCredentials: true } )
		.then( ( response ) => {
			dispatch( {
				type: actionTypes.MODIFY_CATEGORY,
				payload: response.data,
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.MODIFY_CATEGORY,
				payload: null,
				error: error
			} );
		} );
	};
}

/* =================================================================================
* 		[ Remover una categoría ]
* ================================================================================= */

export function deleteCategory( id )
{
	return function( dispatch ) {
		axios.delete( `${ API_URL }/products/category/${ id }`, { withCredentials: true } )
		.then( ( response ) => {
			dispatch( {
				type: actionTypes.DELETE_CATEGORY,
				payload: { id },
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.DELETE_CATEGORY,
				payload: null,
				error: error
			} );
		} );
	};
}

/* =================================================================================
* 		[ Obtener todas las categorías ]
* ================================================================================= */

export function loadCategories( )
{
	return function( dispatch ) {
		axios.get( `${ API_URL }/products/category` ).then( ( response ) => {
			dispatch( {
				type: actionTypes.LOAD_CATEGORIES,
				payload: response.data,
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.LOAD_CATEGORIES,
				payload: null,
				error: error
			} );
		} );
	};
}