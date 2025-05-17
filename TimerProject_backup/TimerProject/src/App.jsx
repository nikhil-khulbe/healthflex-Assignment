import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import LottieView from 'lottie-react-native';

const App = () => {
  let [isVisisble, setIsVisisble] = useState(false);
  let [timer, setTimer] = useState([]);

  useEffect(() => {
    let timerId = setInterval(() => {
      setTimer(prev => prev.map(duration => (duration > 0 ? duration - 1 : 0)));
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  let [dataObj, setDataObj] = useState([]);
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      name: '',
      duration: 0,
      category: '',
    },
  });
  const onSubmit = data => {
    console.log(data);
    setDataObj(prev => [...prev, data]);
    setTimer(prev => [...prev, data.duration]);
    reset({
      name: '',
      duration: '',
      category: '',
    });

    Alert.alert('Timer is ready');
  };
  const renderItem = ({item, index}) => (
    <View
      style={timer[index] == 0 ? styles.timerCtnCompleted : styles.timerCtn}>
      <LottieView
        source={require('../assets/timerHourGlass.json')}
        style={styles.hourGlassAni}
        autoPlay={true}
        loop={timer[index] == 0 ? false : true}
      />
      <Text style={{fontSize: 30}}>Timer:{timer[index]}</Text>
      <Text style={{fontSize: 30}}>{item.name}</Text>
    </View>
  );
  return (
    <View style={styles.mainCtn}>
      <Text style={styles.title}>Timer App</Text>
      <Pressable
        style={({pressed}) => [
          styles.addBtn,
          {
            backgroundColor: pressed
              ? 'rgb(38,102,181)'
              : 'rgba(38,102,181,0.4)',
          },
        ]}
        onPress={() => setIsVisisble(true)}>
        <Text style={styles.addTitle}>+</Text>
      </Pressable>
      <FlatList data={dataObj} renderItem={renderItem} />
      <Modal animationType="slide" visible={isVisisble}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCtn}>
            <Pressable
              onPress={() => setIsVisisble(false)}
              style={({pressed}) => [
                styles.closeModal,
                {
                  backgroundColor: pressed
                    ? 'rgba(200,100,50,0.5)'
                    : 'rgb(200,100,50)',
                },
              ]}>
              <Text style={styles.title}>X</Text>
            </Pressable>
            <View style={styles.formCtn}>
              <Controller
                control={control}
                name="name"
                render={({field: {value, onChange}}) => (
                  <TextInput
                    placeholder="Name"
                    value={value}
                    onChangeText={onChange}
                    style={styles.formInp}
                  />
                )}
              />
              <Controller
                control={control}
                name="duration"
                render={({field: {value, onChange}}) => (
                  <TextInput
                    placeholder="Duration in Seconds"
                    value={String(value)}
                    onChangeText={onChange}
                    style={styles.formInp}
                  />
                )}
              />
              <Controller
                control={control}
                name="category"
                render={({field: {value, onChange}}) => (
                  <TextInput
                    placeholder="Category"
                    value={value}
                    onChangeText={onChange}
                    style={styles.formInp}
                  />
                )}
              />
              <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 20,
  },
  mainCtn: {
    display: 'flex',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(226,158,40,0.2)',
  },
  addBtn: {
    backgroundColor: 'rgba(252,151,108,0.5)',

    borderRadius: 50,
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTitle: {
    fontSize: 50,
    color: 'white',
  },
  modalCtn: {
    backgroundColor: 'rgba(35,237,28,0.2)',
    // height: '50%',
    // flex: 1,
    justifyContent: 'center',
    padding: 10,
    paddingVertical: 30,
    alignItems: 'center',
    marginVertical: 10,
    width: '70%',
    marginHorizontal: 20,
    borderRadius: 30,
  },
  closeModal: {
    margin: 10,
    borderRadius: 50,
    paddingHorizontal: 5,
  },
  formCtn: {
    width: '80%',
  },
  formInp: {
    borderWidth: 1,
    borderRadius: 15,
    // margin: 10,
    marginVertical: 5,
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(12, 2, 2, 0.2)',
  },
  hourGlassAni: {
    height: 200,
    width: 200,
  },
  timerCtn: {
    backgroundColor: 'rgba(141,56,244,0.2)',
    margin: 10,
    padding: 10,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  timerCtnCompleted: {
    backgroundColor: 'rgb(56, 244, 84)',
    margin: 10,
    padding: 10,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
