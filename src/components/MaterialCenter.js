import React from 'react'
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import request from '../utils/request'
const {Header, Content, Footer} = Layout;

class MaterialList extends React.Component {

  constructor() {
    super()
    this.state = {
      page: 1,
      listItem: []
    }
  }

  edit (collapsed){
  

  }

  componentWillMount() {

  }


  render() {
    return(
      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
      </Row>)
  }

}

class MaterialTable extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
    <Layout>
        <Header style={{ background: '#fff', padding: 0 }} >
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <MaterialList/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            良品仓大爱水果
        </Footer>
      </Layout>
    );
  }
}

export default MaterialTable;