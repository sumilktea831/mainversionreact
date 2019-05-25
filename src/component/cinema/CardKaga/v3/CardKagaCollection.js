import React from 'react'

class CardKagaCollection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collection: '',
        }
    }

    componentDidMount() {
        this.setState({ collection: this.props.collection })
    }

    getIdToBoss = () => {
        const upDateID = this.props.id
        const upDateCollection =
            this.state.collection === 'true' ? 'false' : 'true'
        this.setState({ collection: upDateCollection })
        this.props.collectionClick(upDateID, upDateCollection)
    }

    render() {
        return (
            <>
                {this.state.collection === 'true' ? (
                    <a
                        onClick={this.getIdToBoss}
                        className="position-absolute"
                        //下方style轉放scss
                        style={{
                            top: '35px',
                            right: '20px',
                            fontSize: '25px',
                            cursor: 'pointer',
                            color: '#ffa510',
                        }}
                    >
                        <i className="fas fa-bookmark" />
                    </a>
                ) : (
                    <a
                        onClick={this.getIdToBoss}
                        className="position-absolute"
                        //下方style轉放scss
                        style={{
                            top: '35px',
                            right: '20px',
                            fontSize: '25px',
                            cursor: 'pointer',
                            color: '#ffa510',
                        }}
                    >
                        <i className="far fa-bookmark" />
                    </a>
                )}
            </>
        )
    }
}

export default CardKagaCollection
