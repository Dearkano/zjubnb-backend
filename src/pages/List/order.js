import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Divider,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select
} from 'antd';
import DescriptionList from '@/components/DescriptionList';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './BasicList.less';

import serviceMap from '@/resources/services';
import statusMap from '@/resources/status';
const { Description } = DescriptionList;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ list, loading, user }) => ({
  user,
  list,
  loading: loading.models.list
}))
@Form.create()
class BasicList extends PureComponent {
  state = {
    visible: false,
    done: false,
    vis: false,
    current: null,
    current1: null,
    comment: ''
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: user ? user.currentUser.company_id : ''
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item
    });
  };

  handleDone = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleDone1 = () => {
    const { dispatch } = this.props;
    const { current1, comment } = this.state;
    dispatch({
      type: 'list/update',
      payload: { ...current1, comment }
    });
    this.setState({
      vis: false
    });
  };

  handleCancel1 = () => {
    this.setState({
      vis: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue }
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id }
    });
  };

  showUpdateModal = item => {
    this.setState({
      vis: true,
      current1: item
    });
  };

  finish = item=>{
    const { dispatch, user } = this.props;
    dispatch({
      type: 'list/finish',
      payload: item
    }).then(() => {
      dispatch({
        type: 'list/fetch',
        payload: user.currentUser.company_id
      });
    });
  }

  render() {
    const {
      list: { list },
      loading
    } = this.props;
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { visible, done, current = {}, vis } = this.state;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id)
        });
      }
    };
    const mapStatus = id => statusMap.find(item => item.id === id).name;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
          onOk: this.handleDone,
          onCancel: this.handleCancel
        };

    const modalFooter1 = done
      ? { footer: null, onCancel: this.handleDone1 }
      : {
          onOk: this.handleDone1,
          onCancel: this.handleCancel1
        };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="pending">Pending</RadioButton>
          <RadioButton value="progressing">Progessing</RadioButton>
          <RadioButton value="cancelled">Cancelled</RadioButton>
          <RadioButton value="finished">Finished</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="Please input"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50
    };

    const ListContent = ({ data }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Progess</span>
          <p><a>{mapStatus(data.order.status)}</a></p>
        </div>
        <div className={styles.listContentItem}>
          <span>Start Time</span>
          <p>{moment(data.order.createDate).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress
            percent={parseInt(50 * data.order.status)}
            status={data.order.status}
            strokeWidth={6}
            style={{ width: 180 }}
          />
        </div>
      </div>
    );
    const accept = item => {
      const { dispatch, user } = this.props;
      dispatch({
        type: 'list/accept',
        payload: item
      }).then(() => {
        dispatch({
          type: 'list/fetch',
          payload: user.currentUser.company_id
        });
      });
    };
    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="edit" onClick={() => accept(props.current)}>
              Accept
            </Menu.Item>
            <Menu.Item key="delete">Decline</Menu.Item>
          </Menu>
        }
      >
        <a>
          Operate <Icon type="down" />
        </a>
      </Dropdown>
    );

    const getModalContent = () => {
      const item = this.state.current;
      return item && <Detail item={item} />;
    };
    const mapService = id => {
      return (
        <span>
          {
            serviceMap.find(item => {
              return item.id === id;
            }).name
          }
        </span>
      );
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="Backlog" value="8 orders" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Average orders per task" value="32 orders" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info
                  title="Overall finished orders in a week"
                  value="24 orders"
                />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="Order List"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a onClick={() => this.showEditModal(item)}>Detail</a>,
                    item.order.status === 1 && (
                      <a onClick={() => this.showUpdateModal(item)}>Update</a>
                    ),
                    item.order.status === 0 && <MoreBtn current={item} />,
                    item.order.status === 1 && (
                      <a onClick={() => this.finish(item)}>Finish</a>
                    )
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={item.order.client.headImage}
                        shape="square"
                        size="large"
                      />
                    }
                    title={item.order.client.clientName}
                    description={item.order.house.address}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
        <Modal
          title={done ? null : `Order Detail`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={
            done
              ? { padding: '72px 0', maxHeight: '600px', overflow: 'auto' }
              : { padding: '28px 0 0', maxHeight: '600px', overflow: 'auto' }
          }
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
        <Modal
          title={done ? null : `Order Detail`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={
            done
              ? { padding: '72px 0', maxHeight: '600px', overflow: 'auto' }
              : { padding: '28px 0 0', maxHeight: '600px', overflow: 'auto' }
          }
          destroyOnClose
          visible={vis}
          {...modalFooter1}
        >
          <Input
            placeholder="update message"
            style={{ width: 500, marginLeft: 50, marginBottom: 30 }}
            onChange={e => this.setState({ comment: e.target.value })}
          />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

@connect(({ list, loading, user }) => ({
  user,
  list,
  loading: loading.models.list
}))
class Detail extends React.Component {
  componentDidMount() {
    const { dispatch, user, item } = this.props;
    dispatch({
      type: 'list/fetchProgress',
      payload: item.order.orderId
    });
  }

  render() {
    const mapStatus = id => statusMap.find(item => item.id === id).name;
    const { item, list } = this.props;
    const progress = list.progress || [];
    return (
      item && (
        <Card bordered={false}>
          <DescriptionList
            size="large"
            title="Client Information"
            style={{ marginBottom: 32 }}
          >
            <Description term="Name">
              {item.order.client.clientName}
            </Description>
            <Description term="Phone Number">
              {item.order.client.clientPhone}
            </Description>
            <Description term="Email">{item.order.client.email}</Description>
            <Description term="Driver Licence">
              {item.order.client.driverLicenceId}
            </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList
            size="large"
            title="House Information"
            style={{ marginBottom: 32 }}
          >
            <Description term="Owner">
              {item.order.house.owner.clientName}
            </Description>
            <Description term="Address">{item.order.house.address}</Description>
            <Description term="Remark">null</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList
            size="large"
            title="Order Information"
            style={{ marginBottom: 32 }}
          >
            <Description term="Order ID">{item.order.orderId}</Description>
            <Description term="Fare">${item.order.price}</Description>
            <Description term="Deposit">${item.order.deposit}</Description>
            <Description term="Status">
              {mapStatus(item.order.status)}
            </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          {progress.map((data, index) => (
            <>
              <DescriptionList
                size="large"
                title={`Progress ${index + 1}`}
                style={{ marginBottom: 32 }}
              >
                <Description term="Time">
                  {moment(data.date).format('YYYY-MM-DD hh:mm')}
                </Description>
                <Description term="Progress">
                  {data.progressComment}
                </Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />
            </>
          ))}
        </Card>
      )
    );
  }
}

export default BasicList;
