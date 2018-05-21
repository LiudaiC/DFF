import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import OrderContent from '../components/OrderContent';
import AgentContent from '../components/AgentContent';
import ProductContent from '../components/ProductContent';
import MaterialCenter from '../components/MaterialCenter';
const { Sider } = Layout;

class MainLayout extends React.Component {
  state = {
    collapsed: false,
    menuKey: 1
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  changeMenu = (e) => {
    this.setState({menuKey: +e.key})
  }
  render() {
    let menuKey = this.state.menuKey
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={[menuKey+'']} mode="inline">
            <Menu.Item key="1" onClick={this.changeMenu}>
              <Icon type="shop" />
              <span>订单列表</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.changeMenu}>
              <Icon type="team" />
              <span>代理列表</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={this.changeMenu}>
              <Icon type="desktop" />
              <span>商品列表</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={this.changeMenu}>
              <Icon type="tags"/>
              <span>素材中心</span>
            </Menu.Item>
          </Menu>
        </Sider>
        {menuKey === 1 && <OrderContent/>}
        {menuKey === 2 && <AgentContent/>}
        {menuKey === 3 && <ProductContent/>}
        {menuKey === 4 && <MaterialCenter/>}
      </Layout>
    );
  }
}

export default MainLayout;