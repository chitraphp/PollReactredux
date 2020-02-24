import _ from "lodash";
import React, { Component } from "react";
import {Container,Icon,Image,Menu,Sidebar,Responsive} from "semantic-ui-react";

    const NavBarMobile = ({children,leftItems,onPusherClick,onToggle,rightItems,visible}) => (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                items={leftItems}
                vertical
                visible={visible}
            />
            <Sidebar.Pusher
                    dimmed={visible}
                    onClick={onPusherClick}
                    style={{ minHeight: "100vh" }}
                >
            <Menu fixed="top" inverted>
                <Menu.Item onClick={onToggle}>
                    <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Menu position="right">
                    {_.map(rightItems, item => <Menu.Item {...item} />)}
                </Menu.Menu>
            </Menu>
                {children}
            </Sidebar.Pusher>
    </Sidebar.Pushable>
    );

const NavBarDesktop = ({ leftItems, rightItems }) => (
    <Menu fixed="top" inverted>
            {_.map(leftItems, item => <Menu.Item {...item} />)}
        <Menu.Menu position="right">
            {_.map(rightItems, item => <Menu.Item {...item} />)}
        </Menu.Menu>
    </Menu>
);

const NavBarChildren = ({ children }) => (
    <Container style={{ marginTop: "5em" }}>{children}</Container>
);

class NavBar extends Component {
    state = {
        visible: false
    };

    handlePusher = () => {
        const { visible } = this.state;

        if (visible) this.setState({ visible: false });
    };

    handleToggle = () => this.setState({ visible: !this.state.visible });

    render() {
        const { children, leftItems, rightItems } = this.props;
        const { visible } = this.state;
        return (
        <div>
            <Responsive {...Responsive.onlyMobile}>
            <NavBarMobile
                leftItems={leftItems}
                onPusherClick={this.handlePusher}
                onToggle={this.handleToggle}
                rightItems={rightItems}
                visible={visible}
            >
                <NavBarChildren>{children}</NavBarChildren>
            </NavBarMobile>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
            <NavBarChildren>{children}</NavBarChildren>
            </Responsive>
        </div>
        );
    }
}

    const leftItems = [
    { as: "a", content: "Home", key: "home" },
    { as: "a", content: "Posts", key: "posts" }
    ];
    const rightItems = [
    { as: "a", content: "Login", key: "login" },
    { as: "a", content: "Register", key: "register" }
    ];

    const NavigationBar = () => (
    <NavBar leftItems={leftItems} rightItems={rightItems}>
        
    </NavBar>
    );

export default NavigationBar