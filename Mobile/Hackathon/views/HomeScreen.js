import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {iOSColors, material} from 'react-native-typography';
import {iOSUIKit} from 'react-native-typography';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  Item,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import axios from 'axios';
import {thisExpression} from '@babel/types';
import {bold} from 'chalk';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    this.state = {
      isMeetingStarted: false,
      incomingEvents: [],
      closeEvent: null,
      closeEventTime: 0,
      currentQuestion: null,
      questionDeadline: null,
      remainingSecondsSeconds: null,
    };
  }

  waitingForMeetingView() {
    if (this.state.currentQuestion != null)
      var answers = this.state.currentQuestion.checkpointAnswerOptions.split(
        ';',
      );

    return (
      <View style={{marginTop: 50, height: 200}}>
        {this.state.isMeetingStarted ? (
          <Text style={{color: '#6A67FF', fontSize: 25}}>Trwa spotkanie:</Text>
        ) : (
          <Text style={{color: '#6A67FF', fontSize: 25}}>
            Oczekiwanie na rozpoczęcie spotkania:
          </Text>
        )}
        <Text style={{color: '#6A67FF', fontSize: 25, marginTop: 15}}>
          {this.state.closeEvent != null
            ? this.state.closeEvent.meetSubject
            : ''}
        </Text>

        {this.state.isMeetingStarted ? (
          <Text></Text>
        ) : (
          <MaterialIndicator
            style={{width: 50, height: 50, alignSelf: 'center'}}
            color="#6A67FF"></MaterialIndicator>
        )}

        {this.state.isMeetingStarted ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: '#00000020',
              width: 300,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View
              style={{
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: '#5653FD',
              }}>
              <Text
                style={{
                  height: 50,
                  fontSize: 18,
                  lineHeight: 50,
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                Point - panel odpowiedzi
              </Text>
            </View>
            {this.state.currentQuestion == null ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{width: '100%', textAlign: 'center', fontSize: 14}}>
                  Oczekuj na pytanie
                </Text>
              </View>
            ) : (
              <View style={{padding: 20}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {this.state.currentQuestion.checkpointTitle}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    width: '100%',
                      marginTop: 40,
                    paddingLeft:5,
                    paddingRight: 5,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#5653FD',
                        fontWeight: 'bold',
                      }}>
                      {answers[0]}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#5653FD',
                        fontWeight: 'bold',
                      }}>
                      {answers[1]}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={{width:'100%',textAlign:'center',marginTop: 40}}>Pozostały czas: {parseInt(this.state.remainingSecondsSeconds)}</Text>
              </View>
            )}
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  }

  isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };

  isTommorow = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() + 1 &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };

  checkIsMeeting() {
    if (this.state.closeEvent != null && this.state.closeEvent.meetId != null) {
      console.log(this.state.closeEvent);
      let startDate = new Date(this.state.closeEvent.startTime);
      let endDate = new Date(this.state.closeEvent.endTime);
      var today = new Date();

      if (
        today.getTime() >= startDate.getTime() &&
        today.getTime() <= endDate.getTime()
      ) {
        this.setState({
          isMeetingStarted: true,
        });
      } else {
        this.setState({
          isMeetingStarted: false,
        });
      }
    }
  }

  refreshData() {
    if (this.state.questionDeadline == null) {
      axios
        .get(
          'http://94.23.91.119:5000/User/GetCheckpointsByMeetings/AAMkAGYwN2EyMTEwLTI1YTQtNDYzZC04Y2E3LTg4M2ZlMzkyMTY4YgBGAAAAAADAqOZAh5XmT5uUCZzwTgZnBwClIBnIR6xkQazNRRkdtxcUAAAAAAENAAClIBnIR6xkQazNRRkdtxcUAAFV_waRAAA=/Oskar.Szymanski@Oponeo.pl',
        )
        .then((response) => {
          try {
            response = response.data;
            var checkpoints = JSON.parse(JSON.stringify(response));
            checkpoints = checkpoints.checkpoints[0];
            this.setState({
              questionDeadline: new Date(checkpoints.createdDate),
              currentQuestion: checkpoints,
            });
          } catch (e) {
            this.setState({
              questionDeadline: null,
              currentQuestion: null,
            });
          }
          console.log(checkpoints);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios
      .get('http://94.23.91.119:5000/User/GetUserMeetings/false')
      .then((response) => {
        var events = JSON.parse(JSON.stringify(response.data));

        if (this.state.closeEvent != null) {
          let end = new Date(this.state.closeEvent.endTime);

          if (new Date().getTime() >= end.getTime()) {
            this.setState({
              isMeetingStarted: false,
            });
          }
        } else {
          this.setState({
            isMeetingStarted: false,
          });
        }

        events.forEach((element) => {
          let today = new Date();
          let startDate = new Date(element.endTime);

          let diff = startDate.getTime() - today.getTime();
          if (diff > 0) {
            if (this.state.closeEventTime == 0) {
              this.setState({
                closeEventTime: diff,
                closeEvent: element,
              });
            } else {
              if (this.state.closeEventTime > diff) {
                this.setState({
                  closeEventTime: diff,
                  closeEvent: element,
                });
              }
            }
          } else {
            if (
              this.state.closeEvent != null &&
              this.state.closeEvent.meetId != null &&
              element.meetId == this.state.closeEvent.meetId
            ) {
              this.setState({
                isMeetingStarted: false,
                closeEvent: null,
                closeEventTime: 0,
              });
            }
          }
        });
        this.setState({
          incomingEvents: JSON.parse(JSON.stringify(response.data)),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateQuestionDeadline() {
    if (
      this.state.questionDeadline != null &&
      this.state.questionDeadline.getTime() > 0
    ) {
      let diff = this.state.questionDeadline.getTime() - new Date().getTime();
      diff /= 1000;
      if (diff <= 0) {
        this.setState({
          currentQuestion: null,
          questionDeadline: null,
          remainingSecondsSeconds: null,
        });
      } else {
        this.setState({
          remainingSecondsSeconds: diff,
        });
      }
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.refreshData();
      this.checkIsMeeting();
    }, 2000);
    setInterval(() => {
      this.updateQuestionDeadline();
    }, 1000);
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View
          style={{
            display: 'flex',
            padding: 0,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            alignContent: 'flex-start',
          }}>
          <Image
            style={[
              iOSUIKit.title3Emphasized,
              {
                marginLeft: -5,
                marginTop: 20,
                height: 50,
                resizeMode: 'contain',
              },
            ]}
            source={require('../img/point.png')}></Image>
          <Image
            source={require('../img/user.png')}
            style={{
              height: 70,
              width: 70,
              marginTop: 10,
              marginRight: 10,
            }}></Image>
        </View>
        {this.waitingForMeetingView()}

        {!this.state.isMeetingStarted ? (
          <Text
            style={{
              alignSelf: 'flex-start',
              marginLeft: 10,
              marginTop: 50,
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Nadchodzace spotkania
          </Text>
        ) : (
          <></>
        )}
        {!this.state.isMeetingStarted ? (
          <View
            style={{
              width: '100%',
              height: 130,
              alignItems: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 590,
            }}>
            <Text
              style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 15}}>
              Dziś
            </Text>
            <FlatList
              horizontal={true}
              data={this.state.incomingEvents}
              style={{width: '100%'}}
              // keyExtractor={this._keyExtractor}
              renderItem={(e) => {
                let startDate = new Date(e.item.startTime);
                let endDate = new Date(e.item.endTime);
                var today = this.isToday(startDate);
                let isEnd = endDate.getTime() < new Date().getTime();

                if (today) {
                  return (
                    <View
                      style={{
                        borderColor: '#2E2BF3',
                        borderWidth: 1,
                        borderRadius: 15,
                        height: 85,
                        margin: 7,
                        padding: 8,
                        width: 150,
                      }}>
                      <Text
                        style={{fontSize: 17, height: 50}}
                        numberOfLines={3}>
                        {e.item.meetSubject}
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          paddingBottom: 5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{color: 'gray'}}>
                          {startDate.getHours().toString.length == 1
                            ? '0' + startDate.getHours().toString()
                            : startDate.getHours().toString}
                          :
                          {startDate.getMinutes().toString().length == 1
                            ? '0' + startDate.getMinutes()
                            : startDate.getMinutes()}
                          -
                          {endDate.getHours().toString().length == 1
                            ? '0' + endDate.getHours()
                            : endDate.getHours()}
                          :
                          {endDate.getMinutes().toString().length == 1
                            ? '0' + endDate.getMinutes()
                            : endDate.getMinutes()}{' '}
                        </Text>
                        {isEnd ? (
                          <Image
                            style={{width: 20, height: 20}}
                            source={require('../img/check.png')}></Image>
                        ) : (
                          <></>
                        )}
                      </View>
                    </View>
                  );
                } else {
                  return <View />;
                }
              }}
            />
          </View>
        ) : (
          <></>
        )}
        {!this.state.isMeetingStarted ? (
          <View
            style={{
              width: '100%',
              height: 130,
              alignItems: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 470,
            }}>
            {!this.state.isMeetingStarted ? (
              <Text
                style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 15}}>
                Jutro
              </Text>
            ) : (
              <></>
            )}
            <FlatList
              horizontal={true}
              data={this.state.incomingEvents}
              style={{width: '100%'}}
              // keyExtractor={this._keyExtractor}
              renderItem={(e) => {
                let startDate = new Date(e.item.startTime);
                let endDate = new Date(e.item.endTime);
                var today = this.isTommorow(startDate);

                if (today) {
                  return (
                    <View
                      style={{
                        borderColor: '#2E2BF3',
                        borderWidth: 1,
                        borderRadius: 15,
                        height: 80,
                        margin: 7,
                        padding: 8,
                        width: 150,
                      }}>
                      <Text
                        style={{fontSize: 17, height: 50}}
                        numberOfLines={3}>
                        {e.item.meetSubject}
                      </Text>
                      <Text style={{color: 'gray'}}>
                        {startDate.getHours().toString.length == 1
                          ? startDate.getHours()
                          : startDate.getHours().toString}
                        :
                        {startDate.getMinutes().toString().length == 1
                          ? startDate.getMinutes()
                          : startDate.getMinutes()}
                        -
                        {endDate.getHours().toString().length == 1
                          ? endDate.getHours()
                          : endDate.getHours()}
                        :
                        {endDate.getMinutes().toString().length == 1
                          ? '0' + endDate.getMinutes().toString()
                          : endDate.getMinutes()}{' '}
                      </Text>
                    </View>
                  );
                } else {
                  return <View />;
                }
              }}
            />
          </View>
        ) : (
          <></>
        )}
      </SafeAreaView>
    );
  }
}
