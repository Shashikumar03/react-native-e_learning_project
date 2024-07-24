import { Text,View,StyleSheet,Image,TouchableOpacity} from "react-native";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";


export default function BussinessListCard({cardList}){

    const router=useRouter()

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={()=>router.push('/bussinessdetails/'+cardList.id)} >
            <View style={styles.boxShodow1}>
               <View style={{flexDirection:"row"}}>
                    <Image source={{ uri: cardList.imageUrl }} style={styles.image} />
                    <View style={[styles.textdetails]}>
                        <Text style={styles.text}>{cardList.name}</Text>
                         <Text style={{color:Colors.GRAY}}>{cardList.address}</Text>
                         <View style={{flexDirection:"row", gap:10}}>
                            <Image style={{ height: 20,width: 20,resizeMode: 'contain',}} source={require('../../assets/images/star.png')}/>
                            <Text>4.5</Text>
                         </View>
                    </View>
               </View>
            </View>
        
      </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    
    text: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    
    },
    main:{
      borderBottomWidth:3,
      borderColor:"#ddd",
    },
    itemContainer: {
      marginRight: 1,
      padding:5,
      marginStart: 10,
      marginTop:1,
    //   backgroundColor:"red",
      width:"90%",
    //   padding:100

    },
    loadingDiv:{
      
      marginTop:50,

    },
    borderApply:{
      borderRadius: 10,
      borderWidth: 2, // 2px border width
      borderColor: 'green', // border color
    },
    image: {
      height: 80,
      width: 100,
      resizeMode: 'contain',
      // borderRadius: 10,
      // borderWidth: 1,
      // borderColor: '#ddd',
      // marginBottom: 10,
    },
    boxShodow1: {
      padding: 5,
      backgroundColor: '#fff', // Ensure background color for shadow visibility
      shadowColor: 'rgba(0, 0, 0, 0.25)',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.8,
      shadowRadius: 20,
      elevation: 10,
      borderRadius: 10, 
      overflow: 'hidden', 
    //   backgroundColor:"lightblue/",
      paddingRight:30
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    border:{
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    textdetails:{
        paddingRight:50,
        alignItems:"flex-start",
        // backgroundColor:"red"
    }
  });
  