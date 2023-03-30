import React, { useState } from 'react'

function NWSAlerts ({ alerts }) {
    const [alertDetails, setAlertDetails] = useState();

    return (
        <div>

            <div>
                <div onClick={() => setAlertDetails(!alertDetails)}>
                    <span>{alerts.severity} {alerts.event}</span>
                    {alerts.description && <span>{(!alertDetails) ? '+' : '--'}</span>}
                </div>

                {alertDetails &&
                    <div>
                        <div>{alerts.description}</div>
                        <div>{alerts.instruction}</div>
                    </div>
                }
            </div>
        
        </div>
    )
};

export default NWSAlerts