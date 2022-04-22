import React, {useRef, useState} from 'react';
import {SafeAreaView, View, Dimensions} from 'react-native';
import {Center, Stack, Input, Text, Button, Checkbox} from 'native-base';
import Wizard from 'react-native-wizard';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

export default () => {
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const stepList = [
    {
      content: (
        <View style={{width: width, height: height}}>
          <Center>
            <Stack space={2} w="75%" maxW="300px" mt={20}>
              <Text fontSize="xs">Hello, what's your name?</Text>
              <Input
                variant="underlined"
                placeholder="Type your answer here .."
              />
            </Stack>
            <Stack space={2} w="75%" maxW="300px" mt={20}>
              <Text fontSize="xs">Where do you live?</Text>
              <Text fontSize="sm">Province,State</Text>
              <Input
                variant="underlined"
                placeholder="Type your answer here .."
              />
            </Stack>
            <Stack space={2} w="75%" maxW="300px" mt={20}>
              <Text fontSize="xs">Hello, what's your name?</Text>
              <Input
                variant="underlined"
                placeholder="Type your answer here .."
              />
            </Stack>
          </Center>
        </View>
      ),
    },
    {
      content: (
        <View style={{width: width, height: height}}>
          <Center>
            <Stack space={2} w="75%" maxW="300px" mt={20}>
              <Text fontSize="xs">Hello, what's your name?</Text>
              <Checkbox.Group accessibilityLabel="choose values">
                <Checkbox value="one" my={2}>
                  Fever
                </Checkbox>
                <Checkbox value="two">flu-like illness</Checkbox>
                <Checkbox value="two">shaking chills</Checkbox>
                <Checkbox value="two">headache</Checkbox>
                <Checkbox value="two">muscle aches</Checkbox>
                <Checkbox value="two">tiredness</Checkbox>
                <Checkbox value="two">Nausea</Checkbox>
                <Checkbox value="two">vomiting</Checkbox>
                <Checkbox value="two">diarrhea</Checkbox>
              </Checkbox.Group>
            </Stack>
            <Stack space={2} w="75%" maxW="300px" mt={20}>
              <Text fontSize="xs">When did the symptoms above started?</Text>

              <Button disabled={isLastStep} onPress={() => setOpen(true)}>
                <Icon name="calendar" size={20} color="white"></Icon>
              </Button>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </Stack>
          </Center>
        </View>
      ),
    },
    {
      content: (
        <View style={{width: width, height: height}}>
          <Center>
            <Stack space={2} w="75%" maxW="300px" mt={20}>
              <Text fontSize="xs">
                Have you received a positive result from the hospital within the
                past 14 days?
              </Text>
              <Input
                variant="underlined"
                placeholder="Type your answer here .."
              />
            </Stack>
            <Stack space={2} w="75%" maxW="300px" mt={20}>
              <Text fontSize="xs">Additional Information?</Text>
              <Input
                variant="underlined"
                placeholder="Type your answer here .."
              />
            </Stack>
          </Center>
        </View>
      ),
    },
    {
      content: (
        <View style={{width: width, height: height}}>
          <Center>
            <Stack space={2} w="75%" maxW="300px" mt={300}>
              <Button title="Submit" onPress={() => {}}>
                <Text color="white">Submit</Text>
              </Button>
            </Stack>
          </Center>
        </View>
      ),
    },
  ];

  return (
    <View>
      <SafeAreaView style={{backgroundColor: '#FFF'}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: '#FFF',
            borderBottomColor: '#dedede',
            borderBottomWidth: 1,
            padding: 4,
          }}>
          <Button disabled={isFirstStep} onPress={() => wizard.current.prev()}>
            <Icon name="angle-left" size={20} color="white"></Icon>
          </Button>
          <Text>{currentStep + 1}. Step</Text>
          <Button disabled={isLastStep} onPress={() => wizard.current.next()}>
            <Icon name="angle-right" size={20} color="white"></Icon>
          </Button>
        </View>
      </SafeAreaView>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Wizard
          ref={wizard}
          steps={stepList}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          onNext={() => {
            console.log('Next Step Called');
          }}
          onPrev={() => {
            console.log('Previous Step Called');
          }}
          currentStep={({currentStep, isLastStep, isFirstStep}) => {
            setCurrentStep(currentStep);
          }}
        />
      </View>
    </View>
  );
};