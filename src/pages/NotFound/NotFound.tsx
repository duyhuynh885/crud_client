import React from 'react'
import PropTypes from 'prop-types'
import { Result, Button } from 'antd';
/**
 * NotFound
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By DuyHV9
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       DuyHV9           Create
 */
const NotFound: React.FC = () => {
    return (
        <div >
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button href="/" type="primary">Back Home</Button>}
            />
        </div>

    )
}

NotFound.propTypes = {

}

export default NotFound

