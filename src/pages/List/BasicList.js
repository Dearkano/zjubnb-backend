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
import Order from './order';
const { Description } = DescriptionList;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ list, loading, user }) => ({
  user,
  list,
  loading: loading.models.user
}))
@Form.create()
class BasicList extends PureComponent {
  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
      payload: user ? user.currentUser.company_id : ''
    });
  }
  render() {
    const { loading } = this.props;
    return !loading && <Order />;
  }
}

export default BasicList;
