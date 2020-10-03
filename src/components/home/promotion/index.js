import React from 'react';
import PromotionAnimation from './Animation'
import Enrol from './Enrol'


const Promotion = () => {
    return (
        <div className='promotion_wrapper' style={{background:'white'}} >
            <div className='container'>
                <PromotionAnimation/>
                <Enrol/>
            </div>
        </div>
    );
};

export default Promotion;