import React from 'react';
import { Modal, Button, Upload, Icon, message, Input,Select, DatePicker } from 'antd';
import '../index.css'
import moment from 'moment';
import request from '../utils/request'
import qs from 'qs'
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

function randomInt() {
  return Math.ceil(Math.random()*10000)
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      imageUrl: props.imageUrl
    };
  }
  
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      let that = this
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }, function () {
        that.props.dataChange({imageUrl:info.file.response.fileName})
      }));
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/df/file/upload/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="" style={{width:280,height:280}}/> : uploadButton}
      </Upload>
    );
  }
}
const attrs = [
  {
    key: '1',
    attr: '重量',
    values: [{
      key:'1-11',
      value:'1斤'
    },{
      key:'1-12',
      value:'2斤'
    },{
      key:'1-13',
      value:'3斤'
    },{
      key:'1-14',
      value:'4斤'
    },{
      key:'1-15',
      value:'5斤'
    },{
      key:'1-16',
      value:'6斤'
    },{
      key:'1-17',
      value:'7斤'
    },{
      key:'1-18',
      value:'8斤'
    },{
      key:'1-19',
      value:'9斤'
    },{
      key:'1-20',
      value:'10斤'
    }]
  },{
    key: '2',
    attr: '单果',
    values:[{
      key:'2-21',
      value:'大果'
    },{
      key:'2-22',
      value:'中果'
    },{
      key:'2-23',
      value:'小果'
    }]
  },{
    key: '3',
    attr: '个数',
    values: [{
      key:'3-31',
      value:'1个'
    },{
      key:'3-32',
      value:'2个'
    },{
      key:'3-33',
      value:'3个'
    },{
      key:'3-34',
      value:'4个'
    },{
      key:'3-35',
      value:'5个'
    },{
      key:'3-36',
      value:'6个'
    },{
      key:'3-37',
      value:'7个'
    },{
      key:'3-38',
      value:'8个'
    },{
      key:'3-39',
      value:'9个'
    },{
      key:'3-40',
      value:'10个'
    },{
      key:'3-45',
      value:'15个'
    }]
  }
]


class ProAttrList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      priceList: props.priceList,
      attrList: []
    }
    this.addAttrs = this.addAttrs.bind(this)
    this.selectChange =this.selectChange.bind(this)
    this.inputChange =this.inputChange.bind(this)
    this.dealPriceList = this.dealPriceList.bind(this)
  }

  dealPriceList(e, oper) {
    const priceList = this.state.priceList
    let newItem = true;
    for (var i = 0, l = priceList.length; i < l; i++) {
      if (priceList[i].key === e.key) {
        newItem = false;
        if (oper === 'minus') {
          priceList.splice(i, 1)
        }
        if (e.val && priceList[i].vals.indexOf(e.val) < 0) {
          if (e.val.indexOf('.') < 0) {
            priceList[i].vals.forEach((o, i) => {
              if (o.indexOf(e.val) >= 0) {
                priceList[i].vals.splice(i, 1)
              }
            })  
          } else {
            priceList[i].vals = priceList[i].vals || []
            priceList[i].vals.push(e.val);
            priceList[i].vals.sort((a, b) => a-b)
          }
        }
        if (e.salePrice){
          priceList[i].salePrice = e.salePrice
        }
        break;
      }
    }
    if (oper != 'minus' && newItem) {
      let p = {key: e.key}
      if (e.salePrice) p.salePrice = e.salePrice
      if (e.val) p.vals = [e.val]
      priceList.push(p)
    }
    let that = this;
    this.props.dataChange({priceList: priceList})
  }

  selectChange(e) {
    console.log(`${e}`)
    const kv = `${e}`
    console.log(kv)
    const atts = kv.split(':')
    this.dealPriceList({key: atts[0], val: atts[1]})
  }

  inputChange(e) {
    const {name, value} = e.target
    this.dealPriceList({key: name, salePrice: value})
  }

  addAttrs(e) {
    let list = this.state.attrList;
    if(e){
      const {className} = e.target
      console.log(className)
      if (className.indexOf('minus') >= 0) {
        for (let k = 0; k < list.length; k++) {
          console.log(list[k].key, e.target.getAttribute('data-key'))
          if (list[k].key === e.target.getAttribute('data-key')){
            this.dealPriceList({key: list[k].key}, 'minus')
            list.splice(k, 1);
            this.setState({attrList: list});
            return;
          }
        }
      }
    }
    var that = this;
    let prodAttrs = []
    let attKey = randomInt();
    attrs.forEach(function(e, i) {
      let vals= []
      vals.push(<Option value={attKey + ':' +e.key} key={e.key}>{e.attr}</Option>)
      e.values.forEach(function(o, j) {
        vals.push(<Option value={attKey + ':' +o.key} key={o.key}>{o.value}</Option>)
      })
      prodAttrs.push(<Select defaultValue={attKey + ':' +e.key} key={e.key} style={{width:120, marginRight: 8}} onChange={that.selectChange}>{vals}</Select>)
    })
    list.push(<div key={attKey}>{prodAttrs}<Icon onClick={that.addAttrs} data-key={attKey} type={list.length>0?'minus-circle-o':'plus-circle-o'}/>
      <div>价格:<Input className="df-input" onChange={that.inputChange} name={attKey} placeholder="请输入价格"/></div>
    </div>)
    this.setState({attrList: list})
  }

  componentWillMount() {
    this.addAttrs()
  }

  render() {
    let attrList = this.state.attrList
    return (
    <div className="df-product-fields">
      {attrList}
    </div>
    )
  }
}

class ProductHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      visible: props.visible,
      productName: '',
      description: '',
      priceList: [],
      imageUrl: ''
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.dateChange = this.dateChange.bind(this)
    this.dataChange = this.dataChange.bind(this)
  }

  dataChange(data) {
    this.setState(data)
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  dateChange(e) {
    console.log(e)
  }

  inputChange(e) {
    const {name, value} = e.target
    var data = {}
    data[name] = value
    this.setStage(data);
  }

  hideModal = () => {
    let sta = this.state;
    let that = this
    request('/df/products', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(sta)
    }).then(res => {
      console.log('success', res)
      that.setState({
        visible: false,
        priceList: [],
        productName: '',
        exporess: '',
        remark: '',
        imageUrl: ''
      });
    }).err(res => {
      console.log('err', res)
    })
  }

  render() {
    let productName = this.state.productName;
    let description = this.state.description;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>添加商品</Button>
        <RangePicker locale={{'lang': {'rangePlaceholder': [ "开始日期", "结束日期"]}}}
      ranges={{ '今天': [moment(), moment()], '本月': [moment(), moment().endOf('month')] }}
      onChange={this.dateChange}
    />
        <Modal
          title="添加商品"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <Avatar dataChange={this.dataChange} image={this.state.imageUrl}/>
          <div className="df-product-fields">
            <div>产品名称:<Input placeholder="输入产品名称" value={this.state.productName} onChange={this.inputChange} name='productName' className="df-input"/></div>
            <div>快递:<Input placeholder="输入快递商家" value={this.state.express} onChange={this.inputChange} name='express' className="df-input"/></div>
            <div>备注:<Input placeholder="输入产品备注" value={this.state.remark} onChange={this.inputChange} name='remark' className="df-input"/></div>
          </div>
          <ProAttrList dataChange={this.dataChange} priceList={this.state.priceList}/>
        </Modal>
        <br />
      </div>
    );
  }
}

export default ProductHeader;