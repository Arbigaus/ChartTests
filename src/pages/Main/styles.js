import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Text = styled.Text`
  width: 100%;
  text-align: center;
`;

export const TextCoin = styled.Text`
  text-align: center;
  font-size: 25px;

  color: coral;
`;
export const TextValue = styled.Text`
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  color: white;
`;

export const ValuesList = styled.View`
  height: 100px;
  width: 100%;
  background-color: darkcyan;

  flex-direction: row;
`;

export const ValueItem = styled.View`
  flex: 1;
  padding: 5px;

  justify-content: space-around;
`;

export const LineChartView = styled.View`
  flex: 1;
  padding: 10px;

  justify-content: center;
`;
