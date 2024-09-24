import React from 'react';
import './Statistic.css';

function Statistic({title, value, icon}) {
    return (
        <div className="statistic">
            <div className="statistic__icon">
                <img className="statistic__icon-img" src={icon}/>
            </div>
            <div className="statistic__copy">
                <h3 className="statistic__title">{ title }</h3>
                <p className="statistic__value">{ value }</p>
            </div>
        </div>
    );
}

export default Statistic;

