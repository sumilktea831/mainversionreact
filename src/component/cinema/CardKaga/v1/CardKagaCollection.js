import React from 'react'
const CardKagaCollection = props => {
    console.log(props)
    return (
        <>
            {props.collectionIcon ? (
                props.collection === 'true' ? (
                    <a
                        href="##"
                        onClick={props.collectionClick}
                        className="position-absolute"
                        style={{ top: '35px', right: '30px', fontSize: '25px' }}
                    >
                        <i className="fas fa-bookmark" />
                    </a>
                ) : (
                    <a
                        href="##"
                        onClick={props.collectionClick}
                        className="position-absolute"
                        style={{ top: '35px', right: '30px', fontSize: '25px' }}
                    >
                        <i className="far fa-bookmark" />
                    </a>
                )
            ) : (
                ''
            )}
        </>
    )
}
export default CardKagaCollection
