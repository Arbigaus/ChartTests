import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

import {
  Container,
  ValueItem,
  ValuesList,
  TextCoin,
  TextValue,
  LineChartView,
  ScrollView,
} from './styles';
import {getCompareCoin, getDailyPair} from '../../services';

const screenWidth = Dimensions.get('window').width;

const Main = () => {
  const [compareList, setCompareList] = useState({});
  const [listOfCoins] = useState(['USD', 'JPY', 'EUR', 'BRL']);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    getCompareCoin('BTC', listOfCoins).then(r => {
      setCompareList({...r});
    });
  }, [listOfCoins]);

  useEffect(() => {
    const newDataArr = [...dataChart];
    listOfCoins.forEach(toCompare => {
      getDailyPair('BTC', toCompare).then(r => {
        const newArr = [...r];
        const labels = [];
        const data = [];
        newArr.map(item => {
          labels.push(moment.unix(item.time).format('DD/MM'));
          data.push(item.close);
        });
        const datasets = [
          {
            data,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2, // optional
          },
        ];
        if (!newDataArr.includes({labels, datasets})) {
          newDataArr.push({labels, datasets, coin: toCompare});
          setDataChart([...newDataArr]);
        }
      });
    });
  }, [listOfCoins]);

  useEffect(() => {
    console.log(dataChart);
  }, [dataChart]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(222, 30, 80, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    stule: {
      padding: 5,
    },
  };

  return (
    <Container>
      <ScrollView>
        {dataChart.length > 0 &&
          dataChart.map(data => (
            <>
              <TextCoin>{data.coin}</TextCoin>
              <LineChartView>
                <LineChart
                  data={data}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  verticalLabelRotation={30}
                  bezier
                />
              </LineChartView>
            </>
          ))}
      </ScrollView>
      <ValuesList>
        {listOfCoins.map(item => (
          <ValueItem key={item}>
            <TextCoin>{item}</TextCoin>
            <TextValue>{compareList[item]}</TextValue>
          </ValueItem>
        ))}
      </ValuesList>
    </Container>
  );
};

export default Main;
