import moment from 'moment';

// mock data
const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
      'YYYY-MM-DD'
    ),
    y: fakeY[i]
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
      'YYYY-MM-DD'
    ),
    y: fakeY2[i]
  });
}
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: months[i],
    y: Math.floor(Math.random() * 1000) + 200
  });
}
const searchWords = [
  'Appliance',
  'Fences',
  'Landscaping',
  'Roof',
  'Handyman Service',
  'Tree Service',
  'Plumbing',
  'Door',
  'Desk',
  'Garage',
  'Carpet'
];
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: searchWords[i % 11],
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  });
}
const salesTypeData = [
  {
    x: 'Electric',
    y: 244
  },
  {
    x: 'Appliance',
    y: 321
  },
  {
    x: 'Plumbing',
    y: 311
  },
  {
    x: 'Door',
    y: 41
  },
  {
    x: 'Garage',
    y: 121
  },
  {
    x: 'Other',
    y: 111
  }
];

const salesTypeDataOnline = [
  {
    x: 'Electric',
    y: 244
  },
  {
    x: 'Appliance',
    y: 321
  },
  {
    x: 'Handyman Service',
    y: 311
  },
  {
    x: 'Door',
    y: 41
  },
  {
    x: 'Garage',
    y: 121
  },
  {
    x: 'Other',
    y: 111
  }
];

const salesTypeDataOffline = [
  {
    x: 'Electric',
    y: 244
  },
  {
    x: 'Appliance',
    y: 321
  },
  {
    x: 'Handyman Service',
    y: 311
  },
  {
    x: 'Door',
    y: 41
  },
  {
    x: 'Garage',
    y: 121
  },
  {
    x: 'Other',
    y: 111
  }
];

const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10
  });
}

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7
  }
];

const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度'
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key]
      });
    }
  });
});

const getFakeChartData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData
};

export default {
  'GET /api/fake_chart_data': getFakeChartData
};
