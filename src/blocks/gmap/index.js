/**
 * BLOCK: Gmap
 *
 * Display a Google map
 */

import './style.scss'
import './editor.scss'

import Inspector from './inspect'
import Gmap from './gmap'

const {
  registerBlockType,
} = wp.blocks

const { __ } = wp.i18n

export default registerBlockType(
  'gutenblocks/gmap',
  {
    title: __( 'Google Map' ),
    description: __( 'Display a customizable Google map' ),
    category: 'common',
    icon: 'location-alt',
    keywords: [
      __( 'map' ),
    ],
    attributes: {
      address: {
        type: 'string',
      },
      latitude: {
        type: 'float',
      },
			longitude: {
        type: 'float',
      },
			zoom: {
        type: 'integer',
      },
			height: {
				type: 'integer',
			},
			style: {
				type: 'string',
				default: 'default'
			},
    },
    edit: props => {

			// Default values
			! props.attributes.zoom && props.setAttributes( { zoom: 15 } )
			! props.attributes.height && props.setAttributes( { height: 400 } )
			! props.attributes.latitude && props.setAttributes( { latitude: 48.8566 } )
			! props.attributes.longitude && props.setAttributes( { longitude: 2.3522 } )

			const onChangeAddress = geocodedObj => {

				console.log(geocodedObj)
        props.setAttributes( { latitude: geocodedObj.geometry.location.lat() } )
        props.setAttributes( { longitude: geocodedObj.geometry.location.lng() } )
				props.setAttributes( { address: geocodedObj.formatted_address } )
      }

			const onChangeZoom = value => {
        props.setAttributes( { zoom: value } )
      }

			const onChangeHeight = value => {
        props.setAttributes( { height: value } )
      }

			const onChangeStyle = value => {
				props.setAttributes( { style: value } )
			}

      return [
        !! props.focus && (
          <Inspector { ...{ onChangeAddress, onChangeZoom, onChangeHeight, onChangeStyle, ...props } } />
        )
				,
				<div className="wp-block-gutenblocks-gmap">
	        { ! props.attributes.address && props.focus && typeof(gutenblocksGmap) == 'undefined' && (
	          <p class="gutenblocks-block-message">{ __( 'Type your address on the inspector' ) }</p>
	        ) }
					{ typeof gutenblocksGmap === "undefined" ? (
						<Gmap { ...props } />
					) : (
						<p class="gutenblocks-block-message">{ __( '⚠️ You need to provide an API key in Blocks > Settings > Google Map' ) }</p>
					) }
				</div>
      ]
  	},
    save: props => {
      return null
    },
  },
)
