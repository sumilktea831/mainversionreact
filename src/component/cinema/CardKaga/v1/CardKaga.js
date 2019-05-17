import React from 'react'
import CardKagaBox from './CardKagaBox'
import CardKagaCollection from './CardKagaCollection'
// Card說明書

// title 下方大標文字
// subtitle 下方小標文字
// img 底圖

// 引入元件時如果有要蒐藏旗,請props一個collectionIcon這個屬性過來
// collection 請丟資料的是否蒐藏 是=true / 不是=false
// collectionClick 請接到按下去要觸發的function

const CardKaga = props => {
    console.log(props)
    return (
        <div className="position-relative col-3">
            <CardKagaBox
                title={props.title}
                subtitle={props.subtitle}
                img={props.img}
            />

            <CardKagaCollection
                collectionIcon={props.collectionIcon}
                collectionClick={props.collectionClick}
                collection={props.collection}
            />
        </div>
    )
}
export default CardKaga
