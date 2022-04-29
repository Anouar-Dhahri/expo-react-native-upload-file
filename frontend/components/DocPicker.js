import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const DocPicker = () => {

  const [ doc, setDoc ] = useState();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
        if (response.type == 'success') {          
          let { name, size, uri } = response;
          let nameParts = name.split('.');
          let fileType = nameParts[nameParts.length - 1];
          var fileToUpload = {
            name: name,
            size: size,
            uri: uri,
            type: "application/" + fileType
          };
          console.log(fileToUpload, '...............file')
          setDoc(fileToUpload);
        } 
      });
    // console.log(result);
    console.log("Doc: " + doc.uri);
  }

  const postDocument = () => {
    const url = "http://192.168.1.14:8000/upload";
    const fileUri = doc.uri;
    const formData = new FormData();
    formData.append('document', doc);
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    console.log(formData);

    fetch(url, options).catch((error) => console.log(error));
  }

    return (        
      <View>
        <TouchableOpacity 
          onPress={pickDocument}
          style={{
            backgroundColor:'#222',
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            marginHorizontal: 15,
            borderRadius: 24,
            
          }}
        >
          <Text style={{
            fontSize:15,
            color:"#FFF",
            textAlign:"center"
          }}>
            Select Document
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={postDocument}
          style={{
            backgroundColor:"#FFC300",
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            marginHorizontal: 15,
            borderRadius: 24,
          }}
        >
          <Text style={{
            fontSize:15,
            textAlign:"center"
          }}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
    )
};

export default DocPicker;