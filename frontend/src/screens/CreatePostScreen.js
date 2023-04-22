import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import PostForm from '../components/PostForm'
import ProgressSteps from '../components/ProgressSteps'
import COLORS from '../constants/color'
import AddressScreen from './AddressScreen'
import UploadImageScreen from './UploadImageScreen'
import ConfirmationScreen from './ConfirmationScreen'
import postServices from '../api/services/postServices'
import { storeData } from '../utils/asyncStorage'

const CreatePostScreen = ({ navigation, route }) => {
    const { mode } = route.params
    console.log('PostID', mode)
    const [formIndex, setFormIndex] = useState(0)

    const handleChangeForm = (index) => {
        setFormIndex(index)
    }
    const LABEL = ['Thông tin', 'Địa chỉ', 'Hình ảnh', 'Xác nhận']

    // useEffect(() => {
    //     if (postId) {
    //         const getData = async () => {
    //             const postInfo = await postServices.getPostDetail(postId)
    //             // console.log('data', postInfo)
    //             storeData('@postInfo', postInfo)
    //             // await saveData
    //         }
    //         getData()
    //     }
    // }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <ProgressSteps step={formIndex} label={LABEL} />
                {formIndex === 0 && <PostForm handleChangeForm={handleChangeForm} />}
                {formIndex === 1 && <AddressScreen handleChangeForm={handleChangeForm} />}
                {formIndex === 2 && <UploadImageScreen handleChangeForm={handleChangeForm} />}
                {formIndex === 3 && (
                    <ConfirmationScreen
                        mode={mode === 'Update' ? 'Update' : 'Create'}
                        handleChangeForm={handleChangeForm}
                        navigation={navigation}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreatePostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginBottom: 68,
    },
})
