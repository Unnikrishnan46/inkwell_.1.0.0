import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { setAddRecoveryPasswordOpen } from '@/redux/passwordState'
import { AntDesign } from '@expo/vector-icons'

type Props = {}

const AddRecoveryPassword = (props: Props) => {
  const addRecoveryPasswordOpen = useSelector((state:any)=>state?.passwordState)?.addRecoveryPasswordOpen;
  const dispatch = useDispatch();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('recoveryQuestion', question);
      await AsyncStorage.setItem('recoveryAnswer', answer);
      dispatch(setAddRecoveryPasswordOpen(false));
    } catch (error) {
      console.error('Failed to save question and answer', error);
    }
  };

  return (
    <Modal visible={addRecoveryPasswordOpen} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={() => dispatch(setAddRecoveryPasswordOpen(false))}>
        <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <View>
            <Pressable style={{height:30,width:30,backgroundColor:"black",borderRadius:50,justifyContent:"center",alignItems:"center"}}
              onPress={() => dispatch(setAddRecoveryPasswordOpen(false))}
            >
                <AntDesign name='close' size={20} color={"white"}/>
            </Pressable>
          </View>
          <View style={{marginTop:10,marginBottom:10}}>
            <Text style={{fontSize:20,fontFamily:"SFPro11"}}>
                Please set a security question in case you forget your password
            </Text>
          </View>
          <View style={{alignItems: "center",}}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Question'
              value={question}
              onChangeText={(text) => setQuestion(text.slice(0, 80))}
              maxLength={80}
            />
            <View style={{alignItems: "flex-end",width:"100%",}}><Text>{question.length}/80</Text></View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Answer'
              value={answer}
              onChangeText={(text) => setAnswer(text.slice(0, 80))}
              maxLength={80}
            />
            <View style={{alignItems: "flex-end",width:"100%",}}><Text>{answer.length}/80</Text></View>
          </View>
          </View>
          <TouchableOpacity style={[styles.applyBtn,{backgroundColor: selectedThemeData?.buttonBg}]} onPress={handleSave}>
            <Text style={{color:selectedThemeData?.buttonTextColor}}>Apply</Text>
          </TouchableOpacity>
        </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default AddRecoveryPassword

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      },
      modalView: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width:"90%"
      },
      textInput:{
        width:"95%",
        padding:10,
        borderWidth:0.2,
        borderRadius:5
      },
      inputContainer:{
        justifyContent: "center",
        alignItems: "center",
        marginBottom:15,
        gap:5,
        width:"100%",
      },
      applyBtn:{
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        borderRadius:10,
        height:50
      }
})
