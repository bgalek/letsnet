import React from 'react';
import { AppBar, Avatar } from 'material-ui';
import { withRouter } from 'react-router-dom';

const AuthenticatedBar = ({ title, logo, children, history }) => {
    return (
        <AppBar title={title}
                showMenuIconButton={false}
                style={{position: 'sticky', top: 0, boxShadow: 'none'}}
                iconElementRight={<Avatar src={logo} size={48}/>}>
            {children}
        </AppBar>
    );
};

export default withRouter(AuthenticatedBar);