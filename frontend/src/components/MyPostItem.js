import React, { useState } from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '../constants/color'
import Button from './Button'
import postServices from '../api/services/postServices'
import Loading from './Loading'
import { storeData } from '../utils/asyncStorage'
import { convertToMillions } from '../utils/convertPrice'

const MyPostItem = ({ data, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState('flex')

    const handleUpdate = async () => {
        // console.log(data)
        await storeData('@postInfo', data)
        navigation.navigate('Post', { mode: 'Update' })
        setModalVisible(false)
    }
    const handleDelete = async () => {
        setLoading(true)
        await postServices.deletePost(data._id)
        console.log('Delete', data._id)
        setLoading(false)
        setModalVisible(false)
        setDisplay('none')
    }

    return (
        <>
            <View style={{ ...styles.container, display: display }}>
                <View style={styles.content}>
                    <Image
                        source={{
                            uri: data.images[0],
                        }}
                        style={styles.image}
                    />
                    <View style={styles.info}>
                        <Text style={styles.price}>{`${convertToMillions(
                            data.expenses
                        )}M VNĐ/phòng`}</Text>
                        <Text style={styles.title} numberOfLines={2}>
                            {data.title}
                        </Text>
                        <Text style={styles.address} numberOfLines={2}>
                            {data.description}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.saved}>
                    <Image source={require('../../assets/icons/more.png')} style={styles.btnIcon} />
                </TouchableOpacity>
            </View>
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <TouchableOpacity
                        style={styles.modalView}
                        activeOpacity={1}
                        onPress={() => setModalVisible(false)}
                    >
                        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                            <Button type="Profile" onPress={handleUpdate}>
                                Chỉnh sửa bài đăng
                            </Button>
                            <Button type="Logout" onPress={handleDelete}>
                                {loading ? <Loading color={COLORS.red} /> : 'Xoá bài đăng'}
                            </Button>
                            {/* <Text onPress={handleUpdate} style={styles.updateBtn}>
                                Sửa bài đăng
                            </Text>
                            <Text onPress={handleDelete} style={styles.deleteBtn}>
                                Xoá bài đăng
                            </Text> */}
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    )
}

export default MyPostItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 6,
        backgroundColor: COLORS.abs_white,
    },
    content: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: 36,
        marginVertical: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 6,
        margin: 8,
        marginRight: 16,
    },
    btnIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black,
    },
    saved: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    price: {
        color: COLORS.red,
    },
    title: {
        fontWeight: '700',
    },
    address: {
        color: COLORS.grey,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'relative',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        alignItems: 'center',
        borderRadius: 6,
        padding: 16,
        position: 'absolute',
        // top: 55,
        right: 8,
        left: 8,
        bottom: 36,
    },
    updateBtn: {
        color: COLORS.black,
        paddingVertical: 4,
        fontWeight: '700',
        marginBottom: 16,
    },
    deleteBtn: {
        color: 'red',
        paddingVertical: 4,
        fontWeight: '700',
    },
})
