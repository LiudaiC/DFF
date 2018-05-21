import React from 'react'
import { Layout, Table, Divider, Breadcrumb } from 'antd';
import ProductHeader from '../headers/ProductHeader';
const {Header, Content, Footer} = Layout;

const columns = [{
  title: '商品名称',
  dataIndex: 'productName',
  key: 'productName',
  render: text => <span>{text}</span>,
}, {
  title: '属性',
  dataIndex: 'attrVals',
  key: 'attrVals',
}, {
  title: '价格',
  dataIndex: 'price',
  key: 'price',
  render: text => <span>￥{text.toFixed(2)}</span>
}, {
  title: '描述',
  dataIndex: 'description',
  key: 'description',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <Divider type="vertical" />
      <a>删除</a>
      <Divider type="vertical" />
      <a>编辑</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  productName: '粉贝贝圣女果',
  attrVals:'3斤',
  price: 25.00,
  description: '25元/3斤',
}, {
  key: '2',
  productName: '粉贝贝圣女果',
  attrVals:'5斤',
  price: 35.00,
  description: '35元/5斤',
}, {
  key: '3',
  productName: '山东羊角蜜',
  attrVals:'4斤',
  price: 43.00,
  description: '43元/4斤',
}];


class ProductTable extends React.Component {
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
          <ProductHeader/>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <Table columns={columns} dataSource={data} />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            良品仓大爱水果
        </Footer>
      </Layout>
    );
  }
}

export default ProductTable;