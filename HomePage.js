import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {  Dimensions, StyleSheet, Text, View, Button, SafeAreaView, TextInput} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const styles = StyleSheet.create({
    todoInput: {
      margin:20,
      height: 40,
      borderColor: 'red',
      borderWidth: 1
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const HomePage = ({ navigation }) => {
      
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([
        { date: moment().format('LL'), amount: 2000},
        { date: moment().subtract(1, 'days').format('LL'), amount: 2500},
        { date: moment().subtract(1, 'days').format('LL'), amount: 2600},
        { date: moment().subtract(1, 'days').format('LL'), amount: 2600},
        { date: moment().subtract(1, 'days').format('LL'), amount: 2600},
        { date: moment().subtract(1, 'days').format('LL'), amount: 2600},
        { date: moment().subtract(1, 'days').format('LL'), amount: 2600},
        { date: moment().subtract(1, 'days').format('LL'), amount: 2600},
        { date: moment().subtract(1, 'days').format('LL'), amount: 2600},
        { date: moment().subtract(1, 'days').format('LL'), amount: 2600},
        { date: moment().subtract(1, 'days').format('LL'), amount: 2600},
        { date: moment().subtract(3, 'days').format('LL'), amount: 4500},
        { date: moment().subtract(4, 'days').format('LL'), amount: 5000},
    ])
    const [transformedData, setTransformedData] = useState([]);
    useEffect(() => {
      setTransformedData(transformData(groupBy(data, 'date')));
    },[data])
    
    const groupBy = (array, key) =>
      array.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || [] ).push(x);
      return rv;
    },{})
    const [gigs, setGigs] = useState([
      {
        description:'Made a website for Adrians',
        amount: 900,
        timestamp: new Date()
      }
    ]);
    
    const getDates = () =>  transformedData.map(pair => pair.date)
    const getAmounts = () =>  transformedData.map(pair => pair.amount)
    const transformData = (groupedData) => {
      const transformedArray = [];
  
      Object.entries(groupedData).forEach(entry => {
        const total = entry[1].reduce((total,pair) => total + pair.amount, 0)
        transformedArray.push({ date: moment(entry[0]).format('MM/DD'), amount: total })
      })
      const sortedArray = transformedArray.sort((a,b) => moment(a['date']).diff(moment(b['date'])))
  
      return sortedArray;
    }
  
  
  console.log('The Dates', getDates())
  console.log('The Amounts', getAmounts())
  console.log('The grouped values are',Object.entries(groupBy(data, 'date')))
  console.log('the total grouped value', transformData(groupBy(data,'date')))
  
  
   useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount),0), 0)
   },[gigs])
  
    const addGig = () => {
      setGigs([...gigs, {
        description: description,
        amount: amount,
        timestamp: new Date()
      }]);
      setData([
        ...data, 
        {
          date: moment().format('LL'),
          amount: Number(amount)
        }
        ]);
      setDescription('');
      setAmount('');
    }
    return (
      <SafeAreaView>
      <View style={styles.container}>
        <Text>
          Jobs & Pay Tracker
        </Text>
        <StatusBar style="auto" />
      <Button title='Login' onPress={() => navigation.navigate('Login')}/>
      </View>
      <Text>Total Income: ${total} </Text>
    
      <TextInput
      style={styles.todoInput}
      value={description}
      placeholder="Enter a description"
      onChangeText={text => setDescription(text)}
      />
      <TextInput
      style={styles.todoInput}
      value={amount}
      placeholder="Enter amount you made in USD ($)"
      keyboardType="numeric"
      onChangeText={text => setAmount(text)}
      />
      <Button disabled={!amount && !description} title="Add Gig" onPress={addGig}/>
  
      {gigs.map(gig => (
        <View>
          <Text>{gig.description}</Text>
          <Text>{gig.amount}</Text>
        </View>
      ))}
      <View>
    <Text>Bezier Line Chart</Text>
    <LineChart
      data={{
        labels: getDates(),
        datasets: [
          {
           data: getAmounts(),
          }
        ]
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      yAxisLabel="$"
      // yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#000",
        backgroundGradientTo: "#000",
        decimalPlaces: null, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  </View>
      
      </SafeAreaView>
      
    );
  }

export default HomePage
